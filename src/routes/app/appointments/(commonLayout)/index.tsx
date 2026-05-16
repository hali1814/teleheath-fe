import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import EmptyAppointment from '#/sections/appointment/EmptyAppointment'
import ItemAppointment from '#/sections/appointment/ItemAppointment'
import Text from '#/components/text'
import { useGetMyAppointmentsInfiniteQuery } from '#/services/query/appointment/my-appointments'
import { useInfiniteScroll } from '#/hooks/use-infinite-scroll'
import { getUpcomingAppointmentLabels, groupAppointmentsByUpcomingWindow } from '#/utils'
import dayjs from 'dayjs'
import LoadingState from '#/components/LoadingState'
import { useProfileStore } from '#/stores/profile'
import RequireLogin from '#/components/RequireLogin'
import PullToRefresh from '#/components/PullToRefresh'
import { Header } from '#/sections/home'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/appointments/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n } = useTranslation(['appointment'])
  const title = t('title')
  const parentRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const { profile } = useProfileStore()
  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyAppointmentsInfiniteQuery({
    params: {
      status: 'CONFIRMED',
      size: 10,
      fromDate: dayjs().format('YYYY-MM-DD'),
      sortDir: 'DESC',
    },
    staleTime: 0,
    enabled: !!profile?.id,
  })

  const handleRefresh = async () => {
    await refetch()
  }

  const appointmentItems = useMemo(
    () =>
      appointmentsData?.pages.flatMap((page) => page?.data?.content ?? []) ?? [],
    [appointmentsData?.pages],
  )

  const groupedAppointments = useMemo(() => {
    return groupAppointmentsByUpcomingWindow(appointmentItems, {
      labels: getUpcomingAppointmentLabels(t as unknown as (key: string) => string),
      language: i18n.language,
    })
  }, [appointmentItems, i18n.language, t])

  useInfiniteScroll({
    targetRef: loaderRef,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

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

  if (!profile?.id) {
    return <RequireLogin />
  }

  if (isLoadingAppointments) {
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        <Header title={title} isCenter />
        <LoadingState />
      </PullToRefresh>
    )
  }

  /*
   * Empty khi không còn hàng sau khi group: API có thể trả cuộc hẹn nhưng toàn quá khứ
   * (groupAppointmentsByUpcomingWindow chỉ giữ từ hôm nay) → rows rỗng, không được coi là "có data".
   */
  if (rows.length === 0) {
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        <Header title={title} isCenter />
        <EmptyAppointment variant="upcoming" />
      </PullToRefresh>
    )
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={title} isCenter />

      <div ref={parentRef} className="mt-4 overflow-y-auto px-4 pb-[90px]">
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
        {hasNextPage ? (
          <div
            ref={loaderRef}
            className="flex items-center justify-center py-4"
          >
            {isFetchingNextPage ? (
              <span className="size-5 animate-spin rounded-full border-2 border-[#FFE8E6] border-t-[#A8071A]" />
            ) : null}
          </div>
        ) : null}
      </div>
    </PullToRefresh>
  )
}
