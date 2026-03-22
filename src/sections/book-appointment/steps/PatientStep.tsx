import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'
import { useGetListFamilyQuery } from '#/services/query/profile/list-family'

export function PatientStep() {
  const { patientProfileId, setData } = useBookingStore()

  const { data: { data: family } = { data: [] } } = useGetListFamilyQuery({
    params: {},
  })

  return (
    <div className="flex flex-col gap-[16px]">
      <SearchBar placeholder="Search patient profile" />
      <PatientProfileList
        profiles={family}
        selected={patientProfileId}
        onClick={(profile) =>
          setData({
            patientProfileId: profile.id,
          })
        }
      />
      <MedicalRecords />
    </div>
  )
}
