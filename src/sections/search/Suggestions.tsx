import { Icon } from '#/components/icon'
import Text from '#/components/text'
import EmptyState from './EmptyState'
import { TransNoSuggestionsFor } from './TransSearchEmptyMessages'

const highlight = (text: string, query: string) => {
  if (!query) return [text]

  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safe})`, 'gi')

  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-secondary">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

const SuggestionItem = ({
  rawText,
  children,
  onSelect,
}: {
  rawText: string
  children: React.ReactNode
  onSelect: (text: string) => void
}) => {
  return (
    <div
      className="flex items-center gap-[12px] p-[12px]"
      onClick={() => onSelect(rawText)}
    >
      <Icon
        name="history_fill"
        className="w-[20px] h-[20px] text-muted-foreground"
      />

      <Text size="base_14" className="flex-1 font-medium leading-normal">
        {children}
      </Text>

      <Icon name="arrow_45deg" className="w-[9px] h-[9px] text-[#CBD5E1]" />
    </div>
  )
}

export default function Suggestions({
  query,
  items,
  onSelect,
}: {
  query: string
  items: { type: string; text: string; id: string }[]
  onSelect: (text: string) => void
}) {
  return (
    <div className="flex flex-col gap-[4px] px-[16px] py-[12px]">
      {items.length > 0 ? (
        items.map((item) => (
          <SuggestionItem
            key={item.text}
            rawText={item.text}
            onSelect={onSelect}
          >
            {highlight(item.text, query)}
          </SuggestionItem>
        ))
      ) : (
        <EmptyState>
          <TransNoSuggestionsFor query={query} />
        </EmptyState>
      )}
    </div>
  )
}
