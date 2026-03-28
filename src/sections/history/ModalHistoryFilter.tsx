import { useMemo, useState } from 'react'
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

const HISTORY_FILTER_STATUSES: AppointmentStatus[] = [
  'WAITING_CONFIRM',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
  'PENDING',
]

export default function ModalHistoryFilter({
  open,
  onOpenChange,
  filter,
  onFilterChange,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  filter: HistoryAppointmentFilter
  onFilterChange: (next: HistoryAppointmentFilter) => void
  onApply: () => void
}) {
  const { t } = useTranslation(['appointment', 'common'])
  const [statusOpen, setStatusOpen] = useState(false)

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

  const statusSummary = useMemo(() => {
    if (filter.statuses.length === 0) return ''
    return filter.statuses.map((s) => statusLabel[s]).join(', ')
  }, [filter.statuses, statusLabel])

  const isClearDisabled =
    filter.statuses.length === 0 && !filter.dateFrom && !filter.dateTo

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
        className="max-h-[85vh] gap-5 overflow-y-auto overflow-x-visible bg-white px-5 py-6"
      >
        <DialogHeader>
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

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Text size="base_14" className="text-text-secondary font-normal">
              {t('appointment:status')}
            </Text>
            <button
              type="button"
              className={cn(
                'flex h-[45px] w-full items-center justify-between rounded-[6px] border border-dust-red-1 bg-white px-3 text-left',
              )}
              onClick={() => setStatusOpen((o) => !o)}
            >
              <Text
                size="base_14"
                className={cn(
                  'truncate font-normal',
                  statusSummary ? 'text-text-primary' : 'text-muted-foreground',
                )}
              >
                {statusSummary || t('appointment:status')}
              </Text>
              <Icon name="dropdown" className="size-4 shrink-0 text-text-secondary" />
            </button>
            {statusOpen ? (
              <div
                className="max-h-[240px] w-full overflow-y-auto rounded-lg border border-dust-red-1 bg-white p-2 shadow-sm"
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

          <div className="grid grid-cols-2 gap-3">
            <DateInputBase
              label={t('appointment:from')}
              value={filter.dateFrom}
              onValueChange={(dateFrom) => onFilterChange({ ...filter, dateFrom })}
            />
            <DateInputBase
              label={t('appointment:to')}
              value={filter.dateTo}
              onValueChange={(dateTo) => onFilterChange({ ...filter, dateTo })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2.5 pt-2.5">
          <Button
            variant="ghost"
            className="p-0"
            onClick={handleClearAllFilters}
            disabled={isClearDisabled}
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
