import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { packages } from '#/mockData'
import { PackageCard } from '#/sections/package'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/package/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <div className="flex items-center gap-[10px]">
        <SearchBar placeholder="Search for packages" />
        <div className="relative">
          <Icon name="filter" className="text-icon" />
          <Badge className="w-[16px] h-[16px] rounded-full absolute -top-2 -right-2 p-0">
            0
          </Badge>
        </div>
      </div>
      {packages.map((p) => (
        <PackageCard key={p.id} {...p} />
      ))}
    </div>
  )
}
