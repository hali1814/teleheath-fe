import { Icon } from './icon'

export default function SearchBar({
  value,
  placeholder = 'Search',
  onSearch,
  onClick,
  onClear,
}: {
  value?: string
  placeholder?: string
  onSearch?: (query: string) => void
  onClick?: () => void
  onClear?: () => void
}) {
  return (
    <div
      className="w-full flex items-center gap-[10px] px-[14px] py-[12px] rounded-[30px] bg-white"
      onClick={onClick}
    >
      <Icon name="search_icon" className="w-[20px] h-[20px]" />
      <input
        className="flex-1 min-w-0 bg-transparent outline-none text-sm truncate"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
      />
      {value && (
        <button onClick={() => onClear?.()}>
          <Icon name="close" className="w-[10px] h-[10px] text-[#CCCCCC]" />
        </button>
      )}
    </div>
  )
}
