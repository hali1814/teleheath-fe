import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Card } from '#/components/ui/card'
import { cn } from '#/lib/utils'

interface CardNavigateProps {
  title: string
  subtitle?: string
  icon: IconName
  onClick?: () => void
  className?: string
  hideArrow?: boolean
}

export default function CardNavigate({
  title,
  subtitle,
  icon,
  onClick,
  className,
  hideArrow = false,
}: CardNavigateProps) {
  return (
    <Card
      className={cn(
        // `Card` mặc định đã có `shadow-xs`; dùng `!` để đảm bảo override.
        'px-4 py-4 cursor-pointer shadow-none',
        className,
      )}
      style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between rounded-xl text-left">
        <div className="flex items-center gap-3">
          <div
            className="flex size-8 items-center justify-center rounded-md"
            style={{ backgroundColor: '#D331311A' }}
          >
            <Icon name={icon} />
          </div>

          <div className="flex flex-col gap-1">
            <Text size="base_14" className="font-medium text-text-primary">
              {title}
            </Text>
            {subtitle ? (
              <Text size="sm_12" className="text-text-secondary">
                {subtitle}
              </Text>
            ) : null}
          </div>
        </div>

        {!hideArrow ? (
          <Icon
            name="arrow_left"
            className="size-4 rotate-180 text-text-tertiary"
          />
        ) : null}
      </div>
    </Card>
  )
}
