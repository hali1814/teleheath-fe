import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Link } from '@tanstack/react-router'

export default function Header({
  isHome = false,
  title = 'Telehealth',
}: {
  isHome?: boolean
  title?: string
}) {
  return (
    <header className="sticky top-0 z-50 h-[62px] px-[16px] py-[20px] border-b border-[#FFE8E6] bg-background">
      {isHome ? (
        <div className="flex items-center justify-between">
          <Link to="/app/home" className="flex items-center gap-[4px]">
            <Image src="/logo.png" alt="logo" className="w-[32px] h-[32px]" />
            <Text
              size="4xl_24"
              className="font-medium uppercase text-[#D43129]"
            >
              {title}
            </Text>
          </Link>
          <Icon
            name="notification"
            className="w-[28px] h-[28px]"
            color="#B3B3B3"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link to="/app/home" className="flex items-center gap-[16px]">
            <Icon
              name="arrow_left"
              className="w-[12px] h-[24px]"
              color="#808080"
            />
            <Text size="lg_16" className="font-medium">
              {title}
            </Text>
          </Link>
          <Link to="/app/home">
            <Icon
              name="circle_home"
              className="w-[28px] h-[28px] text-dust-red-8"
            />
          </Link>
        </div>
      )}
    </header>
  )
}
