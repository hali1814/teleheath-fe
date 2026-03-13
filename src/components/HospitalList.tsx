import HospitalCard from './HospitalCard'
import { Button } from './ui/button'

export default function HospitalList() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-medium">Top Hospitals</h2>
        <Button variant="link" size="sm">
          View all
        </Button>
      </div>
      <div className="w-full flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <HospitalCard
          className="w-[192px]"
          name="Vinmec International Hospital"
          location="Ho Chi Minh City, Vietnam"
          thumbnail="/thumbnail.png"
        />
        <HospitalCard
          className="w-[192px]"
          name="Tam Anh Hospital"
          location="Ho Chi Minh City, Vietnam"
          thumbnail="/thumbnail.png"
        />
        <HospitalCard
          className="w-[192px]"
          name="115 People's Hospital"
          location="Ho Chi Minh City, Vietnam"
          thumbnail="/thumbnail.png"
        />
      </div>
    </div>
  )
}
