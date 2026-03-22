import SearchBar from '#/components/SearchBar'
import { useBookingStore } from '#/stores/booking-store'
import { PatientProfileList } from '../PatientProfileList'
import { MedicalRecords } from '../MedicalRecords'

export function PatientStep() {
  const { patient, setData } = useBookingStore()

  return (
    <div className="flex flex-col gap-[16px]">
      <SearchBar placeholder="Search patient profile" />
      <PatientProfileList
        selected={patient}
        onClick={(patientID) => setData({ patient: patientID })}
      />
      <MedicalRecords />
    </div>
  )
}
