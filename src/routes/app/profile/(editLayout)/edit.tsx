import type { GenderValue } from '#/components/input/GenderInputBase'

import DateInput from '#/components/react-hook-form/DateInput'
import GenderInput from '#/components/react-hook-form/GenderInput'
import InputSelect from '#/components/react-hook-form/InputSelect'
import TextInput from '#/components/react-hook-form/TextInput'
import FlagCambodia from '#/assets/icons/profile/flag-cambodia.svg?react'
import ConfirmModal from '#/components/ConfirmModal'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import UploadAvatar from '#/sections/profile/UploadAvatar'
import { useGetCitiesQuery } from '#/services/query/profile/getCity'
import { useGetCountriesQuery } from '#/services/query/profile/getCountry'
import { useGetDistrictsQuery } from '#/services/query/profile/getDistrict'
import { useGetPrecinctsQuery } from '#/services/query/profile/getPrecinct'
import { useProfileStore } from '#/stores/profile'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { toast } from 'sonner'
import { useUpdateProfileMutation } from '#/services/query/profile/updateProfile'
import { Icon } from '#/components/icon'
import {
  useAddNewPatientProfileMutation,
  useDeletePatientProfileMutation,
  useUpdatePatientProfileMutation,
} from '#/services/query/profile/patientProfile'
import LoadingBlocking from '#/components/LoadingBlocking'
import {
  useGetListFamilyQuery,
  useGetPatientProfileMutation,
} from '#/services/query/profile/listFamily'
import type { HttpCommonResponse } from '#/services/network/http-request'
import type { PatientProfileResponse } from '#/services/query/profile/getProfile'

/** Optional query: `/edit` hoặc `/edit?idMember=1` */
const editSearchSchema = z.object({
  idMember: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === undefined || v === '') return undefined
      const n = typeof v === 'number' ? v : Number(v)
      return Number.isFinite(n) ? n : undefined
    }),
  isUserProfile: z.boolean().optional().default(false),
})

export type EditSearch = z.infer<typeof editSearchSchema>

export const Route = createFileRoute('/app/profile/(editLayout)/edit')({
  validateSearch: (search): EditSearch => editSearchSchema.parse(search),
  component: RouteComponent,
})

interface FormValues {
  fullName: string
  dateOfBirth: string
  gender: GenderValue
  phoneNumber: string
  email: string
  country: string
  relationship: string
  city: string
  district: string
  precinct: string
  street: string
  avatarUrl: string
}

function RouteComponent() {
  const { control, setValue } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: 'MALE',
      phoneNumber: '',
      email: '',
      country: '',
      relationship: '',
      city: '',
      district: '',
      precinct: '',
      street: '',
      avatarUrl: '',
    },
  })

  const { t, i18n } = useTranslation(['profile', 'common'])
  const { idMember, isUserProfile } = Route.useSearch()
  const user = useProfileStore((s) => s.profile)
  const setProfile = useProfileStore((s) => s.setProfile)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const country = useWatch({ control, name: 'country' })
  const city = useWatch({ control, name: 'city' })
  const district = useWatch({ control, name: 'district' })
  const formValues = useWatch({ control })

  const locationLabel = useMemo(
    () => ((i18n.language ?? '').startsWith('vi') ? 'nameVi' : 'nameEn'),
    [i18n.language],
  )

  const countriesQuery = useGetCountriesQuery({
    params: {},
  })

  const citiesQuery = useGetCitiesQuery({
    params: { countryCode: country },
    enabled: Boolean(country),
  })

  const cityIdNum = city ? Number(city) : NaN
  const districtsQuery = useGetDistrictsQuery({
    params: { cityId: cityIdNum },
    enabled: Boolean(country && city && Number.isFinite(cityIdNum)),
  })

  const districtIdNum = district ? Number(district) : NaN
  const precinctsQuery = useGetPrecinctsQuery({
    params: { districtId: districtIdNum },
    enabled: Boolean(
      country && city && district && Number.isFinite(districtIdNum),
    ),
  })

  const countryOptions = useMemo(() => {
    const list = countriesQuery.data?.data
    if (!list?.length) return []
    return list.map((c) => ({
      value: c.code,
      label: locationLabel === 'nameVi' ? c.nameVi : c.nameEn,
    }))
  }, [countriesQuery.data?.data, locationLabel])

  const cityOptions = useMemo(() => {
    const list = citiesQuery.data?.data
    if (!list?.length) return []
    return list.map((c) => ({
      value: String(c.id),
      label: locationLabel === 'nameVi' ? c.nameVi : c.nameEn,
    }))
  }, [citiesQuery.data?.data, locationLabel])

  const districtOptions = useMemo(() => {
    const list = districtsQuery.data?.data
    if (!list?.length) return []
    return list.map((d) => ({
      value: String(d.id),
      label: locationLabel === 'nameVi' ? d.nameVi : d.nameEn,
    }))
  }, [districtsQuery.data?.data, locationLabel])

  const precinctOptions = useMemo(() => {
    const list = precinctsQuery.data?.data
    if (!list?.length) return []
    return list.map((p) => ({
      value: String(p.id),
      label: locationLabel === 'nameVi' ? p.nameVi : p.nameEn,
    }))
  }, [precinctsQuery.data?.data, locationLabel])

  const countryEmptyMessage = useMemo(() => {
    if (countryOptions.length > 0) return undefined
    if (!countriesQuery.isSuccess || countriesQuery.isFetching) return undefined
    return t('common:noData')
  }, [
    countryOptions.length,
    countriesQuery.isSuccess,
    countriesQuery.isFetching,
    t,
  ])

  const cityEmptyMessage = useMemo(() => {
    if (!country) return undefined
    if (cityOptions.length > 0) return undefined
    if (!citiesQuery.isSuccess || citiesQuery.isFetching) return undefined
    return t('common:noData')
  }, [
    country,
    cityOptions.length,
    citiesQuery.isSuccess,
    citiesQuery.isFetching,
    t,
  ])

  const districtEmptyMessage = useMemo(() => {
    if (!country || !city) return undefined
    if (districtOptions.length > 0) return undefined
    if (!districtsQuery.isSuccess || districtsQuery.isFetching) return undefined
    return t('common:noData')
  }, [
    country,
    city,
    districtOptions.length,
    districtsQuery.isSuccess,
    districtsQuery.isFetching,
    t,
  ])

  const precinctEmptyMessage = useMemo(() => {
    if (!country || !city || !district) return undefined
    if (precinctOptions.length > 0) return undefined
    if (!precinctsQuery.isSuccess || precinctsQuery.isFetching) return undefined
    return t('common:noData')
  }, [
    country,
    city,
    district,
    precinctOptions.length,
    precinctsQuery.isSuccess,
    precinctsQuery.isFetching,
    t,
  ])

  const validateAndToast = () => {
    if (!formValues) return false
    const w = formValues

    if (!w.fullName?.trim()) {
      toast.error(t('requiredFullName'))
      return false
    }
    if (!w.dateOfBirth) {
      toast.error(t('requiredDateOfBirth'))
      return false
    }
    if (!w.gender) {
      toast.error(t('requiredGender'))
      return false
    }
    if (!w.phoneNumber?.trim()) {
      toast.error(t('requiredPhoneNumber'))
      return false
    }
    if (w.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(w.email.trim())) {
      const invalidEmailMessage = (i18n.language ?? '').startsWith('vi')
        ? 'Email không đúng định dạng.'
        : (i18n.language ?? '').startsWith('km')
          ? 'អ៊ីមែលមិនមានទម្រង់ត្រឹមត្រូវ។'
          : 'Invalid email format.'
      toast.error(invalidEmailMessage)
      return false
    }

    if (!w.country) {
      toast.error(t('requiredCountry'))
      return false
    }
    if (!w.city) {
      toast.error(t('requiredCity'))
      return false
    }
    if (!w.district) {
      toast.error(t('requiredDistrict'))
      return false
    }
    if (!w.precinct) {
      toast.error(t('requiredPrecinct'))
      return false
    }

    // Relationship chỉ cần khi edit family member (có idMember).
    if (idMember && !w.relationship) {
      toast.error(t('requiredRelationship'))
      return false
    }

    if (!w.street?.trim()) {
      toast.error(t('requiredStreet'))
      return false
    }
    if (!w.avatarUrl) {
      toast.error(t('requiredAvatar'))
      return false
    }

    return true
  }

  const { data: familyList } = useGetListFamilyQuery({
    params: {},
    enabled: !isUserProfile,
  })

  const { mutateAsync: getPatientProfile, isPending: isGettingPatientProfile } =
    useGetPatientProfileMutation({
      onSuccess: (data) => {
        setValue('fullName', data.data.name ?? '')
        setValue('dateOfBirth', data.data.dateOfBirth ?? '')
        setValue('gender', (data.data.gender as GenderValue) ?? 'MALE')
        setValue('phoneNumber', data.data.phone ?? '')
        setValue('email', data.data.email ?? '')
        setValue('country', data.data.address?.countryCode ?? '')
        setValue('avatarUrl', data.data.avatarUrl ?? '')
        setValue('city', data.data.address?.cityId?.toString() ?? '')
        setValue('district', data.data.address?.districtId?.toString() ?? '')
        setValue('precinct', data.data.address?.precinctId?.toString() ?? '')
        setValue('street', data.data.address?.detail ?? '')
        setValue('relationship', data.data.relationship)
      },
    })

  useEffect(() => {
    if (isUserProfile) {
      setValue('fullName', user?.name ?? '')
      setValue('dateOfBirth', user?.dateOfBirth ?? '')
      setValue('gender', (user?.gender as GenderValue) ?? 'MALE')
      setValue('phoneNumber', user?.phone ?? '')
      setValue('email', user?.email ?? '')
      setValue('country', user?.address?.countryCode ?? '')
      setValue('avatarUrl', user?.avatarUrl ?? '')
      setValue('city', user?.address?.cityId?.toString() ?? '')
      setValue('district', user?.address?.districtId?.toString() ?? '')
      setValue('precinct', user?.address?.precinctId?.toString() ?? '')
      setValue('street', user?.address?.detail ?? '')
    }

    if (idMember) {
      getPatientProfile(idMember)
    }
  }, [idMember, setValue, user])

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfileMutation()
  const router = useRouter()

  const { mutateAsync: addNewProfile, isPending: isAddingNewProfile } =
    useAddNewPatientProfileMutation()
  const {
    mutateAsync: updatePatientProfile,
    isPending: isUpdatingPatientProfile,
  } = useUpdatePatientProfileMutation()
  const { mutateAsync: deletePatientProfile, isPending: isDeletingProfile } =
    useDeletePatientProfileMutation()

  const handleSaveProfile = async () => {
    if (!validateAndToast()) return

    const request = {
      name: formValues.fullName!,
      dateOfBirth: formValues.dateOfBirth!,
      gender: formValues.gender!,
      phone: formValues.phoneNumber?.startsWith('+855')
        ? formValues.phoneNumber
        : `+855${formValues.phoneNumber}`,
      email: formValues.email || '',
      avatarUrl: formValues.avatarUrl,
      relationship: formValues.relationship,
      nationality: formValues.country,
      address: {
        countryCode: formValues.country,
        cityId: Number(formValues.city),
        districtId: Number(formValues.district),
        precinctId: Number(formValues.precinct),
        detail: formValues.street,
        cityName: cityOptions.find((c) => c.value === formValues.city)?.label,
        districtName: districtOptions.find(
          (d) => d.value === formValues.district,
        )?.label,
        precinctName: precinctOptions.find(
          (p) => p.value === formValues.precinct,
        )?.label,
        countryName: countryOptions.find((c) => c.value === formValues.country)
          ?.label,
      },
    }

    let res: HttpCommonResponse<PatientProfileResponse> | undefined
    if (idMember) {
      res = await updatePatientProfile({
        ...request,
        memberId: idMember,
      })
    }

    if (isUserProfile) {
      res = await updateProfile(request)
    }

    if (!isUserProfile && !idMember) {
      res = await addNewProfile(request)
    }

    if (!res) return
    if (res.success) {
      toast.success(t('profileUpdated'))
      router.history.back()
      if (isUserProfile) {
        // update profile store
        setProfile(res.data)
      }
    }
  }

  const handleConfirmDelete = async () => {
    if (!idMember) return
    const res = await deletePatientProfile(idMember)
    if (res.success) {
      toast.success(t('profileDeleted'))
      setIsDeleteDialogOpen(false)
      router.history.back()
    }
  }

  const relationshipOptions = [
    {
      label: t('common:relationships.self'),
      value: 'SELF',
    },
    {
      label: t('common:relationships.father'),
      value: 'FATHER',
    },
    {
      label: t('common:relationships.mother'),
      value: 'MOTHER',
    },
    {
      label: t('common:relationships.husband'),
      value: 'HUSBAND',
    },
    {
      label: t('common:relationships.wife'),
      value: 'WIFE',
    },
    {
      label: t('common:relationships.child'),
      value: 'CHILD',
    },
    {
      label: t('common:relationships.grandfather'),
      value: 'GRANDFATHER',
    },
    {
      label: t('common:relationships.grandmother'),
      value: 'GRANDMOTHER',
    },
    {
      label: t('common:relationships.sibling'),
      value: 'SIBLING',
    },
    {
      label: t('common:relationships.relative'),
      value: 'RELATIVE',
    },
    {
      label: t('common:relationships.friend'),
      value: 'FRIEND',
    },
  ]

  const filteredRelationshipOptions = useMemo(() => {
    if (
      familyList?.data?.patients?.find(
        (patient) =>
          patient.relationship === 'SELF' && formValues.relationship !== 'SELF',
      )
    ) {
      return relationshipOptions.filter((option) => option.value !== 'SELF')
    }
    return relationshipOptions
  }, [familyList?.data?.patients, formValues.relationship])

  return (
    <div className="pt-4 pb-20 px-4">
      <div className="mt-6">
        <UploadAvatar
          value={formValues.avatarUrl}
          onChange={(fileUrl) => {
            setValue('avatarUrl', fileUrl)
          }}
        />
      </div>

      {/* //form */}
      <div className="mt-6 gap-4 flex flex-col">
        <TextInput
          control={control}
          name="fullName"
          label={t('fullName')}
          placeholder={t('fullName')}
          isRequired
        />

        <DateInput
          control={control}
          name="dateOfBirth"
          label={t('dateOfBirth')}
          isRequired
        />

        <GenderInput
          control={control}
          name="gender"
          defaultValue="MALE"
          label={t('gender')}
          isRequired
        />
        <div className="flex flex-col gap-1">
          <Text size="base_14" className="text-text-secondary font-normal">
            {t('phoneNumber')}
            <span className="ml-1 text-primary">*</span>
          </Text>
          <div className="flex h-[45px] overflow-hidden rounded-[6px] border border-dust-red-1 bg-white">
            <div className="flex h-full items-center gap-[6px] border-r border-dust-red-1 bg-dust-red-1 px-[10px]">
              <FlagCambodia className="h-4 w-6 shrink-0" aria-hidden="true" />
              <Text size="sm_12" className="font-normal text-[#1A1A1A]">
                +855
              </Text>
            </div>
            <input
              value={formValues.phoneNumber ?? ''}
              onChange={(event) => setValue('phoneNumber', event.target.value)}
              onBlur={() => {}}
              name="phoneNumber"
              ref={() => {}}
              type="tel"
              inputMode="tel"
              placeholder={t('phoneNumber')}
              className="h-full w-full bg-transparent px-3 text-base text-[#1A1A1A] outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <TextInput
          control={control}
          name="email"
          label={t('email')}
          placeholder={t('email')}
        />

        {idMember || !isUserProfile ? (
          <InputSelect
            control={control}
            name="relationship"
            options={filteredRelationshipOptions}
            placeholder={t('relationship')}
            label={t('relationship')}
            isRequired
          />
        ) : null}

        <InputSelect
          control={control}
          name="country"
          options={countryOptions}
          placeholder={t('country')}
          label={t('country')}
          isRequired
          emptyMessage={countryEmptyMessage}
          onChangeCallback={() => {
            setValue('city', '')
            setValue('district', '')
            setValue('precinct', '')
          }}
        />

        <InputSelect
          control={control}
          name="city"
          options={cityOptions}
          placeholder={t('city')}
          label={t('city')}
          isRequired
          disabled={!country}
          emptyMessage={cityEmptyMessage}
          onChangeCallback={() => {
            setValue('district', '')
            setValue('precinct', '')
          }}
        />

        <InputSelect
          control={control}
          name="district"
          options={districtOptions}
          placeholder={t('district')}
          label={t('district')}
          isRequired
          disabled={!country || !city}
          emptyMessage={districtEmptyMessage}
          onChangeCallback={() => {
            setValue('precinct', '')
          }}
        />

        <InputSelect
          control={control}
          name="precinct"
          options={precinctOptions}
          placeholder={t('precinct')}
          label={t('precinct')}
          isRequired
          disabled={!country || !city || !district}
          emptyMessage={precinctEmptyMessage}
        />

        <TextInput
          control={control}
          name="street"
          label={t('street')}
          placeholder={t('street')}
          isRequired
        />
      </div>

      {/* stricky save button */}
      <div className="fixed inset-x-4 bottom-4">
        {!idMember && (
          <Button
            type="button"
            variant="secondary"
            className="h-[45px] w-full rounded-full"
            onClick={handleSaveProfile}
            disabled={!isUserProfile ? isAddingNewProfile : isUpdatingProfile}
          >
            {!isUserProfile ? (
              <>
                <Icon name="add_profile" />
                <Text size="base_14" className="font-medium text-white">
                  {t('addProfile')}
                </Text>
              </>
            ) : (
              <Text
                size="base_14"
                className="w-full text-center font-medium text-white"
              >
                {t('save')}
              </Text>
            )}
          </Button>
        )}

        {idMember && (
          <div className="flex items-center gap-[10px]">
            <Button
              type="button"
              variant="ghost"
              className="h-[45px] flex-1 rounded-[40px] border border-primary bg-background px-3 py-[12px] hover:bg-white"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeletingProfile}
            >
              <Text size="base_14" className="font-medium text-primary">
                {t('delete')}
              </Text>
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="h-[45px] flex-1 rounded-[40px] bg-primary px-3 py-[12px] hover:bg-primary"
              onClick={handleSaveProfile}
              disabled={isUpdatingProfile}
            >
              <Text size="base_14" className="font-medium text-white">
                {t('profile:editProfile')}
              </Text>
            </Button>
          </div>
        )}
      </div>
      <ConfirmModal
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={t('deletePatientProfileTitle')}
        description={t('deletePatientProfileMessage')}
        cancelText={t('no')}
        confirmText={t('yes')}
        confirmDisabled={isDeletingProfile}
        onConfirm={handleConfirmDelete}
      />
      <LoadingBlocking
        isLoading={
          isAddingNewProfile ||
          isUpdatingProfile ||
          isDeletingProfile ||
          isUpdatingPatientProfile ||
          isGettingPatientProfile
        }
      />
    </div>
  )
}
