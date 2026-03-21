import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import EmptyAppointment from '#/sections/appointment/EmptyAppointment'
import ItemAppointment, {
  type AppointmentItemType,
} from '#/sections/appointment/ItemAppointment'
import Text from '#/components/text'

export const Route = createFileRoute('/app/appointments/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  if (false) {
    return <EmptyAppointment />
  }

  const mockSections: {
    title: string
    data: Array<{
      id: string
      type: AppointmentItemType
      doctorName: string
      timeLabel: string
      dateLabel?: string
    }>
  }[] = [
    {
      title: 'Today, 16 Nov',
      data: [
        {
          id: 'today-1',
          type: 'video_join',
          doctorName: 'Dr. Nguyen Duc Anh',
          timeLabel: '10:00 - 10:30 AM',
        },
        {
          id: 'today-2',
          type: 'video_cancel',
          doctorName: 'Dr. Hoan Ngo Huy',
          timeLabel: '14:00 - 14:30 AM',
        },
      ],
    },
    {
      title: 'Tomorrow, 17 Nov',
      data: [
        {
          id: 'tomorrow-1',
          type: 'in_person_directions_disabled',
          doctorName: 'Tam Anh hospital',
          dateLabel: '08:00',
          timeLabel: '08:30 AM',
        },
      ],
    },
    {
      title: 'This Week',
      data: [
        {
          id: 'week-1',
          type: 'in_person_cancel',
          doctorName: 'Dr. Dinh Vinh Quang',
          dateLabel: 'Wed, 18 Nov',
          timeLabel: '07:00 - 07:30 AM',
        },
      ],
    },
    {
      title: 'Next Week',
      data: [
        {
          id: 'next-1',
          type: 'video_cancel',
          doctorName: 'Dr. Nguyen Lan',
          dateLabel: 'Wed, 25 Nov',
          timeLabel: '09:00 - 09:30 AM',
        },
      ],
    },
    {
      title: 'Later',
      data: [
        {
          id: 'later-1',
          type: 'video_join_disabled',
          doctorName: 'Dr. Nguyen Lan',
          dateLabel: 'Thu, 02 Dec',
          timeLabel: '09:00 - 09:30 AM',
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
                <ItemAppointment
                  type={row.item.type}
                  doctorName={row.item.doctorName}
                  dateLabel={row.item.dateLabel}
                  timeLabel={row.item.timeLabel}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
