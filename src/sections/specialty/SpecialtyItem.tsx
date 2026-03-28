import Image from '#/components/image'
import Text from '#/components/text'
import type { Specialty } from '#/types/specialty'

export default function SpecialtyItem(props: Specialty) {
  const { name, iconUrl } = props

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-[8px]">
      <div className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-[#D331311A]">
        <Image
          src={iconUrl}
          alt="specialty"
          className="h-[24px] w-[24px] object-cover"
        />
      </div>
      <Text
        size="xs_10"
        className="font-medium leading-none tracking-[3%] text-[#475569] uppercase"
      >
        {name}
      </Text>
    </div>
  )
}
