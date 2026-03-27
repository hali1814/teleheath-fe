import { Icon } from './icon'
import Text from './text'

type Props = {
  value?: string
  placeholder?: string
  autoFocus?: boolean
  isHome?: boolean
  onSearch?: (query: string) => void
  onClick?: () => void
  onClear?: () => void
}

export default function SearchBar({
  value,
  placeholder = 'Search',
  autoFocus = false,
  isHome = false,
  onSearch,
  onClick,
  onClear,
}: Props) {
  const content = (
    <>
      <Icon name="search_icon" className="w-[20px] h-[20px]" />

      {isHome ? (
        <Text
          size="base_14"
          className="flex-1 text-start text-[#999999] leading-normal truncate"
        >
          {placeholder}
        </Text>
      ) : (
        <input
          autoFocus={autoFocus}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="
            flex-1 min-w-0 bg-transparent outline-none
            text-[14px] leading-normal truncate
            placeholder:text-[#999999]
          "
        />
      )}

      {!isHome && value && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClear?.()
          }}
        >
          <Icon name="close" className="w-[10px] h-[10px] text-[#CCCCCC]" />
        </button>
      )}
    </>
  )

  if (isHome) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          w-full flex items-center gap-[10px]
          px-[14px] py-[12px]
          rounded-[30px] bg-white
        "
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className="
        w-full flex items-center gap-[10px]
        px-[14px] py-[12px]
        rounded-[30px] bg-white
      "
    >
      {content}
    </div>
  )
}
