import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Modal from '#/components/Modal'
import Text from '#/components/text'
import { Link } from '@tanstack/react-router'

export default function PopupAds({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative max-h-[75vh] w-full rounded-[16px] bg-white overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
        <button
          className="absolute top-[16px] right-[16px] w-[32px] h-[32px] rounded-full bg-black/10
           flex items-center justify-center z-50"
          onClick={onClose}
        >
          <Icon name="close" className="w-[12px] h-[12px] text-white" />
        </button>
        <div className="relative h-[230px] w-full overflow-hidden rounded-tl-[16px] rounded-tr-[16px]">
          <Image
            src="/ads.png"
            alt="PopupAds"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-black/80"
            aria-hidden
          />
          <div
            className="absolute left-[24px] bottom-[24px] h-[20px] px-[8px] py-[4px] 
           bg-[#D33131] rounded-[4px] flex items-center justify-center"
          >
            <Text
              size="sm_12"
              className="font-medium text-white leading-none uppercase tracking-[3%]"
            >
              Exclusive
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] items-center justify-center p-[24px] pb-[37px]">
          <Text
            size="2xl_20"
            className="text-center font-semibold leading-normal"
          >
            Premium Medical Services in Vietnam
          </Text>
          <Text
            size="base_14"
            className="text-center font-normal leading-normal text-muted-foreground"
          >
            Experience world-class healthcare with our top-rated international
            hospitals and specialists.
          </Text>

          <Link
            to="/app/book-appointment"
            search={{ country: 'VN' }}
            className="w-full rounded-[40px] bg-primary py-[12px]"
            style={{
              boxShadow: '0px 2px 6px 0px #E22A364D',
            }}
          >
            <Text
              size="base_14"
              className="text-center font-semibold text-white leading-[1.2] uppercase"
            >
              Book now
            </Text>
          </Link>
        </div>
      </div>
    </Modal>
  )
}
