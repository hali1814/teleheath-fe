import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Progress } from '#/components/ui/progress'
import { createContext, useEffect, useRef, useState } from 'react'
import { Header } from '../home'
import { useRouter } from '@tanstack/react-router'
import { useBookingStore } from '#/stores/booking-store'
import { useTranslation } from 'react-i18next'

/**
 * Slot nằm TRONG footer cố định (trên 2 nút Back/Continue). Step con dùng
 * createPortal để ghim nội dung (vd tổng kết dịch vụ) chung panel với nút,
 * không phải cuộn xuống cuối trang mới thấy.
 */
export const FooterSlotContext = createContext<HTMLElement | null>(null)

export function StepLayout({
  title,
  children,
  onNext,
  onBack,
  step,
  total,
  disableNext,
  onSubmit,
}: any) {
  const { t } = useTranslation('book-appointment')
  const router = useRouter()
  const routerRef = useRef(router)
  routerRef.current = router
  const { reset } = useBookingStore()

  useEffect(() => {
    return () => {
      const pathname = routerRef.current.state.location.pathname
      if (pathname.startsWith('/app/payment/khqr')) return
      reset()
    }
  }, [reset])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  // Footer có thể chứa slot động (tổng kết) → đo chiều cao thật để chừa padding,
  // tránh nội dung bị footer che (thay cho pb cố định trước đây).
  const [footerEl, setFooterEl] = useState<HTMLDivElement | null>(null)
  const [slotEl, setSlotEl] = useState<HTMLDivElement | null>(null)
  const [footerHeight, setFooterHeight] = useState(103)

  useEffect(() => {
    if (!footerEl) return
    const update = () => setFooterHeight(footerEl.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(footerEl)
    return () => ro.disconnect()
  }, [footerEl])

  return (
    <div
      className="flex min-h-dvh flex-col relative bg-background"
      style={{ paddingBottom: footerHeight }}
    >
      <Header isHome={false} title={title} />
      {/* Header */}
      <div className="flex flex-col gap-[12px] px-[16px] py-[10px] mt-[16px]">
        <div className="flex justify-between items-center">
          <Text className="font-medium leading-normal">{title}</Text>
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground uppercase"
          >
            {t('stepLayout.stepOf', { current: step + 1, total })}
          </Text>
        </div>
        <Progress
          value={((step + 1) / total) * 100}
          className="h-[6px] rounded-full bg-[#FADDDD]"
        />
      </div>

      {/* Content */}
      <FooterSlotContext.Provider value={slotEl}>
        <div className="flex-1 mt-[20px]">{children}</div>
      </FooterSlotContext.Provider>

      {/* Footer cố định: slot động (nếu có) + 2 nút */}
      <div
        ref={setFooterEl}
        className="fixed bottom-0 left-0 right-0 bg-background"
      >
        <div ref={setSlotEl} />
        <div className="flex justify-between items-center pt-[10px] pb-[32px] px-[20px]">
          <Button
            className="w-[120px] h-[45px] rounded-[40px] bg-[#FFFFFF] border border-[#F2F2F2]"
            disabled={step === 0}
            onClick={onBack}
          >
            <Text className="font-medium leading-normal">
              {t('stepLayout.back')}
            </Text>
          </Button>

          <Button
            className="w-[120px] h-[45px] rounded-[40px] bg-primary"
            onClick={() => {
              if (step === total - 1) {
                onSubmit()
              } else {
                onNext()
              }
            }}
            disabled={disableNext}
          >
            <Text className="font-medium leading-normal text-white">
              {step === total - 1
                ? t('stepLayout.bookNow')
                : t('stepLayout.continue')}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  )
}
