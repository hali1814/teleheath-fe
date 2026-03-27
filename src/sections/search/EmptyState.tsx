import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'

export default function EmptyState({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'h-[450px] w-full flex flex-col items-center justify-center',
        className,
      )}
    >
      <Icon name="empty_search" className="w-[88px] h-[86px] text-icon" />
      <Text
        size="base_14"
        className="font-normal text-muted-foreground leading-normal"
      >
        {children}
      </Text>
    </div>
  )
}
