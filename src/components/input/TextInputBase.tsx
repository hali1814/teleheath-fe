import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'
import type { TextInputProps } from '#/types/input'
import Text from '../text'

export default function TextInputBase({
  label = '',
  isRequired = false,
  msgError,
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
        className={cn(
          ' bg-white border h-[45px] text-base',
          !!msgError ? 'border-red-600' : 'border-dust-red-1',
        )}
      />
      {!!msgError && (
        <Text size="sm_12" className="text-red-600">
          {msgError}
        </Text>
      )}
    </div>
  )
}
