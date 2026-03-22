import Text from '#/components/text'
import { CalendarSchedule } from '../CalendarSchedule'
import { useBookingStore } from '#/stores/booking-store'
import { SlotTimeList } from '../SlotTimeList'

export function ScheduleStep() {
  const { schedules, appointmentDate, setData } = useBookingStore()

  return (
    <div className="flex flex-col gap-[16px]">
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
          <span className="font-bold">Tuesday, Nov 16, 2025</span>
        </Text>
      </div>
      <SlotTimeList
        title="Morning sessions"
        selectedTimes={schedules ?? []}
        setSelectedTimes={(times) => setData({ schedules: times })}
      />
      <SlotTimeList
        title="Afternoon sessions"
        selectedTimes={schedules ?? []}
        setSelectedTimes={(times) => setData({ schedules: times })}
      />
    </div>
  )
}
