import Text from '#/components/text'
import { DATE_TIME_TYPE, formatDate } from '#/utils/date.util'
import { CalendarSchedule } from '../CalendarSchedule'
import { useBookingStore } from '#/stores/booking-store'
import { SlotTimeList } from '../SlotTimeList'
import type { ListScheduleByBranchResponse } from '#/services/query/schedule/list-schedule-by-branch'
import { useGetListScheduleByBranchQuery } from '#/services/query/schedule/list-schedule-by-branch'
import { keepPreviousData } from '@tanstack/react-query'
import { useLayoutEffect, useMemo } from 'react'
import { checkEmptySchedule } from '#/utils/schedule.util'
import { EmptyState } from '#/sections/search'
import { useGetListScheduleByDoctorQuery } from '#/services/query/schedule/list-schedule-by-doctor'
import { useGetListScheduleByPackageQuery } from '#/services/query/schedule/list-schedule-by-package'
import { startOfToday } from 'date-fns'

const emptySchedules: ListScheduleByBranchResponse = {
  morning: [],
  afternoon: [],
}

export function ScheduleStep() {
  const {
    bookingType,
    branch,
    specialty,
    doctor,
    appointmentDate,
    startTime,
    endTime,
    setData,
    packageData,
  } = useBookingStore()

  useLayoutEffect(() => {
    if (appointmentDate != null) return
    setData({
      appointmentDate: startOfToday(),
      startTime: '',
      endTime: '',
    })
  }, [appointmentDate, setData])

  const dateParam =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.YYYY_MM_DD)
      : undefined

  const { data: { data: schedulesBranch } = { data: emptySchedules } } =
    useGetListScheduleByBranchQuery({
      params: {
        branchId: branch?.branchId ?? '',
        specialtyId: specialty?.id ?? 1,
        date: dateParam,
      },
      enabled: !!branch?.branchId && !!dateParam && bookingType === 'HOSPITAL',
      placeholderData: keepPreviousData,
    })

  const { data: { data: schedulesDoctor } = { data: emptySchedules } } =
    useGetListScheduleByDoctorQuery({
      params: {
        doctorId: doctor?.doctorId ?? '',
        date: dateParam,
        branchId: branch?.branchId ?? '',
      },
      enabled: !!doctor?.doctorId && !!dateParam && bookingType === 'DOCTOR',
      placeholderData: keepPreviousData,
    })

  const { data: { data: schedulesPackage } = { data: emptySchedules } } =
    useGetListScheduleByPackageQuery({
      params: {
        packageId: packageData?.id ?? 0,
        date: dateParam,
      },
      enabled: !!packageData?.id && !!dateParam && bookingType === 'PACKAGE',
      placeholderData: keepPreviousData,
    })

  const schedules =
    bookingType === 'HOSPITAL'
      ? schedulesBranch
      : bookingType === 'DOCTOR'
        ? schedulesDoctor
        : schedulesPackage

  const selectedDateLabel =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.DD_MM_YYYY)
      : '—'

  const slotTimesMorning = useMemo(() => {
    return (
      schedules?.morning.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: item.doctors[0],
        status: item.status,
      })) ?? []
    )
  }, [schedules])

  const slotTimesAfternoon = useMemo(() => {
    return (
      schedules?.afternoon.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: item.doctors[0],
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
        onSelect={(date) =>
          setData({ appointmentDate: date, startTime: '', endTime: '' })
        }
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
          {schedules?.morning.length > 0 && (
            <SlotTimeList
              title="Morning sessions"
              slotTimes={slotTimesMorning}
              selectedSlot={{
                startTime: startTime ?? '',
                endTime: endTime ?? '',
                doctor: doctor ?? {
                  doctorId: '',
                  nameEn: '',
                  nameVi: '',
                  nameKh: '',
                },
                status: 'AVAILABLE',
              }}
              setSelectedSlot={(slot) =>
                setData({
                  startTime: slot?.startTime ?? '',
                  endTime: slot?.endTime ?? '',
                  doctor: {
                    ...doctor,
                    ...slot?.doctor,
                  },
                })
              }
            />
          )}
          {schedules?.afternoon.length > 0 && (
            <SlotTimeList
              title="Afternoon sessions"
              slotTimes={slotTimesAfternoon}
              selectedSlot={{
                startTime: startTime ?? '',
                endTime: endTime ?? '',
                doctor: doctor ?? {
                  doctorId: '',
                  nameEn: '',
                  nameVi: '',
                  nameKh: '',
                },
                status: 'AVAILABLE',
              }}
              setSelectedSlot={(slot) =>
                setData({
                  startTime: slot?.startTime ?? '',
                  endTime: slot?.endTime ?? '',
                  doctor: {
                    ...doctor,
                    ...slot?.doctor,
                  },
                })
              }
            />
          )}
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
