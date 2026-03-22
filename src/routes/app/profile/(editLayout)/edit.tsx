import type { GenderValue } from '#/components/input/GenderInputBase'

import DateInput from '#/components/react-hook-form/DateInput'
import GenderInput from '#/components/react-hook-form/GenderInput'
import InputSelect from '#/components/react-hook-form/InputSelect'
import TextInput from '#/components/react-hook-form/TextInput'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import UploadAvatar from '#/sections/profile/UploadAvatar'
import { useGetCitiesQuery } from '#/services/query/profile/getCity'
import { useGetCountriesQuery } from '#/services/query/profile/getCountry'
import { useGetDistrictsQuery } from '#/services/query/profile/getDistrict'
import { useGetPrecinctsQuery } from '#/services/query/profile/getPrecinct'
import { useProfileStore } from '#/stores/profile'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

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
      relationship: 'SELF',
      city: '',
      district: '',
      precinct: '',
      street: '',
      avatarUrl: '',
    },
  })

  const { t, i18n } = useTranslation(['profile', 'common'])
  const { idMember } = Route.useSearch()
  const user = useProfileStore((s) => s.profile)

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

  const skipCountryCascade = useRef(true)
  useEffect(() => {
    if (skipCountryCascade.current) {
      skipCountryCascade.current = false
      return
    }
    setValue('city', '')
    setValue('district', '')
    setValue('precinct', '')
  }, [country, setValue])

  const skipCityCascade = useRef(true)
  useEffect(() => {
    if (skipCityCascade.current) {
      skipCityCascade.current = false
      return
    }
    setValue('district', '')
    setValue('precinct', '')
  }, [city, setValue])

  const skipDistrictCascade = useRef(true)
  useEffect(() => {
    if (skipDistrictCascade.current) {
      skipDistrictCascade.current = false
      return
    }
    setValue('precinct', '')
  }, [district, setValue])

  const canSave = useMemo(() => {
    if (!formValues) return false
    const w = formValues
    return Boolean(
      w.fullName?.trim() &&
      w.dateOfBirth &&
      w.gender &&
      w.phoneNumber?.trim() &&
      w.relationship &&
      w.country &&
      w.city &&
      w.district &&
      w.precinct &&
      w.street?.trim() &&
      w.avatarUrl,
    )
  }, [formValues])

  useEffect(() => {
    if (!idMember) {
      setValue('fullName', user?.name ?? '')
      setValue('dateOfBirth', user?.dateOfBirth ?? '')
      setValue('gender', (user?.gender as GenderValue) ?? 'MALE')
      setValue('phoneNumber', user?.phone ?? '')
      setValue('email', user?.email ?? '')
      setValue('relationship', user?.relationship ?? 'SELF')
      setValue('country', user?.nationality ?? '')
      setValue('avatarUrl', user?.avatarUrl ?? '')
    }
  }, [idMember, setValue, user])

  return (
    <div className="pt-4 pb-20 px-4">
      <div className="mt-6">
        <UploadAvatar
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
        <TextInput
          control={control}
          name="phoneNumber"
          label={t('phoneNumber')}
          placeholder={t('phoneNumber')}
          isRequired
        />

        <TextInput
          control={control}
          name="email"
          label={t('email')}
          placeholder={t('email')}
        />

        <InputSelect
          control={control}
          name="relationship"
          options={[
            { label: t('common:relationships.self'), value: 'SELF' },
            { label: t('common:relationships.father'), value: 'FATHER' },
            { label: t('common:relationships.mother'), value: 'MOTHER' },
            { label: t('common:relationships.husband'), value: 'HUSBAND' },
            { label: t('common:relationships.wife'), value: 'WIFE' },
            { label: t('common:relationships.child'), value: 'CHILD' },
            {
              label: t('common:relationships.grandfather'),
              value: 'GRANDFATHER',
            },
            {
              label: t('common:relationships.grandmother'),
              value: 'GRANDMOTHER',
            },
            { label: t('common:relationships.sibling'), value: 'SIBLING' },
            { label: t('common:relationships.relative'), value: 'RELATIVE' },
            { label: t('common:relationships.friend'), value: 'FRIEND' },
          ]}
          placeholder={t('relationship')}
          label={t('relationship')}
          isRequired
        />

        <InputSelect
          control={control}
          name="country"
          options={countryOptions}
          placeholder={t('country')}
          label={t('country')}
          isRequired
          emptyMessage={countryEmptyMessage}
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
        <Button
          type="button"
          variant="secondary"
          className="h-[45px] w-full rounded-full"
          disabled={!canSave}
          onClick={() => {}}
        >
          <Text
            size="base_14"
            className="w-full text-center font-medium text-white"
          >
            {t('save')}
          </Text>
        </Button>
      </div>
    </div>
  )
}
