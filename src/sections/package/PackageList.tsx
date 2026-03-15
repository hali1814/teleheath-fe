import { Button } from '#/components/ui/button'
import { PackageCard } from '#/sections/package'
import { useRouter } from '@tanstack/react-router'
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
  const router = useRouter()
  const handleClickViewAll = () => {
    router.navigate({ to: href })
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Text size="base_14" className="font-medium leading-[1.2]">
          {title}
        </Text>
        <Button variant="link" size="sm" onClick={handleClickViewAll}>
          <Text size="sm_12" className="text-dust-red-8">
            View all
          </Text>
        </Button>
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        {packages.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
