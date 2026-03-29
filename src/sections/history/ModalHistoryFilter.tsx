import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DateInputBase from '#/components/input/DateInputBase'
import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Checkbox } from '#/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { cn } from '#/lib/utils'
import type { AppointmentStatus } from '#/services/query/appointment/my-appointments'

export type HistoryAppointmentFilter = {
  statuses: AppointmentStatus[]
  dateFrom: string
  dateTo: string
}

export const emptyHistoryAppointmentFilter: HistoryAppointmentFilter = {
  statuses: [],
  dateFrom: '',
  dateTo: '',
}

/** Mỗi nhóm có giá trị tính 1: (có chọn status) + (from) + (to) → tối đa 3. */
export function getHistoryFilterActiveFieldCount(
  f: HistoryAppointmentFilter,
): number {
  let n = 0
  if (f.statuses.length > 0) n += 1
  if (f.dateFrom) n += 1
  if (f.dateTo) n += 1
  return n
}

const HISTORY_FILTER_STATUSES: AppointmentStatus[] = [
  'WAITING_CONFIRM',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]

export default function ModalHistoryFilter({
  open,
  onOpenChange,
  filter,
  onFilterChange,
  onApply,
  onActiveFieldCountChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  filter: HistoryAppointmentFilter
  onFilterChange: (next: HistoryAppointmentFilter) => void
  onApply: () => void
  /** Gọi khi draft đổi: số field đang có giá trị (0–3). */
  onActiveFieldCountChange?: (count: number) => void
}) {
  const { t } = useTranslation(['appointment', 'common'])
  const [statusOpen, setStatusOpen] = useState(false)
  const statusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) setStatusOpen(false)
  }, [open])

  useEffect(() => {
    if (!statusOpen) return
    const close = (e: PointerEvent) => {
      const root = statusDropdownRef.current
      if (!root?.contains(e.target as Node)) setStatusOpen(false)
    }
    document.addEventListener('pointerdown', close, true)
    return () => document.removeEventListener('pointerdown', close, true)
  }, [statusOpen])

  const statusLabel = useMemo(
    () =>
      ({
        WAITING_CONFIRM: t('appointment:waitingConfirm'),
        CONFIRMED: t('appointment:confirmed'),
        COMPLETED: t('appointment:completed'),
        CANCELLED: t('appointment:cancelled'),
        NO_SHOW: t('appointment:noShow'),
        PENDING: t('appointment:pending'),
      }) satisfies Record<AppointmentStatus, string>,
    [t],
  )

  const activeFieldCount = useMemo(
    () => getHistoryFilterActiveFieldCount(filter),
    [filter],
  )

  useEffect(() => {
    onActiveFieldCountChange?.(activeFieldCount)
  }, [activeFieldCount, onActiveFieldCountChange])

  const statusSummary = useMemo(() => {
    if (filter.statuses.length === 0) return ''
    return filter.statuses.map((s) => statusLabel[s]).join(', ')
  }, [filter.statuses, statusLabel])

  const hasAnyFilterValue = activeFieldCount > 0

  const handleClearAllFilters = () => {
    onFilterChange(emptyHistoryAppointmentFilter)
  }

  const toggleStatus = (status: AppointmentStatus) => {
    const has = filter.statuses.includes(status)
    onFilterChange({
      ...filter,
      statuses: has
        ? filter.statuses.filter((s) => s !== status)
        : [...filter.statuses, status],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="flex max-h-[90vh] min-h-[400px] min-w-0 flex-col gap-0 overflow-hidden bg-white px-5 py-6 sm:min-h-[600px]"
      >
        <DialogHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="sr-only">
              {t('appointment:filter')}
            </DialogTitle>
            <Text size="lg_16" className="font-semibold leading-[1.2]">
              {t('appointment:filter')}
            </Text>
            <Icon
              name="close"
              className="h-[14px] w-[14px] cursor-pointer"
              color="#B3B3B3"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </DialogHeader>

        {/* Status + dropdown nằm ngoài vùng scroll → absolute không bị overflow clip */}
        <div
          ref={statusDropdownRef}
          className="relative z-100 mt-4 shrink-0"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <Text size="base_14" className="text-text-secondary font-normal">
              {t('appointment:status')}
            </Text>
            <div className="relative min-w-0">
              <button
                type="button"
                className={cn(
                  'flex h-[45px] w-full min-w-0 items-center justify-between gap-2 rounded-[6px] border border-dust-red-1 bg-white px-3 text-left',
                )}
                onClick={() => setStatusOpen((o) => !o)}
              >
                <Text
                  as="span"
                  size="base_14"
                  className={cn(
                    'min-w-0 flex-1 truncate font-normal',
                    statusSummary
                      ? 'text-text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  {statusSummary || t('appointment:status')}
                </Text>
                <Icon
                  name="dropdown"
                  className="size-4 shrink-0 text-text-secondary"
                />
              </button>
              {statusOpen ? (
                <div
                  className="absolute top-full right-0 left-0 z-110 mt-1 max-h-[240px] overflow-y-auto rounded-lg border border-dust-red-1 bg-white p-2 shadow-lg"
                  role="listbox"
                >
                  {HISTORY_FILTER_STATUSES.map((status) => (
                    <label
                      key={status}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={filter.statuses.includes(status)}
                        onCheckedChange={() => toggleStatus(status)}
                      />
                      <Text size="base_14" className="font-normal">
                        {statusLabel[status]}
                      </Text>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-4">
          <div className="grid min-w-0 grid-cols-2 gap-3">
            <DateInputBase
              label={t('appointment:from')}
              value={filter.dateFrom}
              onValueChange={(dateFrom) =>
                onFilterChange({ ...filter, dateFrom })
              }
            />
            <DateInputBase
              label={t('appointment:to')}
              value={filter.dateTo}
              onValueChange={(dateTo) => onFilterChange({ ...filter, dateTo })}
            />
          </div>
        </div>

        <div className="relative z-40 flex shrink-0 items-center justify-between gap-2.5 border-t border-border/40 bg-white pt-4">
          <Button
            variant="ghost"
            className="p-0"
            onClick={handleClearAllFilters}
            disabled={!hasAnyFilterValue}
          >
            <Text className="font-medium leading-normal text-[#A8071A]/50">
              {t('common:actions.clearAllFilters')}
            </Text>
          </Button>
          <Button
            className="h-[45px] rounded-[40px] px-8 py-3"
            onClick={onApply}
          >
            <Text className="font-medium leading-normal text-white">
              {t('common:actions.apply')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
