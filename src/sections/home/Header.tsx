import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Link, useRouter } from '@tanstack/react-router'

export default function Header({
  isHome = false,
  title = 'Telehealth',
  isCenter = false,
}: {
  isHome?: boolean
  title?: string
  isCenter?: boolean
}) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 h-[62px] border-b-[0.5px] border-[#FFE8E6] bg-background">
      {isHome ? (
        <div className="flex items-center justify-between h-full pl-[16px] pr-[20px]">
          <Link to="/app/home">
            <Icon name="logo" className="w-[155px] h-[48px]" />
          </Link>
          <Link to="/app/notification">
            <Icon
              name="notification"
              className="w-[21px] h-[21px]"
              color="#B3B3B3"
            />
          </Link>
        </div>
      ) : isCenter ? (
        <div className="flex h-full items-center justify-center">
          <Text size="lg_16" className="font-medium leading-normal">
            {title}
          </Text>
        </div>
      ) : (
        <div className="flex h-full items-center justify-between px-[16px]">
          <div className="flex items-center gap-[16px]">
            <div
              onClick={() => router.history.back()}
              className="flex items-center gap-[16px] bg-transparent border-0 p-0"
              aria-label="Go back"
            >
              <Icon
                name="arrow_left"
                className="w-[12px] h-[24px]"
                color="#808080"
              />
            </div>
            <Text size="lg_16" className="font-medium leading-normal">
              {title}
            </Text>
          </div>

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
