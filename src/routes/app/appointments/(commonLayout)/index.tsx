import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import EmptyAppointment from '#/sections/appointment/EmptyAppointment'
import ItemAppointment from '#/sections/appointment/ItemAppointment'
import Text from '#/components/text'
import { useGetMyAppointmentsQuery } from '#/services/query/appointment/my-appointments'
import LoadingBlocking from '#/components/LoadingBlocking'
import { groupAppointmentsByUpcomingWindow } from '#/utils'

export const Route = createFileRoute('/app/appointments/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const parentRef = useRef<HTMLDivElement>(null)

  const { data: appointments, isLoading: isLoadingAppointments } =
    useGetMyAppointmentsQuery({
      params: {
        status: 'CONFIRMED',
      },
    })

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByUpcomingWindow(appointments?.data?.content ?? [])
  }, [appointments?.data])

  if (Object.keys(groupedAppointments).length === 0) {
    return <EmptyAppointment />
  }

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
    estimateSize: (index) => (rows[index]?.kind === 'title' ? 36 : 162),
    overscan: 6,
  })

  return (
    <div ref={parentRef} className="px-4 pb-4 mt-4">
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index]

          return (
            <div
              key={row.id}
              className="absolute left-0 top-0 w-full"
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
      <LoadingBlocking isLoading={isLoadingAppointments} />
    </div>
  )
}
