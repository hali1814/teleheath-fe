import SearchBar from '#/components/SearchBar'
import useDebounce from '#/hooks/use-debounce'
import { Header } from '#/sections/home'
import SpecialtyItem from '#/sections/specialty/SpecialtyItem'
import { useGetListSpecialtyQuery } from '#/services/query/hospital/list-specialty'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/app/specialty/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const { data } = useGetListSpecialtyQuery({
    params: {
      keyword: debouncedQuery,
    },
  })
  const specialties = data?.data ?? []

  const handleClick = (id: number) => {
    navigate({
      to: '/app/specialty/$specialtyId',
      params: { specialtyId: id.toString() },
    })
  }

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
        <div className="grid grid-cols-3 mt-[10px]">
          {specialties.length > 0 &&
            specialties.map((specialty) => (
              <SpecialtyItem
                key={specialty.id}
                {...specialty}
                onClick={() => handleClick(specialty.id)}
              />
            ))}
        </div>
      </div>
    </>
  )
}
