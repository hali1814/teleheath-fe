import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import Text from '#/components/text'
import ItemHistoryAppointment, {
  type HistoryAppointmentStatus,
  type HistoryEntityKind,
  type HistoryVisitType,
} from '#/sections/history/ItemHistoryAppointment'

export const Route = createFileRoute('/app/history/')({
  component: RouteComponent,
})

type HistoryRowItem = {
  id: string
  visitType: HistoryVisitType
  entityKind: HistoryEntityKind
  name: string
  scheduleLabel: string
  status: HistoryAppointmentStatus
  avatarClassName?: string
}

function RouteComponent() {
  const mockSections: { title: string; data: HistoryRowItem[] }[] = [
    {
      title: 'THIS MONTH',
      data: [
        {
          id: 'm-1',
          visitType: 'video',
          entityKind: 'doctor',
          name: 'Dr. Nguyen Duc Anh',
          scheduleLabel: 'Wed, 16 Nov • 06:30 - 07:00 AM',
          status: 'confirmed',
          avatarClassName: 'bg-[#53B6B5]',
        },
        {
          id: 'm-2',
          visitType: 'video',
          entityKind: 'doctor',
          name: 'Dr. Hoan Ngoc Huy',
          scheduleLabel: 'Fri, 12 Nov • 14:00 - 14:30 AM',
          status: 'cancelled',
          avatarClassName: 'bg-[#8B5CF6]',
        },
        {
          id: 'm-3',
          visitType: 'in_person',
          entityKind: 'hospital',
          name: 'Tam Anh Hospital',
          scheduleLabel: 'Wed, 10 Nov • 16:00 - 16:30 AM',
          status: 'completed',
        },
      ],
    },
    {
      title: 'OCTOBER 2025',
      data: [
        {
          id: 'o-1',
          visitType: 'in_person',
          entityKind: 'doctor',
          name: 'Dr. Dinh Vinh Quang',
          scheduleLabel: 'Fri, 22 Oct • 07:00 - 07:30 AM',
          status: 'no_show',
          avatarClassName: 'bg-[#0D9488]',
        },
        {
          id: 'o-2',
          visitType: 'video',
          entityKind: 'doctor',
          name: 'Dr. Hoan Ngoc Huy',
          scheduleLabel: 'Mon, 18 Oct • 07:00 - 07:30 AM',
          status: 'completed',
          avatarClassName: 'bg-[#53B6B5]',
        },
      ],
    },
  ]

  const rows = useMemo(() => {
    return mockSections.flatMap((section) => {
      return [
        {
          kind: 'title' as const,
          id: `title-${section.title}`,
          title: section.title,
        },
        ...section.data.map((item) => ({
          kind: 'item' as const,
          id: item.id,
          item,
        })),
      ]
    })
  }, [mockSections])

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (rows[index]?.kind === 'title' ? 30 : 110),
    overscan: 6,
  })

  return (
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
                  <ItemHistoryAppointment
                    visitType={row.item.visitType}
                    entityKind={row.item.entityKind}
                    name={row.item.name}
                    scheduleLabel={row.item.scheduleLabel}
                    status={row.item.status}
                    avatarClassName={row.item.avatarClassName}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
