import { useTranslation } from 'react-i18next'
import { useController, type FieldValues } from 'react-hook-form'

import GenderInputBase, { type GenderValue } from '#/components/input/GenderInputBase'
import type { RHFTextInputProps } from '#/types/input'

interface GenderInputProps<
  TFieldValues extends FieldValues,
> extends RHFTextInputProps<TFieldValues> {}

export default function GenderInput<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue,
  ...props
}: GenderInputProps<TFieldValues>) {
  const { t } = useTranslation('profile')
  const { field } = useController({
    name,
    control,
  })

  return (
    <GenderInputBase
      {...props}
      value={field.value as GenderValue | undefined}
      defaultValue={defaultValue as GenderValue | undefined}
      onValueChange={(next) => field.onChange(next)}
      onBlur={field.onBlur}
      labels={{
        male: t('genderMale'),
        female: t('genderFemale'),
      }}
    />
  )
}

