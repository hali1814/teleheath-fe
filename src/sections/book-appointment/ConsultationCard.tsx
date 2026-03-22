import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'

export function ConsultationCard({
  className,
  title,
  benefits,
  selected = false,
  onClick,
}: {
  className?: string
  title: string
  benefits: string[]
  selected?: boolean
  onClick?: () => void
}) {
  const borderColor = selected ? 'border-primary' : 'border-dust-red-1'

  return (
    <div
      className={cn(
        'flex gap-[12px] px-[16px] py-[20px] rounded-[12px] bg-white border border-transparent',
        borderColor,
      )}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col gap-[12px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {title}
        </Text>
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-start gap-[8px]">
            <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-primary/10">
              <Icon name="check" className="w-[6px] h-[4px] text-primary" />
            </div>
            <Text
              size="sm_12"
              className="flex-1 text-muted-foreground leading-[1.3]"
            >
              {benefit}
            </Text>
          </div>
        ))}
      </div>
      {selected ? (
        <Icon
          name="check_circle_solid"
          className="w-[20px] h-[20px] text-primary"
        />
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313133]" />
      )}
    </div>
  )
}
