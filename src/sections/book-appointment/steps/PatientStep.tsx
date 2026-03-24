import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'
import { useGetListFamilyQuery } from '#/services/query/profile/listFamily'

export function PatientStep() {
  const { patientProfile, setData } = useBookingStore()

  const { data: { data: family } = { data: [] } } = useGetListFamilyQuery({
    params: {},
  })

  return (
    <div className="flex flex-col gap-[16px]">
      <SearchBar placeholder="Search patient profile" />
      <PatientProfileList
        profiles={family}
        selected={patientProfile?.id}
        onClick={(profile) =>
          setData({
            patientProfile: profile,
          })
        }
      />
      <MedicalRecords />
    </div>
  )
}
