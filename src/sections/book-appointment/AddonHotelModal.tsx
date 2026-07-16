import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { enUS, km, vi } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Calendar } from '#/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { Sheet, SheetContent } from '#/components/ui/sheet'
import { cn } from '#/lib/utils'
import type { SelectedRoom } from '#/stores/booking-store'

type DraftRoom = { checkInDate: string; checkOutDate: string }

const nightsOf = (r: DraftRoom): number => {
  if (!r.checkInDate || !r.checkOutDate) return 0
  const n = dayjs(r.checkOutDate).diff(dayjs(r.checkInDate), 'day')
  return n > 0 ? n : 0
}

const fmt = (iso: string) => (iso ? dayjs(iso).format('DD/MM/YYYY') : '')

/**
 * CR-02 §3.9b — Bottom modal đặt nhà nghỉ: mỗi phòng chọn check-in/out (range),
 * tự tính số đêm, "Book additional rooms", Confirm mới lưu.
 */
export function AddonHotelModal({
  open,
  onOpenChange,
  initialRooms,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialRooms?: SelectedRoom[]
  onConfirm: (rooms: SelectedRoom[]) => void
}) {
  const { t, i18n } = useTranslation(['book-appointment'])
  const [rooms, setRooms] = useState<DraftRoom[]>([
    { checkInDate: '', checkOutDate: '' },
  ])
  /** Index phòng đang mở lịch (null = đóng). */
  const [pickerIndex, setPickerIndex] = useState<number | null>(null)
  /** Phòng đang thu gọn (accordion). Mặc định mở. */
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})

  // Nạp lại draft mỗi lần mở modal (chưa Confirm thì không lưu).
  useEffect(() => {
    if (!open) return
    setRooms(
      initialRooms?.length
        ? initialRooms.map((r) => ({
            checkInDate: r.checkInDate,
            checkOutDate: r.checkOutDate,
          }))
        : [{ checkInDate: '', checkOutDate: '' }],
    )
    setPickerIndex(null)
  }, [open, initialRooms])

  const calendarLocale = (() => {
    const l = (i18n.language ?? '').toLowerCase()
    if (l.startsWith('km')) return km
    if (l.startsWith('vi')) return vi
    return enUS
  })()

  const addRoom = () =>
    setRooms((prev) => [...prev, { checkInDate: '', checkOutDate: '' }])

  /** Xoá 1 phòng (không cho xoá phòng cuối cùng). */
  const removeRoom = (index: number) =>
    setRooms((prev) => {
      if (prev.length <= 1) return prev
      setCollapsed({}) // reset để tránh lệch index sau khi xoá
      return prev.filter((_, i) => i !== index)
    })

  // Mỗi phòng phải có range hợp lệ (≥ 1 đêm) mới cho Confirm — tránh hotel $0.
  const allRoomsValid = rooms.length > 0 && rooms.every((r) => nightsOf(r) > 0)

  const confirm = () => {
    if (!allRoomsValid) return
    const result: SelectedRoom[] = rooms.map((r) => ({
      checkInDate: r.checkInDate,
      checkOutDate: r.checkOutDate,
      nights: nightsOf(r),
    }))
    onConfirm(result)
    onOpenChange(false)
  }

  const activeRoom = pickerIndex != null ? rooms[pickerIndex] : undefined

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          aria-describedby={undefined}
          className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden rounded-t-[16px] p-0"
        >
          {/* Header cố định */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#E2E2E2] px-[16px] pt-[16px] pb-[12px]">
            <Text size="lg_16" className="font-semibold leading-[22px]">
              {t('serviceStep.checkInCheckOut')}
            </Text>
            <button
              type="button"
              className="text-primary"
              onClick={() => onOpenChange(false)}
            >
              <Text size="base_14" className="font-medium text-primary">
                {t('serviceStep.close')}
              </Text>
            </button>
          </div>

          {/* Body scroll — chỉ phần list room cuộn */}
          <div className="min-h-0 flex-1 overflow-y-auto px-[16px]">
          <div className="flex flex-col pt-[8px]">
            {rooms.map((room, index) => {
              const isCollapsed = !!collapsed[index]
              return (
                <div
                  key={index}
                  className="flex flex-col gap-[8px] border-t border-[#E2E2E2] py-[16px] first:border-t-0"
                >
                  {/* Header — bấm để thu gọn/mở (accordion) + nút xoá phòng */}
                  <div className="flex w-full items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCollapsed((c) => ({ ...c, [index]: !c[index] }))
                      }
                      className="flex items-center gap-[6px]"
                      aria-expanded={!isCollapsed}
                    >
                      <Icon name="room" className="size-[18px]" />
                      <Text
                        size="base_14"
                        className="font-semibold leading-[1.3]"
                      >
                        {t('serviceStep.roomIndex', {
                          index: String(index + 1).padStart(2, '0'),
                        })}
                      </Text>
                      <Icon
                        name="dropdown"
                        className={cn(
                          'ml-[2px] size-[12px] text-[#475569] transition-transform',
                          isCollapsed && '-rotate-90',
                        )}
                      />
                    </button>
                    {rooms.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoom(index)}
                        aria-label={t('serviceStep.removeRoom')}
                        className="flex size-[24px] items-center justify-center rounded-full text-[#94A3B8] hover:text-primary"
                      >
                        <Icon name="close" className="size-[16px]" />
                      </button>
                    )}
                  </div>

                  {!isCollapsed && (
                    <>
                      <Text size="sm_12" className="text-[#64748B]">
                        {t('serviceStep.fromDateToDate')}
                      </Text>
                      <button
                        type="button"
                        onClick={() => setPickerIndex(index)}
                        className="flex h-[45px] items-center justify-between rounded-[8px] border border-[#E2E2E2] px-[12px]"
                      >
                        <Text size="base_14" className="leading-none">
                          {room.checkInDate && room.checkOutDate
                            ? `${fmt(room.checkInDate)} - ${fmt(room.checkOutDate)}`
                            : t('serviceStep.selectDates')}
                        </Text>
                        <Icon
                          name="calendar_profile"
                          className="size-5 text-text-secondary"
                        />
                      </button>
                      <Text size="sm_12" className="text-[#64748B]">
                        {t('serviceStep.numberOfNights', {
                          nights: nightsOf(room),
                        })}
                      </Text>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={addRoom}
            className="flex items-center gap-[8px] border-t border-[#E2E2E2] py-[16px] text-primary"
          >
            <span className="text-[18px] font-medium leading-none text-primary">
              +
            </span>
            <Text size="base_14" className="font-medium text-primary underline">
              {t('serviceStep.bookAdditionalRooms')}
            </Text>
          </button>
          </div>

          {/* Footer cố định */}
          <div className="flex shrink-0 flex-col gap-[12px] border-t border-[#E2E2E2] px-[16px] pt-[12px] pb-[16px]">
            <div className="text-center">
              <Text size="base_14" className="font-semibold">
                {t('serviceStep.totalRoom')}{' '}
                <span className="text-[#334155]">x{rooms.length}</span>
              </Text>
            </div>
            <button
              type="button"
              onClick={confirm}
              disabled={!allRoomsValid}
              className={cn(
                'h-[48px] w-full rounded-[999px] bg-primary',
                !allRoomsValid && 'pointer-events-none opacity-50',
              )}
            >
              <Text size="lg_16" className="font-semibold text-white">
                {t('serviceStep.confirm')}
              </Text>
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Lịch chọn range cho phòng đang mở */}
      <Dialog
        open={pickerIndex != null}
        onOpenChange={(o) => !o && setPickerIndex(null)}
      >
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className={cn(
            'flex w-fit max-w-[calc(100vw-32px)] flex-col border-0 bg-transparent p-0 shadow-none',
            'max-h-[92dvh] overflow-x-hidden overflow-y-auto',
          )}
        >
          <DialogTitle className="sr-only">Select dates</DialogTitle>
          <DialogDescription className="sr-only">
            Select check-in and check-out dates
          </DialogDescription>
          <div className="min-h-[340px] w-full shrink-0 rounded-xl bg-white shadow-sm">
            <Calendar
              mode="range"
              locale={calendarLocale}
              disabled={{ before: new Date() }}
              selected={
                activeRoom?.checkInDate
                  ? {
                      from: dayjs(activeRoom.checkInDate).toDate(),
                      to: activeRoom.checkOutDate
                        ? dayjs(activeRoom.checkOutDate).toDate()
                        : undefined,
                    }
                  : undefined
              }
              onSelect={(range) => {
                if (pickerIndex == null) return
                const from = range?.from
                const to = range?.to
                // Chỉ nhận checkout khi SAU checkin (>=1 đêm); ngược lại chờ user chọn end hợp lệ.
                const validNights =
                  !!from &&
                  !!to &&
                  dayjs(to).startOf('day').diff(dayjs(from).startOf('day'), 'day') >= 1
                setRooms((prev) =>
                  prev.map((r, i) =>
                    i === pickerIndex
                      ? {
                          checkInDate: from ? dayjs(from).format('YYYY-MM-DD') : '',
                          checkOutDate: validNights
                            ? dayjs(to).format('YYYY-MM-DD')
                            : '',
                        }
                      : r,
                  ),
                )
                // Đóng lịch CHỈ khi đã có cả start + end và end sau start (>=1 đêm).
                if (validNights) setPickerIndex(null)
              }}
              className="rounded-xl bg-transparent"
              captionLayout="dropdown"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
