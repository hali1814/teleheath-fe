import { Icon } from './icon'

export default function SearchBar() {
  return (
    <div className="w-full flex items-center gap-[10px] px-[14px] py-[12px] rounded-[30px] bg-white">
      <Icon name="search_icon" className="w-[20px] h-[20px]" />
      <input
        className="flex-1 min-w-0 bg-transparent outline-none text-sm truncate"
        placeholder="Search for doctors, hospitals, packages"
      />
    </div>
  )
}
