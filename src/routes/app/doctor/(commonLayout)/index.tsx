import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { ALL_PAGINATION } from '#/const/pagination'
import useDebounce from '#/hooks/use-debounce'
import { DoctorCard, ModalFilterDoctor } from '#/sections/doctor'
import { Header } from '#/sections/home'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import { keepPreviousData } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import Text from '#/components/text'
import {
  experienceKeyToMinMax,
  experienceMinMaxToKey,
} from '#/sections/doctor/doctor-filter-experience'
import {
  minMaxToPriceRangeKey,
  priceRangeKeyToMinMax,
} from '#/sections/package/package-filter-price'
import { EmptyState } from '#/sections/search'

const optionalTrim = (s: string | undefined) => s?.trim() || undefined

function parseSearchNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === '') return undefined
  const n = typeof v === 'number' ? v : Number(String(v).trim())
  return Number.isFinite(n) ? n : undefined
}

/**
 * URL khớp tham số API: specialty (number), min/max experience & price.
 * Modal vẫn dùng FilterDoctor (string keys cho select).
 */
const doctorSearchSchema = z
  .object({
    country: z.string().optional(),
    specialty: z.unknown().optional(),
    gender: z.string().optional(),
    consultationType: z.string().optional(),
    minExperience: z.unknown().optional(),
    maxExperience: z.unknown().optional(),
    minPrice: z.unknown().optional(),
    maxPrice: z.unknown().optional(),
  })
  .transform((s) => ({
    country: optionalTrim(s.country),
    specialty: parseSearchNumber(s.specialty),
    gender: optionalTrim(s.gender),
    consultationType: optionalTrim(s.consultationType),
    minExperience: parseSearchNumber(s.minExperience),
    maxExperience: parseSearchNumber(s.maxExperience),
    minPrice: parseSearchNumber(s.minPrice),
    maxPrice: parseSearchNumber(s.maxPrice),
  }))

export type DoctorSearch = z.infer<typeof doctorSearchSchema>

export interface FilterDoctor {
  country: string
  specialty: string
  gender: string
  experienceYears: string
  consultationType: string
  priceRange: string
}

export const Route = createFileRoute('/app/doctor/(commonLayout)/')({
  validateSearch: (search: Record<string, unknown>): DoctorSearch =>
    doctorSearchSchema.parse(search ?? {}),
  component: RouteComponent,
})

function searchToFilter(s: DoctorSearch): FilterDoctor {
  return {
    country: s.country ?? '',
    specialty: s.specialty != null ? String(s.specialty) : '',
    gender: s.gender ?? '',
    experienceYears: experienceMinMaxToKey(s.minExperience, s.maxExperience),
    consultationType: s.consultationType ?? '',
    priceRange: minMaxToPriceRangeKey(s.minPrice, s.maxPrice),
  }
}

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['doctor', 'common'])
  const navigate = useNavigate()
  const search = Route.useSearch()

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const appliedFilter = searchToFilter(search)

  const {
    data: { data: { content: doctorsData = [] } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListDoctorQuery({
    params: {
      ...ALL_PAGINATION,
      keyword: debouncedKeyword || undefined,
      ...(search.country ? { country: search.country } : {}),
      ...(search.specialty != null ? { specialty: search.specialty } : {}),
      ...(search.gender ? { gender: search.gender } : {}),
      ...(search.consultationType
        ? { consultationType: search.consultationType }
        : {}),
      ...(search.minExperience != null
        ? { minExperience: search.minExperience }
        : {}),
      ...(search.maxExperience != null
        ? { maxExperience: search.maxExperience }
        : {}),
      ...(search.minPrice != null ? { minPrice: search.minPrice } : {}),
      ...(search.maxPrice != null ? { maxPrice: search.maxPrice } : {}),
    },
    placeholderData: keepPreviousData,
  })

  const activeFilterCount = [
    appliedFilter.country,
    appliedFilter.specialty,
    appliedFilter.gender,
    appliedFilter.experienceYears,
    appliedFilter.consultationType,
    appliedFilter.priceRange,
  ].filter(Boolean).length

  const applyFiltersToUrl = (filter: FilterDoctor) => {
    const { minPrice, maxPrice } = priceRangeKeyToMinMax(filter.priceRange)
    const { minExperience, maxExperience } = experienceKeyToMinMax(
      filter.experienceYears,
    )
    const specialtyNum = filter.specialty.trim()
      ? Number(filter.specialty)
      : undefined

    navigate({
      to: '/app/doctor',
      search: {
        country: filter.country || undefined,
        specialty:
          specialtyNum !== undefined && Number.isFinite(specialtyNum)
            ? specialtyNum
            : undefined,
        gender: filter.gender || undefined,
        consultationType: filter.consultationType || undefined,
        minExperience,
        maxExperience,
        minPrice,
        maxPrice,
      },
      replace: true,
    })
  }

  return (
    <>
      <Header title="Doctors" />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onSearch={setKeyword}
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
        {doctorsData.length > 0 ? (
          <>
            {doctorsData.map((doctor) => (
              <DoctorCard
                key={doctor.doctorId}
                variant="horizontal"
                {...doctor}
              />
            ))}
          </>
        ) : (
          <EmptyState>No doctors found</EmptyState>
        )}
      </div>
      <ModalFilterDoctor
        open={open}
        onOpenChange={setOpen}
        appliedFilter={appliedFilter}
        onApply={applyFiltersToUrl}
      />
    </>
  )
}
