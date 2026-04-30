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
import { useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod/v4'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useUpdateProfileMutation } from '#/services/query/profile/updateProfile'
import { Icon } from '#/components/icon'
import {
  useAddNewPatientProfileMutation,
  useDeletePatientProfileMutation,
  useUpdatePatientProfileMutation,
} from '#/services/query/profile/patientProfile'
import {
  useGetListFamilyQuery,
  useGetPatientProfileMutation,
} from '#/services/query/profile/listFamily'
import { useCheckPhoneMutation } from '#/services/query/profile/checkPhone'
import type { HttpCommonResponse } from '#/services/network/http-request'
import type { PatientProfileResponse } from '#/services/query/profile/getProfile'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import LoadingState from '#/components/LoadingState'
import { useProfileEditLayoutTitleStore } from '#/stores/profile-edit-layout-title'

export interface FormProfileProps {
  idMember?: number
  isUserProfile: boolean
  customButton?: (handleSaveProfile: () => void) => React.ReactNode
  containerClassName?: string
  onSuccess?: (profile?: PatientProfileResponse) => void
  pyPassCheckViewMode?: boolean
}

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

const stripCountryCode = (phone: string) =>
  phone.replace(/^(\+855|00855|855)/, '').replace(/^0/, '')

export default function FormProfile({
  containerClassName,
  idMember,
  isUserProfile,
  customButton,
  onSuccess,
  pyPassCheckViewMode = false,
}: FormProfileProps) {
  const { t, i18n } = useTranslation(['profile', 'common'])

  const formSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().nonempty(t('requiredFullName')),
        dateOfBirth: z
          .string()
          .nonempty(t('requiredDateOfBirth'))
          .refine(
            (val) => dayjs(val, 'YYYY-MM-DD', true).isValid(),
            t('invalidDateOfBirth'),
          )
          .refine(
            (val) => !dayjs(val, 'YYYY-MM-DD', true).isAfter(dayjs()),
            t('futureDateOfBirth'),
          )
          .refine(
            (val) =>
              dayjs().diff(dayjs(val, 'YYYY-MM-DD', true), 'year') <= 120,
            t('tooOldDateOfBirth'),
          ),
        gender: z.enum(['MALE', 'FEMALE']),
        phoneNumber: z
          .string()
          .nonempty(t('requiredPhoneNumber'))
          .refine(
            (val) =>
              /^(1[0-8]|2[3-6]|3[1-68]|4[2-4]|5[2-5]|6[0-36-9]|7[0-9]|8[015-9]|9[0-35-9])\d{6,7}$/.test(
                val,
              ),
            t('invalidPhoneFormat'),
          ),
        email: z
          .string()
          .refine(
            (val) =>
              !val.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
            t('invalidEmail'),
          ),
        country: z.string(),
        relationship: isUserProfile
          ? z.string()
          : z.string().nonempty(t('requiredRelationship')),
        city: z.string(),
        district: z.string(),
        precinct: z.string(),
        street: z.string(),
        avatarUrl: z.string(),
      }),
    [t, isUserProfile],
  )

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
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

  const originalPhoneRef = useRef('')

  const user = useProfileStore((s) => s.profile)
  const setProfile = useProfileStore((s) => s.setProfile)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUseAccountInfoDialogOpen, setIsUseAccountInfoDialogOpen] =
    useState(false)
  const country = useWatch({ control, name: 'country' })
  const city = useWatch({ control, name: 'city' })
  const district = useWatch({ control, name: 'district' })
  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' })
  const formValues = useWatch({ control })

  const isUnder12 = useMemo(() => {
    if (!dateOfBirth) return false
    const parsed = dayjs(dateOfBirth, 'YYYY-MM-DD', true)
    if (!parsed.isValid()) return false
    return dayjs().diff(parsed, 'year') < 12
  }, [dateOfBirth])
  const [editModeMemberFamily, setEditModeMemberFamily] = useState<
    'edit' | 'view'
  >('view')

  const isViewMode =
    editModeMemberFamily === 'view' && Boolean(idMember) && !pyPassCheckViewMode

  const isPhoneLockedByAge = isUnder12 && !isUserProfile
  const setLayoutTitle = useProfileEditLayoutTitleStore((s) => s.setTitle)

  useEffect(() => {
    if (isUserProfile) {
      setLayoutTitle(t('profileInformation'))
      return
    }

    if (idMember) {
      setLayoutTitle(
        editModeMemberFamily === 'view'
          ? t('patientProfile')
          : t('editPatientProfile'),
      )
      return
    }

    setLayoutTitle(t('addPatientProfile'))
  }, [isUserProfile, idMember, editModeMemberFamily, setLayoutTitle, t])

  useEffect(() => {
    if (isPhoneLockedByAge) {
      const accountPhone = stripCountryCode(
        user?.phone || user?.contactNumber || '',
      )
      setValue('phoneNumber', accountPhone)
      clearErrors('phoneNumber')
    }
  }, [isPhoneLockedByAge, user, setValue])

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
      label: getLocalizedTextByLang(
        c.nameVi,
        c.nameKh,
        c.nameEn,
        i18n.language as AppLanguage,
      ),
    }))
  }, [countriesQuery.data?.data, i18n.language])

  const cityOptions = useMemo(() => {
    const list = citiesQuery.data?.data
    if (!list?.length) return []
    return list.map((c) => ({
      value: String(c.id),
      label: getLocalizedTextByLang(
        c.nameVi,
        c.nameKh,
        c.nameEn,
        i18n.language as AppLanguage,
      ),
    }))
  }, [citiesQuery.data?.data, i18n.language])

  const districtOptions = useMemo(() => {
    const list = districtsQuery.data?.data
    if (!list?.length) return []
    return list.map((d) => ({
      value: String(d.id),
      label: getLocalizedTextByLang(
        d.nameVi,
        d.nameKh,
        d.nameEn,
        i18n.language as AppLanguage,
      ),
    }))
  }, [districtsQuery.data?.data, i18n.language])

  const precinctOptions = useMemo(() => {
    const list = precinctsQuery.data?.data
    if (!list?.length) return []
    return list.map((p) => ({
      value: String(p.id),
      label: getLocalizedTextByLang(
        p.nameVi,
        p.nameKh,
        p.nameEn,
        i18n.language as AppLanguage,
      ),
    }))
  }, [precinctsQuery.data?.data, i18n.language])

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

    if (!w.gender) {
      toast.error(t('requiredGender'))
      return false
    }

    if (idMember && !w.relationship) {
      toast.error(t('requiredRelationship'))
      return false
    }

    return true
  }

  const { data: familyList } = useGetListFamilyQuery({
    params: {},
    enabled: !isUserProfile,
  })

  const {
    mutateAsync: getPatientProfile,
    isPending: isGettingPatientProfile,
    data: patientProfile,
  } = useGetPatientProfileMutation({
    onSuccess: (data) => {
      setValue('fullName', data.data.fullName ?? '')
      setValue('dateOfBirth', data.data.dateOfBirth || data.data.dob || '')
      setValue('gender', (data.data.gender as GenderValue) ?? 'MALE')
      const rawPhone = data.data.phone || data.data.contactNumber || ''
      originalPhoneRef.current = rawPhone
      setValue('phoneNumber', stripCountryCode(rawPhone))
      setValue('email', data.data.email ?? '')
      setValue('country', data.data.nationality ?? '')
      setValue('avatarUrl', data.data.avatarUrl ?? '')
      setValue('city', data.data.address?.cityId?.toString() ?? '')
      setValue('district', data.data.address?.districtId?.toString() ?? '')
      setValue('precinct', data.data.address?.precinctId?.toString() ?? '')
      setValue('street', data.data.address?.detail ?? '')
      setValue('relationship', data.data.relationship)
    },
  })

  const fillProfileInfoToForm = () => {
    setValue('fullName', user?.fullName ?? '')
    setValue('dateOfBirth', user?.dob || user?.dateOfBirth || '')
    setValue('gender', (user?.gender as GenderValue) ?? 'MALE')
    const rawPhone = user?.phone || user?.contactNumber || ''
    originalPhoneRef.current = rawPhone
    setValue('phoneNumber', stripCountryCode(rawPhone))
    setValue('email', user?.email ?? '')
    setValue('country', user?.nationality ?? '')
    setValue('avatarUrl', user?.avatarUrl ?? '')
    setValue('city', user?.address?.cityId?.toString() ?? '')
    setValue('district', user?.address?.districtId?.toString() ?? '')
    setValue('precinct', user?.address?.precinctId?.toString() ?? '')
    setValue('street', user?.address?.detail ?? '')
  }

  useEffect(() => {
    if (isUserProfile) {
      fillProfileInfoToForm()
    }

    if (idMember) {
      getPatientProfile(idMember)
    }
  }, [idMember, setValue, user, isUserProfile])

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
  const { mutateAsync: checkPhone } = useCheckPhoneMutation()
  const onValidSubmit = async (data: FormValues) => {
    if (!validateAndToast()) return

    if (!isUserProfile && !isPhoneLockedByAge) {
      const res = await checkPhone(
        data.phoneNumber?.startsWith('+855')
          ? data.phoneNumber
          : `+855${data.phoneNumber}`,
      )
      if (res.data?.exists && res.data?.phone !== originalPhoneRef.current) {
        setError('phoneNumber', { message: t('phoneLinkedToProfile') })
        return
      }
    }

    const request = {
      name: data.fullName,
      dob: data.dateOfBirth,
      gender: data.gender,
      phone: data.phoneNumber?.startsWith('+855')
        ? data.phoneNumber
        : `+855${data.phoneNumber}`,
      email: data.email || '',
      avatarUrl: data.avatarUrl,
      relationship: data.relationship,
      nationality: data.country,
      address: {
        countryCode: data.country,
        cityId: Number(data.city),
        districtId: Number(data.district),
        precinctId: Number(data.precinct),
        detail: data.street,
        cityName: cityOptions.find((c) => c.value === data.city)?.label,
        districtName: districtOptions.find((d) => d.value === data.district)
          ?.label,
        precinctName: precinctOptions.find((p) => p.value === data.precinct)
          ?.label,
        countryName: countryOptions.find((c) => c.value === data.country)
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
      onSuccess ? onSuccess(res.data) : router.history.back()
      if (isUserProfile) {
        setProfile(res.data)
      }
    }
  }

  const handleSaveProfile = handleSubmit(onValidSubmit)

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
  }, [familyList?.data?.patients, formValues.relationship, t])

  if (
    isAddingNewProfile ||
    isUpdatingProfile ||
    isDeletingProfile ||
    isUpdatingPatientProfile ||
    isGettingPatientProfile
  ) {
    return <LoadingState />
  }

  return (
    <div className={cn('pt-4 pb-20 px-4', containerClassName)}>
      <div className={cn('mt-6', isViewMode && 'pointer-events-none')}>
        <UploadAvatar
          isPatientProfile={!!idMember || (!isUserProfile && !idMember)}
          disabled={isViewMode}
          value={formValues.avatarUrl}
          onChange={(fileUrl) => {
            setValue('avatarUrl', fileUrl)
          }}
        />
      </div>

      {!!idMember && (
        <Text
          size="lg_16"
          className="text-primary font-medium mt-2 text-center"
        >
          {t('patientId')}: #
          {patientProfile?.data?.patientCode ||
            patientProfile?.data?.profileCode}
        </Text>
      )}

      <div className="mt-6 gap-4 flex flex-col">
        <TextInput
          control={control}
          name="fullName"
          label={t('fullName')}
          placeholder={t('fullName')}
          isRequired
          disabled={isViewMode}
        />

        <DateInput
          control={control}
          name="dateOfBirth"
          label={t('dateOfBirth')}
          isRequired
          disabled={isViewMode}
        />

        <GenderInput
          control={control}
          name="gender"
          defaultValue="MALE"
          label={t('gender')}
          isRequired
          disabled={isViewMode}
        />
        <div className="flex flex-col gap-1">
          <Text size="base_14" className="text-text-secondary font-normal">
            {t('phoneNumber')}
            <span className="ml-1 text-primary">*</span>
          </Text>
          <div
            className={cn(
              'flex h-[45px] overflow-hidden rounded-[6px] border bg-white',
              errors.phoneNumber ? 'border-red-600' : 'border-dust-red-1',
              (isViewMode || isPhoneLockedByAge) &&
                'opacity-50 pointer-events-none cursor-not-allowed',
            )}
          >
            <div className="flex h-full items-center gap-[6px] border-r border-dust-red-1 bg-dust-red-1 px-[10px]">
              <FlagCambodia className="h-4 w-6 shrink-0" aria-hidden="true" />
              <Text size="sm_12" className="font-normal text-[#1A1A1A]">
                +855
              </Text>
            </div>
            <input
              value={formValues.phoneNumber ?? ''}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, '')
                  .replace(/^0/, '')
                setValue('phoneNumber', digits, { shouldValidate: true })
              }}
              onBlur={() => {}}
              name="phoneNumber"
              ref={() => {}}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              disabled={isViewMode || isPhoneLockedByAge}
              readOnly={isViewMode || isPhoneLockedByAge}
              placeholder={t('phoneNumber')}
              className="h-full w-full bg-transparent px-3 text-base text-[#1A1A1A] outline-none placeholder:text-muted-foreground"
            />
          </div>
          {errors.phoneNumber && (
            <Text size="sm_12" className="text-red-600">
              {errors.phoneNumber.message}
            </Text>
          )}
        </div>

        <TextInput
          control={control}
          name="email"
          label={t('email')}
          placeholder={t('email')}
          disabled={isViewMode}
        />

        {idMember || !isUserProfile ? (
          <InputSelect
            control={control}
            name="relationship"
            options={filteredRelationshipOptions}
            placeholder={t('relationship')}
            label={t('relationshipToAccountHolder')}
            isRequired
            disabled={isViewMode}
            onChangeCallback={(value) => {
              if (value === 'SELF') {
                setIsUseAccountInfoDialogOpen(true)
              }
            }}
          />
        ) : null}

        <InputSelect
          control={control}
          name="country"
          options={countryOptions}
          placeholder={t('country')}
          label={t('country')}
          disabled={isViewMode}
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
          disabled={isViewMode || !country}
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
          disabled={isViewMode || !country || !city}
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
          disabled={isViewMode || !country || !city || !district}
          emptyMessage={precinctEmptyMessage}
        />

        <TextInput
          control={control}
          name="street"
          label={t('street')}
          placeholder={t('street')}
          disabled={isViewMode}
        />
      </div>
      {/* // */}
      {!!customButton ? (
        customButton(handleSaveProfile)
      ) : (
        <div className="fixed inset-x-0 bottom-0 bg-background px-4 pb-4">
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

          {idMember && editModeMemberFamily === 'edit' && (
            <Button
              type="button"
              variant="secondary"
              className="h-[45px] w-full rounded-full"
              onClick={handleSaveProfile}
              disabled={!isUserProfile ? isAddingNewProfile : isUpdatingProfile}
            >
              <Text
                size="base_14"
                className="w-full text-center font-medium text-white"
              >
                {t('save')}
              </Text>
            </Button>
          )}

          {idMember && editModeMemberFamily === 'view' && (
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
                onClick={() => setEditModeMemberFamily('edit')}
                disabled={isUpdatingProfile}
              >
                <Text size="base_14" className="font-medium text-white">
                  {t('profile:editProfile')}
                </Text>
              </Button>
            </div>
          )}
        </div>
      )}

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
      <ConfirmModal
        open={isUseAccountInfoDialogOpen}
        onOpenChange={setIsUseAccountInfoDialogOpen}
        title={t('useAccountInformationTitle')}
        description={t('useAccountInformationMessage')}
        cancelText={t('no')}
        confirmText={t('yes')}
        onConfirm={() => {
          fillProfileInfoToForm()
          setIsUseAccountInfoDialogOpen(false)
        }}
      />
    </div>
  )
}
