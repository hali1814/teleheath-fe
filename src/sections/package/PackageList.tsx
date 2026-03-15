import { PackageCard } from '#/sections/package'
import { Link } from '@tanstack/react-router'
import Text from '#/components/text'

interface Package {
  id: string
  name: string
  location: string
  price: number
  thumbnail: string
}

export default function PackageList({
  title,
  href,
  packages,
}: {
  title: string
  href: string
  packages: Package[]
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text size="base_14" className="font-medium leading-[1.2]">
          {title}
        </Text>
        <Link to={href}>
          <Text size="sm_12" className="text-dust-red-8">
            View all
          </Text>
        </Link>
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        {packages.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
