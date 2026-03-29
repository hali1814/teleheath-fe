import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { PackageCard } from '#/sections/package'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import ModalFilterPackage from '#/sections/package/ModalFilterPackage'
import { useTranslation } from 'react-i18next'
import { useGetListPackagesQuery } from '#/services/query/package/list-packages'
import { ALL_PAGINATION } from '#/const/pagination'
import { Header } from '#/sections/home'
import { z } from 'zod'
import Text from '#/components/text'
import {
  minMaxToPriceRangeKey,
  priceRangeKeyToMinMax,
} from '#/sections/package/package-filter-price'
import useDebounce from '#/hooks/use-debounce'
import { keepPreviousData } from '@tanstack/react-query'

function parseSearchInt(v: unknown): number | undefined {
  if (v === undefined || v === null || v === '') return undefined
  const n = typeof v === 'number' ? v : Number(String(v).trim())
  return Number.isFinite(n) ? n : undefined
}

/**
 * Filter đã áp dụng lưu trên URL → bookmark / chia sẻ.
 * Giá: `minPrice` / `maxPrice` (number) cho API; modal vẫn chọn theo khoảng preset.
 */
const packageSearchSchema = z
  .object({
    country: z.string().optional(),
    hospitalId: z.string().optional(),
    minPrice: z.unknown().optional(),
    maxPrice: z.unknown().optional(),
  })
  .transform((s) => ({
    country: s.country?.trim() || undefined,
    hospitalId: s.hospitalId?.trim() || undefined,
    minPrice: parseSearchInt(s.minPrice),
    maxPrice: parseSearchInt(s.maxPrice),
  }))

export type PackageSearch = z.infer<typeof packageSearchSchema>

export interface FilterPackage {
  country: string
  hospitalId: string
  /** key preset khoảng giá (vd. `0-100`, `500`) — Apply → min/max URL */
  priceRange: string
}

export const Route = createFileRoute('/app/package/(commonLayout)/')({
  validateSearch: (search: Record<string, unknown>): PackageSearch =>
    packageSearchSchema.parse(search ?? {}),
  component: RouteComponent,
})

function searchToFilter(s: PackageSearch): FilterPackage {
  return {
    country: s.country ?? '',
    hospitalId: s.hospitalId ?? '',
    priceRange: minMaxToPriceRangeKey(s.minPrice, s.maxPrice),
  }
}

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['package'])
  const navigate = useNavigate()
  const search = Route.useSearch()
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const appliedFilter = searchToFilter(search)

  const {
    data: { data: { content: packagesData } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListPackagesQuery({
    params: {
      ...ALL_PAGINATION,
      keyword: debouncedKeyword,
      ...(search.country ? { country: search.country } : {}),
      ...(search.hospitalId ? { hospitalId: search.hospitalId } : {}),
      ...(search.minPrice !== undefined ? { minPrice: search.minPrice } : {}),
      ...(search.maxPrice !== undefined ? { maxPrice: search.maxPrice } : {}),
    },
    placeholderData: keepPreviousData,
  })

  const hasPriceFilter =
    search.minPrice !== undefined || search.maxPrice !== undefined

  const activeFilterCount = [
    appliedFilter.country,
    appliedFilter.hospitalId,
    hasPriceFilter ? 'price' : '',
  ].filter(Boolean).length

  const applyFiltersToUrl = (filter: FilterPackage) => {
    const { minPrice, maxPrice } = priceRangeKeyToMinMax(filter.priceRange)
    navigate({
      to: '/app/package',
      search: {
        country: filter.country || undefined,
        hospitalId: filter.hospitalId || undefined,
        minPrice,
        maxPrice,
      },
      replace: true,
    })
  }

  return (
    <>
      <Header title="Packages" />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onSearch={(value) => setKeyword(value)}
            onClear={() => setKeyword('')}
          />
          <button
            type="button"
            className="relative flex shrink-0 items-center justify-center"
            onClick={() => setOpen(true)}
            aria-label={t('filter.title')}
          >
            <Icon name="filter" className="text-icon" />
            {activeFilterCount > 0 && (
              <Badge className="absolute -top-2 -right-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full p-0 px-[4px] text-[10px]">
                <Text size="xs_10" className="leading-[1.3] text-white">
                  {activeFilterCount}
                </Text>
              </Badge>
            )}
          </button>
        </div>
        {packagesData.length > 0 &&
          packagesData.map((p) => (
            <PackageCard key={p.id} {...p} truncateName={false} />
          ))}
      </div>
      <ModalFilterPackage
        open={open}
        onOpenChange={setOpen}
        appliedFilter={appliedFilter}
        onApply={applyFiltersToUrl}
      />
    </>
  )
}
