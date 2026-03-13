export default function SearchBar() {
  return (
    <div className="flex items-center gap-[10px] px-[14px] py-[12px] rounded-[30px] bg-white">
      <img src="/icons/search-icon.png" alt="search" className="w-6 h-6" />
      <input
        className="flex-1 min-w-0 bg-transparent outline-none text-sm truncate"
        placeholder="Search for doctors, hospitals, packages"
      />
    </div>
  )
}
