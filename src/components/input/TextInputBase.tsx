import { Input } from '#/components/ui/input'
import type { TextInputProps } from '#/types/input'
import Text from '../text'

export default function TextInputBase({
  label = '',
  isRequired = false,
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Text size="base_14" className="text-text-secondary font-normal">
          {label}
          {isRequired && <span className="text-primary ml-1">*</span>}
        </Text>
      )}
      <Input
        {...props}
        className=" bg-white border-dust-red-1 border h-[45px] text-base"
      />
    </div>
  )
}
