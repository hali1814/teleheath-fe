import { Icon, type IconName } from './icon'
import Text from './text'
import { cn } from '#/lib/utils'
import { useState } from 'react'

export default function BottomNavigation() {
  const [isActive, setIsActive] = useState(false)

  const NavItem = ({
    icon,
    label,
    isActive,
  }: {
    icon: IconName
    label: string
    isActive: boolean
  }) => {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-[8px]">
        <Icon name={icon} color={isActive ? 'var(--primary)' : '#cccccc'} />
        <Text
          size="sm_12"
          className={cn(
            'text-center leading-[1.3]',
            isActive ? 'text-primary' : 'text-placeholder-input',
          )}
        >
          {label}
        </Text>
      </div>
    )
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 shadow-lg py-[14px]"
      style={{
        backgroundImage: "url('/src/assets/images/home/footer.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative flex justify-between items-center">
        <NavItem icon="home" label="Home" isActive={true} />
        <NavItem icon="appointment" label="Appointments" isActive={false} />
        <div className="h-[47.6px] flex-1 flex flex-col items-center justify-end gap-[8px]">
          <div
            className="absolute -top-[28px] w-[48px] h-[48px] rounded-full flex items-center justify-center"
            style={{
              background:
                'linear-gradient(to right, #E22A36, #E55752, #E78871)',
            }}
          >
            <Icon name="book" color="white" className="w-[24px] h-[24px]" />
          </div>
          <Text
            size="sm_12"
            className={cn(
              'text-center leading-[1.3]',
              isActive ? 'text-primary' : 'text-placeholder-input',
            )}
          >
            Book
          </Text>
        </div>
        <NavItem icon="history" label="History" isActive={false} />
        <NavItem icon="profile" label="Profile" isActive={false} />
      </div>
    </div>
  )
}
