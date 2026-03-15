import { useRouter } from '@tanstack/react-router'
import { HospitalCard } from '#/sections/hospital'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'

interface Hospital {
  id: string
  name: string
  location: string
  thumbnail: string
}

export default function HospitalList({
  title,
  href,
  hospitals,
}: {
  title: string
  href: string
  hospitals: Hospital[]
}) {
  const router = useRouter()
  const handleClickViewAll = () => {
    router.navigate({ to: href })
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text size="base_14" className="font-medium leading-[1.2]">
          {title}
        </Text>
        <Button variant="link" size="sm" onClick={handleClickViewAll}>
          <Text size="sm_12" className="text-dust-red-8">
            View all
          </Text>
        </Button>
      </div>
      <div className="w-full flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} {...hospital} className="w-[192px]" />
        ))}
      </div>
    </div>
  )
}
