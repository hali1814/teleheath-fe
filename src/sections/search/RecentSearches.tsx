import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { useSearchStore } from '#/stores/search'

const RecentSearchesItem = ({
  text,
  onSelect,
  onRemove,
}: {
  text: string
  onSelect: () => void
  onRemove: () => void
}) => {
  return (
    <Badge className="h-[36px] gap-[8px] rounded-full bg-secondary/5 px-[16px] py-[8px]">
      <button
        type="button"
        className="min-w-0 max-w-[200px] truncate text-left"
        onClick={onSelect}
      >
        <Text size="base_14" className="font-normal leading-normal">
          {text}
        </Text>
      </button>
      <button
        type="button"
        className="shrink-0 border-0 bg-transparent p-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        aria-label={`Remove ${text}`}
      >
        <Icon name="close" className="h-[8px] w-[8px] text-muted-foreground" />
      </button>
    </Badge>
  )
}

export default function RecentSearches({
  onSelect,
}: {
  onSelect: (text: string) => void
}) {
  const recentSearches = useSearchStore((s) => s.recentSearches)
  const removeRecent = useSearchStore((s) => s.removeRecent)
  const clearRecent = useSearchStore((s) => s.clearRecent)

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <div className="flex items-center justify-between">
        <Text
          size="lg_16"
          className="font-semibold leading-[1.2] text-[#333333]"
        >
          Recent Searches
        </Text>
        {recentSearches.length > 0 ? (
          <button
            type="button"
            className="border-0 bg-transparent p-0 cursor-pointer"
            onClick={clearRecent}
          >
            <Text
              size="base_14"
              className="font-medium leading-normal text-primary"
            >
              Clear
            </Text>
          </button>
        ) : null}
      </div>
      {recentSearches.length > 0 ? (
        <div className="flex flex-wrap gap-[12px]">
          {recentSearches.map((text) => (
            <RecentSearchesItem
              key={text}
              text={text}
              onSelect={() => onSelect(text)}
              onRemove={() => removeRecent(text)}
            />
          ))}
        </div>
      ) : (
        <Text size="base_14" className="leading-normal text-muted-foreground">
          No recent searches yet.
        </Text>
      )}
    </div>
  )
}
