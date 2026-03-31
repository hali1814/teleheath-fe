import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'
import { useGetListFamilyQuery } from '#/services/query/profile/listFamily'
import { useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { keepPreviousData } from '@tanstack/react-query'
import LoadingState from '#/components/LoadingState'

export function PatientStep() {
  const { patientProfile, setData } = useBookingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const {
    data: { data: { patients } } = { data: { patients: [] } },
    isLoading,
  } = useGetListFamilyQuery({
    params: {
      name: debouncedSearchQuery,
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-[16px] ">
      <div className="px-[16px]">
        <SearchBar
          placeholder="Search patient profile"
          value={searchQuery}
          onSearch={(value) => setSearchQuery(value)}
          onClear={() => setSearchQuery('')}
        />
      </div>
      {isLoading ? (
        <LoadingState className="h-[200px]" />
      ) : (
        <>
          <PatientProfileList
            profiles={patients}
            selected={patientProfile?.id}
            onClick={(patient) =>
              setData({
                patientProfile: patient,
              })
            }
          />
        </>
      )}
      <MedicalRecords />
    </div>
  )
}
