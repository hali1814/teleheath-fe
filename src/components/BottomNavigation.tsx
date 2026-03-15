import { Icon, type IconName } from './icon'
import Text from './text'
import { cn } from '#/lib/utils'

export default function BottomNavigation() {
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
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-[10px] py-[14px]">
      <div className="relative flex justify-between items-center">
        <NavItem icon="home" label="Home" isActive={true} />
        <NavItem icon="appointment" label="Appointments" isActive={false} />
        <div className="w-16" />
        <NavItem icon="history" label="History" isActive={false} />
        <NavItem icon="profile" label="Profile" isActive={false} />
        <button
          className="
      absolute
      -top-6
      left-1/2
      -translate-x-1/2
      w-14 h-14
      rounded-full
      bg-gradient-to-r
      from-red-500
      to-orange-400
      flex items-center justify-center
      shadow-lg
      "
        >
          +
        </button>
      </div>
    </div>
  )
}
