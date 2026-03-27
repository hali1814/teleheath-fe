import Text from '#/components/text'
import { DATE_TIME_TYPE, formatDate } from '#/utils/date.util'
import { CalendarSchedule } from '../CalendarSchedule'
import { useBookingStore } from '#/stores/booking-store'
import { SlotTimeList } from '../SlotTimeList'
import { keepPreviousData } from '@tanstack/react-query'
import { useMemo } from 'react'
import { checkEmptySchedule } from '#/utils/schedule.util'
import { EmptyState } from '#/sections/search'
import {
  useGetListScheduleByDoctorQuery,
  type ListScheduleByDoctorResponse,
} from '#/services/query/schedule/list-schedule-by-doctor'

const emptySchedules: ListScheduleByDoctorResponse = {
  morning: [],
  afternoon: [],
}

export function ScheduleStepByDoctor() {
  const { doctor, appointmentDate, startTime, endTime, setData, branch } =
    useBookingStore()

  const dateParam =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.YYYY_MM_DD)
      : undefined

  const { data: { data: schedules } = { data: emptySchedules } } =
    useGetListScheduleByDoctorQuery({
      params: {
        doctorId: doctor?.doctorId ?? '',
        date: dateParam,
        branchId: branch?.branchId ?? '',
      },
      enabled: !!doctor?.doctorId && !!dateParam,
      placeholderData: keepPreviousData,
    })

  const selectedDateLabel =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.DD_MM_YYYY)
      : '—'

  const slotTimesMorning = useMemo(() => {
    return (
      schedules?.morning.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: {
          doctorId: item.doctorId,
          nameEn: item.doctorName,
          consultationFee: item.price,
          avatarUrl: item.doctorAvatarUrl,
        },
        status: item.status,
      })) ?? []
    )
  }, [schedules])

  const slotTimesAfternoon = useMemo(() => {
    return (
      schedules?.afternoon.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: {
          doctorId: item.doctorId,
          nameEn: item.doctorName,
          consultationFee: item.price,
          avatarUrl: item.doctorAvatarUrl,
        },
        status: item.status,
      })) ?? []
    )
  }, [schedules])

  const isEmptySchedule = checkEmptySchedule(schedules)

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
        {!isEmptySchedule && (
          <Text size="sm_12" className="leading-[1.3] text-[#999999]">
            Choose a time that works for you on{' '}
            <span className="font-bold">{selectedDateLabel}</span>
          </Text>
        )}
      </div>
      {!isEmptySchedule ? (
        <>
          <SlotTimeList
            title="Morning sessions"
            slotTimes={slotTimesMorning}
            selectedSlot={{
              startTime: startTime ?? '',
              endTime: endTime ?? '',
              doctor: doctor ?? {
                doctorId: '',
                nameEn: '',
                consultationFee: 0,
                avatarUrl: '',
              },
              status: 'AVAILABLE',
            }}
            setSelectedSlot={(slot) =>
              setData({
                startTime: slot?.startTime ?? '',
                endTime: slot?.endTime ?? '',
                doctor: slot?.doctor ?? {
                  doctorId: '',
                  nameEn: '',
                  consultationFee: 0,
                  avatarUrl: '',
                },
              })
            }
          />
          <SlotTimeList
            title="Afternoon sessions"
            slotTimes={slotTimesAfternoon}
            selectedSlot={{
              startTime: startTime ?? '',
              endTime: endTime ?? '',
              doctor: doctor ?? {
                doctorId: '',
                nameEn: '',
                consultationFee: 0,
                avatarUrl: '',
                specialties: [],
              },
              status: 'AVAILABLE',
            }}
            setSelectedSlot={(slot) =>
              setData({
                startTime: slot?.startTime ?? '',
                endTime: slot?.endTime ?? '',
                doctor: slot?.doctor ?? {
                  doctorId: '',
                  nameEn: '',
                  consultationFee: 0,
                  avatarUrl: '',
                  specialties: [],
                },
              })
            }
          />
        </>
      ) : (
        <EmptyState className="h-auto max-w-[300px] mx-auto">
          <Text className="text-center leading-normal text-muted-foreground">
            No appointments available on this date. Please choose another date.
          </Text>
        </EmptyState>
      )}
    </div>
  )
}
