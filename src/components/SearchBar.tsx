import { cn } from '#/lib/utils'
import { Icon } from './icon'
import Text from './text'

type Props = {
  value?: string
  placeholder?: string
  autoFocus?: boolean
  isHome?: boolean
  isAutoScroll?: boolean
  onSearch?: (query: string) => void
  onClick?: () => void
  onClear?: () => void
}

export default function SearchBar({
  value,
  placeholder = 'Search',
  autoFocus = false,
  isHome = false,
  isAutoScroll = false,
  onSearch,
  onClick,
  onClear,
}: Props) {
  const content = (
    <>
      <Icon name="search_icon" className="w-[20px] h-[20px]" />

      {isHome ? (
        <div className="flex min-h-[1.25em] min-w-0 flex-1 flex-col justify-center overflow-hidden text-start">
          {!isAutoScroll ? (
            <Text
              size="base_14"
              className="text-[#999999] truncate text-start leading-normal"
            >
              {placeholder}
            </Text>
          ) : (
            <>
              <Text
                size="base_14"
                className="hidden text-[#999999] motion-reduce:block motion-reduce:truncate"
              >
                {placeholder}
              </Text>
              <div className="motion-reduce:hidden">
                <div
                  className={cn(
                    'search-bar-placeholder-track',
                    'search-bar-placeholder-track--scroll',
                  )}
                >
                  <span className="whitespace-nowrap pr-10 text-[14px] leading-normal text-[#999999]">
                    {placeholder}
                  </span>
                  <span className="whitespace-nowrap pr-10 text-[14px] leading-normal text-[#999999]">
                    {placeholder}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
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
          type="button"
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
        aria-label={placeholder}
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
