import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Calendar } from '#/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group'
import { cn } from '#/lib/utils'
import type { TextInputProps } from '#/types/input'

export interface DateInputBaseProps extends Omit<
  TextInputProps,
  'type' | 'onChange' | 'value' | 'defaultValue'
> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export default function DateInputBase({
  label = '',
  isRequired = false,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled,
  placeholder = 'DD-MM-YYYY',
  ...props
}: DateInputBaseProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '')
  const [open, setOpen] = useState(false)

  const currentValue = isControlled ? (value ?? '') : internalValue

  const selectedDate = useMemo(() => {
    if (!currentValue) return undefined
    const parsed = dayjs(currentValue, ['YYYY-MM-DD', 'DD-MM-YYYY'], true)
    return parsed.isValid() ? parsed.toDate() : undefined
  }, [currentValue])

  const displayValue = useMemo(() => {
    if (!selectedDate) return ''
    return dayjs(selectedDate).format('DD-MM-YYYY')
  }, [selectedDate])

  const commitValue = (nextIso: string) => {
    if (!isControlled) setInternalValue(nextIso)
    onValueChange?.(nextIso)
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label ? (
        <Text size="base_14" className="text-text-secondary font-normal">
          {label}
          {isRequired ? <span className="text-primary ml-1">*</span> : null}
        </Text>
      ) : null}

      <div
        role="button"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (disabled) return
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
        className="w-full"
      >
        <InputGroup className="h-[45px] bg-white border-dust-red-1 border">
          <InputGroupInput
            {...props}
            disabled={disabled}
            readOnly
            value={displayValue}
            placeholder={placeholder}
            className="h-[45px] text-base"
          />
          <InputGroupAddon align="inline-end" className="cursor-pointer">
            <Icon
              name="calendar_profile"
              className="size-5 text-text-secondary"
            />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className={cn(
            'flex w-fit max-w-[calc(100vw-32px)] flex-col border-0 bg-transparent p-0 shadow-none',
            /* Ghi đè layout grid mặc định — tránh ô lịch bị co chiều cao, hàng cuối “tràn” khỏi nền trắng trên mobile */
            'max-h-[min(90dvh,100svh)] overflow-y-auto overflow-x-hidden',
          )}
        >
          <DialogTitle className="sr-only">Select date</DialogTitle>
          <DialogDescription className="sr-only">Select date</DialogDescription>
          <div className="shrink-0 rounded-xl bg-white shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return
                commitValue(dayjs(date).format('YYYY-MM-DD'))
                setOpen(false)
              }}
              className="rounded-xl bg-transparent"
              captionLayout="dropdown"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
