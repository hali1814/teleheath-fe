import { Icon } from './icon'
import Text from './text'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const benefits = [
  'Book Appointments',
  'Door-to-Door Transport',
  'Support Staff',
]

export default function PremiumService() {
  return (
    <div className="p-[20px] relative rounded-[16px] w-full bg-linear-to-r from-[#E1444E] to-[#F9B8A8]">
      <div className="relative flex flex-col justify-between gap-3">
        <Icon
          name="logo_premium_service"
          className="absolute top-0 right-0 w-[42px] h-[42px]"
          color="white"
        />

        <Badge
          variant="outline"
          className="self-start px-[10px] py-[4px] text-white bg-white/20 border-white/40 rounded-full"
        >
          <Text
            size="xs_10"
            className="font-semibold tracking-[0.48px] leading-none text-white uppercase"
          >
            Premium Service
          </Text>
        </Badge>

        <div>
          <Text
            size="2xl_20"
            className="font-semibold leading-normal text-white"
          >
            Complete Care Journey
          </Text>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white/25">
                <Icon name="check" className="w-[8px] h-[8px]" color="white" />
              </div>
              <Text
                size="sm_12"
                className="font-medium leading-[1.3] text-white/90"
              >
                {item}
              </Text>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button className="px-[12px] rounded-[6px] bg-white">
            <Text
              size="sm_12"
              className="font-semibold leading-none text-[#F5222D] uppercase"
            >
              BOOK NOW!
            </Text>
          </Button>

          <div className="flex items-center">
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center">
              <img
                src="/icons/medical_services.svg"
                alt="Medical services"
                className="w-[10px] h-[10px] object-contain"
              />
            </span>
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center -ml-3 z-20">
              <span className="text-lg leading-none text-white">🗓</span>
            </span>
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center -ml-3 z-20">
              <img
                src="/icons/call-doctor.svg"
                alt="Call doctor"
                className="w-[10px] h-[10px] object-contain"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
