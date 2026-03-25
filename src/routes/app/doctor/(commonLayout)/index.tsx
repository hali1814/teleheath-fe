import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { ALL_PAGINATION } from '#/const/pagination'
import useDebounce from '#/hooks/use-debounce'
import { DoctorCard, ModalFilterDoctor } from '#/sections/doctor'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import { keepPreviousData } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/doctor/(commonLayout)/')({
  component: RouteComponent,
})

export interface FilterDoctor {
  country: string
  specialty: string
  gender: string
  experienceYears: string
  consultationType: string
  priceRange: string
}

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['doctor', 'common'])
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)
  const [filter, setFilter] = useState<FilterDoctor>({
    country: '',
    specialty: '',
    gender: '',
    experienceYears: '',
    consultationType: '',
    priceRange: '',
  })

  const {
    data: { data: { content: doctorsData = [] } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListDoctorQuery({
    params: {
      ...ALL_PAGINATION,
      keyword: debouncedKeyword,
      country: filter.country,
      specialty: filter.specialty,
      gender: filter.gender,
      experienceYears: filter.experienceYears,
      consultationType: filter.consultationType,
      priceRange: filter.priceRange,
    },
    placeholderData: keepPreviousData,
  })

  return (
    <>
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar
            placeholder={t('searchPlaceholder')}
            value={keyword}
            onSearch={setKeyword}
            onClear={() => setKeyword('')}
          />
          <div className="relative" onClick={() => setOpen(true)}>
            <Icon name="filter" className="text-icon" />
            <Badge className="w-[16px] h-[16px] rounded-full absolute -top-2 -right-2 p-0">
              0
            </Badge>
          </div>
        </div>
        {doctorsData.length > 0 &&
          doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.doctorId}
              variant="horizontal"
              {...doctor}
            />
          ))}
      </div>
      <ModalFilterDoctor
        open={open}
        onOpenChange={setOpen}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  )
}
