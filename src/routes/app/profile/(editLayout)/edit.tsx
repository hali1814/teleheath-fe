import type { GenderValue } from '#/components/input/GenderInputBase'

import DateInput from '#/components/react-hook-form/DateInput'
import GenderInput from '#/components/react-hook-form/GenderInput'
import InputSelect from '#/components/react-hook-form/InputSelect'
import TextInput from '#/components/react-hook-form/TextInput'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import UploadAvatar from '#/sections/profile/UploadAvatar'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/profile/(editLayout)/edit')({
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
}

function RouteComponent() {
  const form = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: 'male',
      phoneNumber: '',
      email: '',
      country: '',
      relationship: 'self',
      city: '',
      district: '',
      precinct: '',
      street: '',
    },
  })

  const { t } = useTranslation(['profile', 'common'])
  return (
    <div className="pb-20 px-4">
      <div className="mt-6 flex flex-col items-center justify-center">
        <UploadAvatar />
        <Text
          size="base_14"
          className="text-dust-red-8 font-medium mt-4 text-center"
        >
          {t('uploadPhoto')}
        </Text>
      </div>

      {/* //form */}
      <div className="mt-6 gap-4 flex flex-col">
        <TextInput
          control={form.control}
          name="fullName"
          label={t('fullName')}
          placeholder={t('fullName')}
          isRequired
        />

        <DateInput
          control={form.control}
          name="dateOfBirth"
          label={t('dateOfBirth')}
          isRequired
        />

        <GenderInput
          control={form.control}
          name="gender"
          defaultValue="male"
          label={t('gender')}
          isRequired
        />
        <TextInput
          control={form.control}
          name="phoneNumber"
          label={t('phoneNumber')}
          placeholder={t('phoneNumber')}
          isRequired
        />

        <TextInput
          control={form.control}
          name="email"
          label={t('email')}
          placeholder={t('email')}
        />

        <InputSelect
          control={form.control}
          name="relationship"
          options={[
            { label: t('common:relationships.self'), value: 'self' },
            { label: t('common:relationships.father'), value: 'father' },
            { label: t('common:relationships.mother'), value: 'mother' },
            { label: t('common:relationships.husband'), value: 'husband' },
            { label: t('common:relationships.wife'), value: 'wife' },
            { label: t('common:relationships.child'), value: 'child' },
            {
              label: t('common:relationships.grandfather'),
              value: 'grandfather',
            },
            {
              label: t('common:relationships.grandmother'),
              value: 'grandmother',
            },
            { label: t('common:relationships.sibling'), value: 'sibling' },
            { label: t('common:relationships.relative'), value: 'relative' },
            { label: t('common:relationships.friend'), value: 'friend' },
          ]}
          placeholder={t('relationship')}
          label={t('relationship')}
          isRequired
        />

        <InputSelect
          control={form.control}
          name="country"
          options={[
            { label: t('common:countries.vietnam'), value: 'vietnam' },
            { label: t('common:countries.cambodia'), value: 'cambodia' },
          ]}
          placeholder={t('country')}
          label={t('country')}
          isRequired
        />

        <InputSelect
          control={form.control}
          name="city"
          options={[]}
          placeholder={t('city')}
          label={t('city')}
          isRequired
        />

        <InputSelect
          control={form.control}
          name="district"
          options={[]}
          placeholder={t('district')}
          label={t('district')}
          isRequired
        />

        <InputSelect
          control={form.control}
          name="precinct"
          options={[]}
          placeholder={t('precinct')}
          label={t('precinct')}
          isRequired
        />

        <TextInput
          control={form.control}
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
