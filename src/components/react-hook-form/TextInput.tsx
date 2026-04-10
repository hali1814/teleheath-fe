import type { RHFTextInputProps } from '#/types/input'
import { useController, type FieldValues } from 'react-hook-form'
import TextInputBase from '../input/TextInputBase'

interface TextInputProps<
  TFieldValues extends FieldValues,
> extends RHFTextInputProps<TFieldValues> {}

export default function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: TextInputProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value)
  }

  return (
    <TextInputBase
      {...props}
      value={field.value}
      onChange={onChange}
      onBlur={field.onBlur}
      msgError={error?.message}
    />
  )
}
