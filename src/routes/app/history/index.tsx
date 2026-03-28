import { createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useTranslation } from 'react-i18next'

import { Icon } from '#/components/icon'
import Text from '#/components/text'
import LoadingBlocking from '#/components/LoadingBlocking'
import EmptyAppointment from '#/sections/appointment/EmptyAppointment'
import ItemHistoryAppointment from '#/sections/history/ItemHistoryAppointment'
import ModalHistoryFilter, {
  emptyHistoryAppointmentFilter,
  type HistoryAppointmentFilter,
} from '#/sections/history/ModalHistoryFilter'
import { useGetMyAppointmentsQuery } from '#/services/query/appointment/my-appointments'
import type {
  AppointmentStatus,
  MyAppointmentItem,
} from '#/services/query/appointment/my-appointments'
import { cn } from '#/lib/utils'
import { groupAppointmentsByMonth } from '#/utils/history'

export const Route = createFileRoute('/app/history/')({
  component: RouteComponent,
})

function filterHistoryAppointments(
  items: MyAppointmentItem[],
  f: HistoryAppointmentFilter,
) {
  return items.filter((item) => {
    if (f.statuses.length > 0) {
      const st = String(item.status) as AppointmentStatus
      if (!f.statuses.includes(st)) return false
    }
    if (f.dateFrom) {
      if (dayjs(item.appointmentDate).isBefore(dayjs(f.dateFrom), 'day')) {
        return false
      }
    }
    if (f.dateTo) {
      if (dayjs(item.appointmentDate).isAfter(dayjs(f.dateTo), 'day')) {
        return false
      }
    }
    return true
  })
}

function isGroupCurrentCalendarMonth(items: MyAppointmentItem[]) {
  if (items.length === 0) return false
  return dayjs(items[0].appointmentDate).isSame(dayjs(), 'month')
}

function RouteComponent() {
  const parentRef = useRef<HTMLDivElement>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [appliedFilter, setAppliedFilter] = useState<HistoryAppointmentFilter>(
    emptyHistoryAppointmentFilter,
  )
  const [draftFilter, setDraftFilter] = useState<HistoryAppointmentFilter>(
    emptyHistoryAppointmentFilter,
  )

  const { t } = useTranslation(['common', 'appointment'])
  const title = t('bottomNavigation.history')

  const { data: appointments, isLoading } = useGetMyAppointmentsQuery({
    params: {
      page: 0,
      size: 1805,
    },
  })

  const filteredItems = useMemo(
    () =>
      filterHistoryAppointments(
        appointments?.data?.content ?? [],
        appliedFilter,
      ),
    [appointments?.data?.content, appliedFilter],
  )

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByMonth(filteredItems)
  }, [filteredItems])

  const rows = useMemo(() => {
    return Object.entries(groupedAppointments).flatMap(([key, value]) => {
      if (value.length === 0) return []
      return [
        {
          kind: 'title' as const,
          id: `title-${key}`,
          title: key,
          isCurrentMonth: isGroupCurrentCalendarMonth(value),
        },
        ...value.map((item) => ({
          kind: 'item' as const,
          id: item.id,
          item,
        })),
      ]
    })
  }, [groupedAppointments])

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (rows[index]?.kind === 'title' ? 44 : 140),
    overscan: 6,
  })

  const activeFilterCount = useMemo(() => {
    return (
      appliedFilter.statuses.length +
      (appliedFilter.dateFrom ? 1 : 0) +
      (appliedFilter.dateTo ? 1 : 0)
    )
  }, [appliedFilter])

  const openFilterModal = () => {
    setDraftFilter(appliedFilter)
    setFilterOpen(true)
  }

  const handleApplyFilters = () => {
    setAppliedFilter(draftFilter)
    setFilterOpen(false)
  }

  const showEmpty = !isLoading && rows.length === 0

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      <header className="sticky top-0 z-50 grid h-[62px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b-[0.5px] border-[#FFE8E6] bg-background px-4 py-5">
        <div />
        <Text size="lg_16" className="font-medium text-text-primary">
          {title}
        </Text>
        <div className="flex justify-end">
          <button
            type="button"
            className="relative flex size-9 items-center justify-center rounded-md"
            onClick={openFilterModal}
            aria-label={t('appointment:filter')}
          >
            <Icon name="filter" className="size-5 text-text-primary" />
            <span className="absolute top-0 left-[14px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#DB1A21] px-0.5 text-[10px] font-semibold leading-none text-white">
              {activeFilterCount}
            </span>
          </button>
        </div>
      </header>

      {showEmpty ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <EmptyAppointment />
        </div>
      ) : (
        <div
          ref={parentRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4"
        >
          <div
            className="relative w-full"
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index]

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="absolute left-0 top-0 w-full pb-3"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  {row.kind === 'title' ? (
                    <div className="flex items-center gap-2">
                      <Text
                        size="base_14"
                        className={cn(
                          'text-[14px] font-medium uppercase leading-none tracking-[0.03em]',
                          row.isCurrentMonth
                            ? 'text-[#A8071A]'
                            : 'text-[#64748B]',
                        )}
                      >
                        {row.title}
                      </Text>
                      {row.isCurrentMonth ? (
                        <span
                          className="size-[6px] shrink-0 rounded-full bg-[#A8071A]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  ) : (
                    <ItemHistoryAppointment item={row.item} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <ModalHistoryFilter
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filter={draftFilter}
        onFilterChange={setDraftFilter}
        onApply={handleApplyFilters}
      />
      <LoadingBlocking isLoading={isLoading} />
    </div>
  )
}
