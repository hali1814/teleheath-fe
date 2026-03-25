import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'
import { useGetListFamilyQuery } from '#/services/query/profile/listFamily'

export function PatientStep() {
  const { patientProfile, setData } = useBookingStore()

  const { data: { data: { patients } } = { data: { patients: [] } } } =
    useGetListFamilyQuery({
      params: {},
    })

  return (
    <div className="flex flex-col gap-[16px] ">
      <div className="px-[16px]">
        <SearchBar placeholder="Search patient profile" />
      </div>
      <PatientProfileList
        profiles={patients}
        selected={patientProfile?.id}
        onClick={(patient) =>
          setData({
            patientProfile: patient,
          })
        }
      />
      <MedicalRecords />
    </div>
  )
}
