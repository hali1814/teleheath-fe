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
import { useGetListScheduleByRoomQuery } from '#/services/query/schedule/list-schedule-by-room'
import { useTranslation } from 'react-i18next'
import PullToRefresh from '#/components/PullToRefresh'

const emptySchedules: ListScheduleByBranchResponse = {
  morning: [],
  afternoon: [],
}

export function ScheduleStep() {
  const { t } = useTranslation(['book-appointment'])
  const {
    bookingType,
    branch,
    room,
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

  const {
    data: { data: schedulesBranch } = { data: emptySchedules },
    refetch: refetchBranch,
  } = useGetListScheduleByRoomQuery({
    params: {
      roomId: room?.id ?? 0,
      doctorId: doctor?.doctorId ?? 0,
      date: dateParam,
    },
    enabled: !!room?.id && !!dateParam && bookingType === 'HOSPITAL',
    placeholderData: keepPreviousData,
    staleTime: 0,
  })

  const {
    data: { data: schedulesDoctor } = { data: emptySchedules },
    refetch: refetchDoctor,
  } = useGetListScheduleByDoctorQuery({
    params: {
      doctorId: doctor?.doctorId ?? 0,
      date: dateParam,
      branchId: branch?.branchId ?? 0,
    },
    enabled: !!doctor?.doctorId && !!dateParam && bookingType === 'DOCTOR',
    placeholderData: keepPreviousData,
    staleTime: 0,
  })

  const {
    data: { data: schedulesPackage } = { data: emptySchedules },
    refetch: refetchPackage,
  } = useGetListScheduleByPackageQuery({
    params: {
      packageId: packageData?.packageId ?? 0,
      date: dateParam,
      branchId: branch?.branchId ?? 0,
    },
    enabled:
      !!packageData?.packageId && !!dateParam && bookingType === 'PACKAGE',
    placeholderData: keepPreviousData,
    staleTime: 0,
  })

  const schedules =
    bookingType === 'HOSPITAL'
      ? schedulesBranch
      : bookingType === 'DOCTOR'
        ? schedulesDoctor
        : schedulesPackage

  const selectedDateLabel =
    appointmentDate != null
      ? formatDate(appointmentDate, DATE_TIME_TYPE.DDDD_MMM_D_YYYY)
      : '—'

  const slotTimesMorning = useMemo(() => {
    return (
      schedules?.morning.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: item.doctors?.[0],
        status: item.status,
      })) ?? []
    )
  }, [schedules])

  const slotTimesAfternoon = useMemo(() => {
    return (
      schedules?.afternoon.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        doctor: item.doctors?.[0],
        status: item.status,
      })) ?? []
    )
  }, [schedules])

  const isEmptySchedule = checkEmptySchedule(schedules)

  const handleRefresh = async () => {
    switch (bookingType) {
      case 'HOSPITAL':
        await refetchBranch()
        break
      case 'DOCTOR':
        await refetchDoctor()
        break
      case 'PACKAGE':
        await refetchPackage()
        break
    }
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col gap-[16px] px-[16px]">
        <Text
          size="lg_16"
          className="font-semibold leading-[1.2] text-[#333333]"
        >
          {t('schedule.selectDate')}
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
            {t('schedule.availableTimeSlots')}
          </Text>
          {!isEmptySchedule && (
            <Text size="sm_12" className="leading-[1.3] text-[#999999]">
              {t('schedule.chooseTimePrefix')}{' '}
              <span className="font-bold">{selectedDateLabel}</span>
            </Text>
          )}
        </div>
        {!isEmptySchedule ? (
          <>
            {schedules?.morning.length > 0 && (
              <SlotTimeList
                title={t('schedule.morningSessions')}
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
                title={t('schedule.afternoonSessions')}
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
              {t('schedule.noSlotsThisDate')}
            </Text>
          </EmptyState>
        )}
      </div>
    </PullToRefresh>
  )
}
