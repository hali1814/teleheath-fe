import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { packages } from '#/mockData'
import { PackageCard } from '#/sections/package'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ModalFilterPackage from '#/sections/package/ModalFilterPackage'
import { useTranslation } from 'react-i18next'
import { useGetListPackagesQuery } from '#/services/query/package/list-packages'

export const Route = createFileRoute('/app/package/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['package'])

  const { data: { data: packagesData } = { data: [] } } =
    useGetListPackagesQuery({
      params: {
        page: 1,
        pageSize: 10,
      },
    })

  return (
    <>
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar placeholder={t('searchPlaceholder')} />
          <div className="relative" onClick={() => setOpen(true)}>
            <Icon name="filter" className="text-icon" />
            <Badge className="w-[16px] h-[16px] rounded-full absolute -top-2 -right-2 p-0">
              0
            </Badge>
          </div>
        </div>
        {packagesData.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
      <ModalFilterPackage open={open} onOpenChange={setOpen} />
    </>
  )
}
