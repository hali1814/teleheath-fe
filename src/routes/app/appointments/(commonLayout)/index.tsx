import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import EmptyAppointment from '#/sections/appointment/EmptyAppointment'
import ItemAppointment from '#/sections/appointment/ItemAppointment'
import Text from '#/components/text'
import { useGetMyAppointmentsQuery } from '#/services/query/appointment/my-appointments'
import LoadingBlocking from '#/components/LoadingBlocking'
import { groupAppointmentsByUpcomingWindow } from '#/utils'
import dayjs from 'dayjs'

export const Route = createFileRoute('/app/appointments/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const parentRef = useRef<HTMLDivElement>(null)

  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetMyAppointmentsQuery({
      params: {
        status: 'CONFIRMED',
        page: 0,
        size: 1805,
        fromDate: dayjs().format('YYYY-MM-DD'),
        sortDir: 'DESC',
      },
      staleTime: 0,
    })

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByUpcomingWindow(appointments?.data?.content ?? [])
  }, [appointments?.data])

  const rows = useMemo(() => {
    return Object.entries(groupedAppointments).flatMap(([key, value]) => {
      if (value.length === 0) return []
      return [
        {
          kind: 'title' as const,
          id: `title-${key}`,
          title: key,
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
    // Title: lg_16 + pb-3 (12) on row wrapper. Item: card ~72px avatar + p-4 + text + 36px button + pb-3; 150 was too low → layout jump before measureElement.
    estimateSize: (index) => (rows[index]?.kind === 'title' ? 52 : 210),
    overscan: 8,
  })

  if (isLoadingAppointments) {
    return (
      <div className="relative mt-4 min-h-[min(320px,calc(100dvh-200px))]">
        <LoadingBlocking isLoading />
      </div>
    )
  }

  /*
   * Empty khi không còn hàng sau khi group: API có thể trả cuộc hẹn nhưng toàn quá khứ
   * (groupAppointmentsByUpcomingWindow chỉ giữ từ hôm nay) → rows rỗng, không được coi là "có data".
   */
  if (rows.length === 0) {
    return <EmptyAppointment variant="upcoming" />
  }

  return (
    <div
      ref={parentRef}
      className="mt-4 max-h-[calc(100dvh-200px)] overflow-y-auto px-4 pb-4"
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
                <Text size="lg_16" className="font-semibold">
                  {row.title}
                </Text>
              ) : (
                <ItemAppointment appointment={row.item} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
