import Text from '#/components/text'
import { Icon } from '#/components/icon'

export default function ExpandViewButton({
  expanded,
  ...props
}: { expanded: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="flex items-center gap-[6px]">
        <Text className="text-dust-red-8 leading-[1.7] font-medium cursor-pointer">
          {expanded ? 'View less' : 'View more'}
        </Text>
        {expanded ? (
          <Icon name="arrow_up" className="w-[8px] h-[8px] text-dust-red-8" />
        ) : (
          <Icon name="arrow_down" className="w-[8px] h-[8px] text-dust-red-8" />
        )}
      </div>
    </div>
  )
}
