import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

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
  msgError,
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
  /** Tháng đang xem trên lịch (controlled) — khi có value thì mở đúng tháng đó, không reset về tháng hiện tại. */
  const [calendarMonth, setCalendarMonth] = useState<Date>(() =>
    dayjs().startOf('month').toDate(),
  )

  const currentValue = isControlled ? (value ?? '') : internalValue

  const selectedDate = useMemo(() => {
    if (!currentValue) return undefined
    const parsed = dayjs(currentValue, ['YYYY-MM-DD', 'DD-MM-YYYY'], true)
    return parsed.isValid() ? parsed.toDate() : undefined
  }, [currentValue])

  useEffect(() => {
    if (!open) return
    setCalendarMonth(
      selectedDate
        ? dayjs(selectedDate).startOf('month').toDate()
        : dayjs().startOf('month').toDate(),
    )
  }, [open, selectedDate])

  const displayValue = useMemo(() => {
    if (!selectedDate) return ''
    return dayjs(selectedDate).format('DD-MM-YYYY')
  }, [selectedDate])
  const startMonth = useMemo(
    () => dayjs().subtract(120, 'year').startOf('year').toDate(),
    [],
  )
  const endMonth = useMemo(() => dayjs().endOf('month').toDate(), [])

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
        <InputGroup className={cn("h-[45px] bg-white border", !!msgError ? 'border-red-600' : 'border-dust-red-1')}>
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

      {!!msgError && (
        <Text size="sm_12" className="text-red-600">
          {msgError}
        </Text>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className={cn(
            'flex w-fit max-w-[calc(100vw-32px)] flex-col border-0 bg-transparent p-0 shadow-none',
            'max-h-[92dvh] overflow-x-hidden overflow-y-auto',
          )}
        >
          <DialogTitle className="sr-only">Select date</DialogTitle>
          <DialogDescription className="sr-only">Select date</DialogDescription>
          <div className="w-full min-h-[340px] shrink-0 rounded-xl bg-white shadow-sm">
            <Calendar
              mode="single"
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              startMonth={startMonth}
              endMonth={endMonth}
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
