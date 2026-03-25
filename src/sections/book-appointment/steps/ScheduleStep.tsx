import Text from '#/components/text'
import { DATE_TIME_TYPE, formatDate } from '#/utils/date.util'
import { CalendarSchedule } from '../CalendarSchedule'
import { useBookingStore } from '#/stores/booking-store'
import { SlotTimeList } from '../SlotTimeList'
import type { ListScheduleByBranchResponse } from '#/services/query/schedule/list-schedule-by-branch'
import { useGetListScheduleByBranchQuery } from '#/services/query/schedule/list-schedule-by-branch'
import { keepPreviousData } from '@tanstack/react-query'

const emptySchedules: ListScheduleByBranchResponse = {
  morning: [],
  afternoon: [],
}

export function ScheduleStep() {
  const { branch, specialty, appointmentDate, startTime, endTime, setData } =
    useBookingStore()

  const dateParam =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.YYYY_MM_DD)
      : undefined

  const { data: { data: schedules } = { data: emptySchedules } } =
    useGetListScheduleByBranchQuery({
      params: {
        branchId: branch?.branchId ?? '',
        specialtyId: specialty?.id ?? 1,
        date: dateParam,
      },
      enabled: !!branch?.branchId && !!dateParam,
      placeholderData: keepPreviousData,
    })

  const selectedDateLabel =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.DD_MM_YYYY)
      : '—'

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Date
      </Text>
      <CalendarSchedule
        selected={appointmentDate ?? null}
        onSelect={(date) => setData({ appointmentDate: date })}
        disablePastDates
      />
      <div className="flex flex-col gap-[10px]">
        <Text
          size="lg_16"
          className="font-semibold leading-[1.2] text-[#333333]"
        >
          Available Time Slots
        </Text>
        <Text size="sm_12" className="leading-[1.3] text-[#999999]">
          Choose a time that works for you on{' '}
          <span className="font-bold">{selectedDateLabel}</span>
        </Text>
      </div>
      <SlotTimeList
        title="Morning sessions"
        slotTimes={schedules?.morning ?? []}
        selectedTime={{
          startTime: startTime ?? null,
          endTime: endTime ?? null,
        }}
        setSelectedTime={(time) =>
          setData({
            startTime: time.startTime ?? undefined,
            endTime: time.endTime ?? undefined,
          })
        }
      />
      <SlotTimeList
        title="Afternoon sessions"
        slotTimes={schedules?.afternoon ?? []}
        selectedTime={{
          startTime: startTime ?? null,
          endTime: endTime ?? null,
        }}
        setSelectedTime={(time) =>
          setData({
            startTime: time.startTime ?? undefined,
            endTime: time.endTime ?? undefined,
          })
        }
      />
    </div>
  )
}
