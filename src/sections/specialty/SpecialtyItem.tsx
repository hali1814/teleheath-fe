import Image from '#/components/image'
import Text from '#/components/text'
import type { Specialty } from '#/entities/specialtyEntity'
import { Link } from '@tanstack/react-router'

export default function SpecialtyItem(props: Specialty) {
  const { specialtyId, name, iconUrl } = props

  return (
    <Link
      to="/app/specialty/search/$specialtyId"
      params={{ specialtyId: specialtyId.toString() }}
      search={{ specialtyName: name }}
      className="flex-1 flex flex-col items-center justify-center gap-[8px]"
    >
      <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-[#D331311A]">
        <Image
          src={iconUrl}
          alt="specialty"
          className="h-[24px] w-[24px] object-cover"
        />
      </div>
      <Text
        size="xs_10"
        className="text-center font-medium leading-none tracking-[3%] text-[#475569] uppercase"
      >
        {name}
      </Text>
    </Link>
  )
}
