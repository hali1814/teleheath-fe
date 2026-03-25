import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import Text from '#/components/text'
import ItemHistoryAppointment from '#/sections/history/ItemHistoryAppointment'
import { useTranslation } from 'react-i18next'
import { useGetMyAppointmentsQuery } from '#/services/query/appointment/my-appointments'
import { groupAppointmentsByMonth } from '#/utils/history'

export const Route = createFileRoute('/app/history/')({
  component: RouteComponent,
})

function RouteComponent() {
  const parentRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation(['common'])
  const title = t('bottomNavigation.history')

  const { data: appointments } = useGetMyAppointmentsQuery({
    params: {},
  })

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByMonth(appointments?.data ?? [])
  }, [appointments?.data])

  const rows = useMemo(() => {
    return Object.entries(groupedAppointments).flatMap(([key, value]) => {
      console.log(key, value)
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
    estimateSize: (index) => (rows[index]?.kind === 'title' ? 30 : 110),
    overscan: 6,
  })

  return (
    <div>
      <header className="sticky top-0 z-50 h-[62px] px-[16px] py-[20px] border-b-[0.5px] border-[#FFE8E6] bg-background">
        <div className="flex h-full items-center justify-center">
          <Text size="lg_16" className="font-medium text-text-primary">
            {title}
          </Text>
        </div>
      </header>
      <div ref={parentRef} className="mt-4 px-4 pb-4">
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
                  <Text
                    size="base_14"
                    className="mb-3 text-[14px] font-medium uppercase leading-none tracking-[0.03em] text-[#64748B]"
                  >
                    {row.title}
                  </Text>
                ) : (
                  <div className="mb-3">
                    <ItemHistoryAppointment item={row.item} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
