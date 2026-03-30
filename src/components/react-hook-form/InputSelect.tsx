import { useController, type FieldValues } from 'react-hook-form'

import InputSelectBase from '#/components/input/InputSelect'
import type { RHFTextInputProps } from '#/types/input'

interface InputSelectProps<
  TFieldValues extends FieldValues,
> extends RHFTextInputProps<TFieldValues> {
  placeholder: string
  options: { label: string; value: string }[]
  disabled?: boolean
  emptyMessage?: string
  onChangeCallback?: (value: string) => void
}

export default function InputSelect<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue,
  onChangeCallback,
  ...props
}: InputSelectProps<TFieldValues>) {
  const { field } = useController({
    name,
    control,
  })

  const onChange = (value: string) => {
    field.onChange(value)
    onChangeCallback?.(value)
  }

  return (
    <InputSelectBase
      {...props}
      value={field.value || undefined}
      defaultValue={defaultValue as string | undefined}
      onValueChange={onChange}
    />
  )
}
