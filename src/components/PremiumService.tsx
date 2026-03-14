import { Badge } from './ui/badge'

const benefits = [
  'Book Appointments',
  'Door-to-Door Transport',
  'Support Staff',
]

export default function PremiumService() {
  return (
    <div className="p-[20px] relative rounded-[16px] w-full bg-gradient-to-r from-[#E1444E] to-[#F9B8A8]">
      <div className="relative flex flex-col justify-between gap-3">
        <img
          src="/icons/logo-premium-service.svg"
          alt="premium service"
          className="absolute top-0 right-0 w-[42px] h-[42px] object-contain"
        />

        <Badge
          variant="outline"
          className="self-start px-[10px] py-[4px] text-white bg-white/20 border-white/40 rounded-full"
        >
          <span className="text-white text-[10px] font-semibold tracking-[0.08em]">
            PREMIUM SERVICE
          </span>
        </Badge>

        <div>
          <span className="text-white text-2xl font-semibold leading-snug">
            Complete Care Journey
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25">
                <img src="/icons/check.svg" alt="check" className="w-2 h-2" />
              </div>
              <span className="text-sm text-white/90">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold leading-[30px]">
          Complete Care Journey
        </h2>

        <p className="text-sm ">Book Appointments</p>

        <div className="flex items-center justify-between">
          <button className="px-[12px] py-[10px] rounded-[6px] bg-white text-[#E1444E] text-sm font-semibold shadow-sm hover:bg-white/90 transition-colors">
            BOOK NOW!
          </button>

          <div className="flex items-center">
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center">
              <img
                src="/icons/medical_services.png"
                alt="Medical services"
                className="w-[10px] h-[10px] object-contain"
              />
            </span>
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center -ml-3 z-20">
              <span className="text-lg leading-none text-white">🗓</span>
            </span>
            <span className="w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center -ml-3 z-20">
              <img
                src="/icons/call-doctor.png"
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
