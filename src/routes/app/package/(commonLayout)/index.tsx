import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { PackageCard } from '#/sections/package'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useRef, useState } from 'react'
import ModalFilterPackage from '#/sections/package/ModalFilterPackage'
import { useTranslation } from 'react-i18next'
import { useGetListPackagesInfiniteQuery } from '#/services/query/package/list-packages'
import { Header } from '#/sections/home'
import { z } from 'zod'
import Text from '#/components/text'
import {
  minMaxToPriceRangeKey,
  priceRangeKeyToMinMax,
} from '#/sections/package/package-filter-price'
import useDebounce from '#/hooks/use-debounce'
import { useInfiniteScroll } from '#/hooks/use-infinite-scroll'
import { EmptyState } from '#/sections/search'
import type { Package } from '#/entities/packageEntity'
import PullToRefresh from '#/components/PullToRefresh'
import LoadingState from '#/components/LoadingState'

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
    category: z.string().optional(),
    specialtyId: z.unknown().optional(),
    minPrice: z.unknown().optional(),
    maxPrice: z.unknown().optional(),
  })
  .transform((s) => ({
    country: s.country?.trim() || undefined,
    hospitalId: s.hospitalId?.trim() || undefined,
    category: s.category?.trim() || undefined,
    specialtyId: parseSearchInt(s.specialtyId),
    minPrice: parseSearchInt(s.minPrice),
    maxPrice: parseSearchInt(s.maxPrice),
  }))

export type PackageSearch = z.infer<typeof packageSearchSchema>

export interface FilterPackage {
  country: string
  hospitalId: string
  category: string
  /** key preset khoảng giá (vd. `0-100`, `500`) — Apply → min/max URL */
  priceRange: string
  specialtyId?: number
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
    category: s.category ?? '',
    priceRange: minMaxToPriceRangeKey(s.minPrice, s.maxPrice),
    specialtyId: s.specialtyId,
  }
}

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['package', 'search'])
  const navigate = useNavigate()
  const search = Route.useSearch()
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const appliedFilter = searchToFilter(search)

  const {
    data: packagesResponse,
    refetch,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetListPackagesInfiniteQuery({
    params: {
      size: 10,
      keyword: debouncedKeyword,
      ...(search.country ? { country: search.country } : {}),
      ...(search.hospitalId ? { hospitalId: search.hospitalId } : {}),
      ...(search.category
        ? { category: search.category as 'GENERAL' | 'SPECIALIZE' }
        : {}),
      ...(search.specialtyId != null
        ? { specialtyId: search.specialtyId }
        : {}),
      ...(search.minPrice !== undefined ? { minPrice: search.minPrice } : {}),
      ...(search.maxPrice !== undefined ? { maxPrice: search.maxPrice } : {}),
    },
  })

  const packagesData = useMemo(
    () =>
      packagesResponse?.pages.flatMap((page) => page?.data?.content ?? []) ?? [],
    [packagesResponse?.pages],
  )

  const loaderRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    targetRef: loaderRef,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const hasPriceFilter =
    search.minPrice !== undefined || search.maxPrice !== undefined

  const activeFilterCount = [
    appliedFilter.country,
    appliedFilter.hospitalId,
    appliedFilter.category,
    appliedFilter.specialtyId != null ? 'specialty' : '',
    hasPriceFilter ? 'price' : '',
  ].filter(Boolean).length

  const applyFiltersToUrl = (filter: FilterPackage) => {
    const { minPrice, maxPrice } = priceRangeKeyToMinMax(filter.priceRange)
    navigate({
      to: '/app/package',
      search: {
        country: filter.country || undefined,
        hospitalId: filter.hospitalId || undefined,
        category: filter.category || undefined,
        specialtyId: filter.specialtyId,
        minPrice,
        maxPrice,
      },
      replace: true,
    })
  }

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <>
      <PullToRefresh onRefresh={handleRefresh}>
        <Header title={t('title')} />
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
              <Badge className="absolute -top-2 -right-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full p-0 px-[4px] text-[10px]">
                <Text size="xs_10" className="leading-[1.3] text-white">
                  {activeFilterCount}
                </Text>
              </Badge>
            </button>
          </div>
          {isPending ? (
            <LoadingState />
          ) : packagesData.length > 0 ? (
            <>
              {packagesData.map((p: Package) => (
                <PackageCard key={p.packageId} {...p} truncateName={false} />
              ))}
              {hasNextPage ? (
                <div
                  ref={loaderRef}
                  className="flex items-center justify-center py-4"
                >
                  {isFetchingNextPage ? (
                    <span className="size-5 animate-spin rounded-full border-2 border-[#FFE8E6] border-t-[#A8071A]" />
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <EmptyState>{t('search:empty.packages')}</EmptyState>
          )}
        </div>
      </PullToRefresh>
      <ModalFilterPackage
        open={open}
        onOpenChange={setOpen}
        appliedFilter={appliedFilter}
        onApply={applyFiltersToUrl}
      />
    </>
  )
}
