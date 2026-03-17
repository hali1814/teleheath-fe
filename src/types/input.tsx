import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isRequired?: boolean
}

export interface IInputProps extends TextInputProps {}

export interface RHFTextInputProps<
  TFieldValues extends FieldValues,
> extends IInputProps {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
}
