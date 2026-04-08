import SearchBar from '#/components/SearchBar'
import useDebounce from '#/hooks/use-debounce'
import { Header } from '#/sections/home'
import { EmptyState } from '#/sections/search'
import SpecialtyItem from '#/sections/specialty/SpecialtyItem'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { keepPreviousData } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/app/specialty/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const { data } = useGetListSpecialtyQuery({
    params: {
      keyword: debouncedQuery,
    },
    placeholderData: keepPreviousData,
  })
  const specialties = data?.data ?? []

  return (
    <>
      <Header title="Specialties" />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[35px]">
        <SearchBar
          placeholder="Search for specialties"
          value={query}
          onSearch={(value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        {specialties.length > 0 ? (
          <div className="grid grid-cols-3 mt-[10px] gap-y-[36px]">
            {specialties.map((specialty) => (
              <SpecialtyItem key={specialty.specialtyId} {...specialty} />
            ))}
          </div>
        ) : (
          <EmptyState>No specialties found.</EmptyState>
        )}
      </div>
    </>
  )
}
