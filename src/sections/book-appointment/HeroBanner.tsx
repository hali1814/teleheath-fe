import Image from '#/components/image'
import HeroBannerImage from '#/assets/images/book-appointment/hero-banner.png'
import Text from '#/components/text'

export default function HeroBanner() {
  return (
    <>
      <div className="relative">
        <Image
          src={HeroBannerImage}
          alt="Hero Banner"
          className="w-full h-[128px] rounded-[12px]"
        />
        <div
          className="absolute inset-0 flex flex-col justify-center gap-[4px] rounded-[12px] pl-[24px]"
          style={{
            background: 'linear-gradient(90deg, #D33131CC 0%, #D3313100 100%)',
          }}
        >
          <Text
            size="sm_12"
            className="font-medium tracking-[0.03em] text-white uppercase"
          >
            Quick Health Check
          </Text>
          <Text
            size="xl_18"
            className="font-semibold leading-normal text-white"
          >
            Priority Consultations
          </Text>
        </div>
      </div>
      <Text className="leading-normal text-muted-foreground">
        Select your preferred way to schedule a visit.
      </Text>
    </>
  )
}
