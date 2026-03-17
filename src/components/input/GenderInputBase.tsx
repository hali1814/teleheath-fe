import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { TextInputProps } from '#/types/input'

export type GenderValue = 'male' | 'female'

export interface GenderInputBaseProps extends Omit<
  TextInputProps,
  'type' | 'onChange' | 'value' | 'defaultValue'
> {
  value?: GenderValue
  defaultValue?: GenderValue
  onValueChange?: (value: GenderValue) => void
  labels: {
    male: string
    female: string
  }
}

export default function GenderInputBase({
  label = '',
  isRequired = false,
  value,
  defaultValue = 'male',
  onValueChange,
  className,
  disabled,
  labels,
}: GenderInputBaseProps) {
  const currentValue = value ?? defaultValue

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <Text size="base_14" className="text-text-secondary font-normal">
          {label}
          {isRequired ? <span className="text-primary ml-1">*</span> : null}
        </Text>
      ) : null}

      <div
        className="flex w-full gap-1 rounded-md border border-[#D331311A] bg-[#D331310D] p-1"
        role="group"
        aria-label={label}
      >
        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => onValueChange?.('male')}
          className={cn(
            'h-[37px] flex-1 rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
            currentValue === 'male'
              ? 'bg-white hover:bg-white'
              : 'bg-transparent shadow-none hover:bg-transparent',
          )}
        >
          <Text
            size="base_14"
            className={cn(
              'w-full text-center font-normal',
              currentValue === 'male' ? 'text-badge' : 'text-[#64748B]',
            )}
          >
            {labels.male}
          </Text>
        </Button>

        <Button
          type="button"
          variant="ghost"
          disabled={disabled}
          onClick={() => onValueChange?.('female')}
          className={cn(
            'h-[37px] flex-1 rounded-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
            currentValue === 'female'
              ? 'bg-white hover:bg-white'
              : 'bg-transparent shadow-none hover:bg-transparent',
          )}
        >
          <Text
            size="base_14"
            className={cn(
              'w-full text-center font-normal',
              currentValue === 'female' ? 'text-badge' : 'text-[#64748B]',
            )}
          >
            {labels.female}
          </Text>
        </Button>
      </div>
    </div>
  )
}
