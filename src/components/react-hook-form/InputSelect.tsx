import { useController, type FieldValues } from 'react-hook-form'

import InputSelectBase from '#/components/input/InputSelect'
import type { RHFTextInputProps } from '#/types/input'

interface InputSelectProps<TFieldValues extends FieldValues>
  extends RHFTextInputProps<TFieldValues> {
  placeholder: string
  options: { label: string; value: string }[]
}

export default function InputSelect<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue,
  ...props
}: InputSelectProps<TFieldValues>) {
  const { field } = useController({
    name,
    control,
  })

  return (
    <InputSelectBase
      {...props}
      value={field.value}
      defaultValue={defaultValue as string | undefined}
      onValueChange={field.onChange}
    />
  )
}