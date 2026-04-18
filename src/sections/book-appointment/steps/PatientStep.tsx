import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'
import { useGetListFamilyQuery } from '#/services/query/profile/listFamily'
import { useEffect, useState } from 'react'
import useDebounce from '#/hooks/use-debounce'
import { keepPreviousData } from '@tanstack/react-query'
import LoadingState from '#/components/LoadingState'
import { useTranslation } from 'react-i18next'

export function PatientStep() {
  const { t } = useTranslation(['book-appointment'])
  const { patientProfile, setData } = useBookingStore()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const {
    data: {
      data: { patients, canAddMore, maxAllowed },
    } = {
      data: { patients: [], canAddMore: true, maxAllowed: 10 },
    },
    isLoading,
  } = useGetListFamilyQuery({
    params: {
      name: debouncedSearchQuery,
    },
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    // Chỉ auto-select ở danh sách mặc định (không search) và khi chưa chọn profile nào.
    if (searchQuery.trim() !== '' || patientProfile?.id) return

    const selfProfile = patients.find(
      (patient) => patient.relationship?.toUpperCase() === 'SELF',
    )
    if (selfProfile) {
      setData({ patientProfile: selfProfile })
    }
  }, [patients, patientProfile?.id, searchQuery, setData])

  return (
    <div className="flex flex-col gap-[16px] ">
      <div className="px-[16px]">
        <SearchBar
          placeholder={t('patientStep.searchPlaceholder')}
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
            canAddMore={canAddMore}
            maxAllowed={maxAllowed}
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
