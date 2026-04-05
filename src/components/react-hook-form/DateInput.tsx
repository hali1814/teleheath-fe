import { useController, type FieldValues } from 'react-hook-form'
import DateInputBase from '../input/DateInputBase'
import type { RHFTextInputProps } from '#/types/input'

interface DateInputProps<
  TFieldValues extends FieldValues,
> extends RHFTextInputProps<TFieldValues> {}

export default function DateInput<TFieldValues extends FieldValues>({
  control,
  name,
  value,
  defaultValue,
  ...props
}: DateInputProps<TFieldValues>) {
  const {
    field,
    // fieldState: { error  },
  } = useController({
    name,
    control,
  })

  return (
    <DateInputBase
      {...props}
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
    />
  )
}
