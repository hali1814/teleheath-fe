import { Icon } from '#/components/icon'
import Text from '#/components/text'

export default function EmptyState({ query }: { query: string }) {
  return (
    <div className="h-[450px] w-full flex flex-col items-center justify-center">
      <Icon name="empty_search" className="w-[88px] h-[86px] text-icon" />
      <Text
        size="base_14"
        className="font-normal text-muted-foreground leading-normal"
      >
        No results for <span className="italic">"{query}"</span>
      </Text>
    </div>
  )
}
