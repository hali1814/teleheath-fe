import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'

const recentSearches = [
  {
    text: 'Dental Checkup',
    onRemove: () => {},
  },
  {
    text: 'Eye Specialist',
    onRemove: () => {},
  },
  {
    text: 'Tam Anh Hospital',
    onRemove: () => {},
  },
]

const RecentSearchesItem = ({
  text,
  onRemove,
}: {
  text: string
  onRemove: () => void
}) => {
  return (
    <Badge className="h-[36px] px-[16px] py-[8px] gap-[8px] rounded-full bg-secondary/5">
      <Text size="base_14" className="font-normal leading-normal">
        {text}
      </Text>
      <div onClick={onRemove}>
        <Icon name="close" className="w-[8px] h-[8px] text-muted-foreground" />
      </div>
    </Badge>
  )
}

export default function RecentSearches() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <div className="flex items-center justify-between">
        <Text
          size="lg_16"
          className="font-semibold text-[#333333] leading-[1.2]"
        >
          Recent Searches
        </Text>
        <Text
          size="base_14"
          className="font-medium text-primary leading-normal"
        >
          Clear
        </Text>
      </div>
      <div className="flex flex-wrap gap-[12px]">
        {recentSearches.map((search) => (
          <RecentSearchesItem key={search.text} {...search} />
        ))}
      </div>
    </div>
  )
}
