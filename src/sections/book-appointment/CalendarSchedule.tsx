'use client'

import { useEffect, useState } from 'react'
import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'

export interface CalendarScheduleProps {
  /** Ngày đang chọn (controlled) */
  selected?: Date | null
  onSelect: (date: Date) => void
  /** Tháng hiển thị ban đầu khi chưa có `selected` */
  defaultMonth?: Date
  /** Không cho chọn các ngày trước hôm nay */
  disablePastDates?: boolean
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function CalendarSchedule({
  selected = null,
  onSelect,
  defaultMonth,
  disablePastDates = false,
}: CalendarScheduleProps) {
  const [currentDate, setCurrentDate] = useState(
    () => defaultMonth ?? selected ?? new Date(),
  )

  const selectedDayKey = selected ? startOfDay(selected).getTime() : null

  useEffect(() => {
    if (selectedDayKey == null) return
    const d = new Date(selectedDayKey)
    setCurrentDate((prev) => {
      if (
        prev.getFullYear() === d.getFullYear() &&
        prev.getMonth() === d.getMonth()
      ) {
        return prev
      }
      return new Date(d.getFullYear(), d.getMonth(), 1)
    })
  }, [selectedDayKey])

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const today = startOfDay(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    )
  }

  const handleDateClick = (day: number) => {
    const next = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    )
    onSelect(next)
  }

  const isDateDisabled = (day: number): boolean => {
    if (!disablePastDates) return false
    const date = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    )
    return date < today
  }

  const isToday = (day: number): boolean => {
    const date = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    )
    return date.getTime() === today.getTime()
  }

  const isSelected = (day: number): boolean => {
    if (!selected) return false
    const date = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    )
    return date.getTime() === startOfDay(selected).getTime()
  }

  /** Không cho lùi về tháng trước tháng hiện tại (khi chặn ngày quá khứ) */
  const disablePreviousMonth =
    disablePastDates &&
    (currentDate.getFullYear() < today.getFullYear() ||
      (currentDate.getFullYear() === today.getFullYear() &&
        currentDate.getMonth() <= today.getMonth()))

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-[15px] bg-white rounded-[10px] p-[10px]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={previousMonth}
            disabled={disablePreviousMonth}
            className={`p-1 rounded transition-colors ${
              disablePreviousMonth ? 'cursor-not-allowed opacity-30' : ''
            }`}
            aria-label="Previous month"
            aria-disabled={disablePreviousMonth}
          >
            <Icon
              name="polygon"
              className="w-[8px] h-[16px] text-primary rotate-180"
            />
          </button>

          <Text
            size="lg_16"
            className="font-medium leading-normal text-[#333333]"
          >
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>

          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded transition-colors"
            aria-label="Next month"
          >
            <Icon name="polygon" className="w-[8px] h-[16px] text-primary" />
          </button>
        </div>

        <div className="w-full">
          <div className="grid w-full grid-cols-7 gap-[10px] mb-[10px]">
            {dayNames.map((day, index) => (
              <div key={`${day}-${index}`} className="text-center">
                <Text size="sm_12" className="font-normal text-[#8e102e]">
                  {day}
                </Text>
              </div>
            ))}
          </div>

          <div className="grid w-full grid-cols-7 gap-[10px] py-[10px]">
            {days.map((day, index) => (
              <div
                key={index}
                className="aspect-square w-full min-w-0 flex items-center justify-center"
              >
                {day ? (
                  <button
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isDateDisabled(day)}
                    className={[
                      'relative flex h-full w-full max-h-full max-w-full items-center justify-center rounded-full text-sm font-medium transition-all',
                      isSelected(day)
                        ? 'bg-primary'
                        : isDateDisabled(day)
                          ? 'cursor-not-allowed'
                          : '',
                    ].join(' ')}
                  >
                    <Text
                      size="sm_12"
                      className={cn(
                        'font-normal leading-normal',
                        isSelected(day)
                          ? 'text-white'
                          : isDateDisabled(day)
                            ? 'text-[#CCCCCC]'
                            : 'text-[#666666]',
                      )}
                    >
                      {day}
                    </Text>
                    {isToday(day) && (
                      <span
                        className={[
                          'pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full',
                          isSelected(day) ? 'bg-white' : 'bg-primary',
                        ].join(' ')}
                        aria-hidden
                      />
                    )}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarSchedule
