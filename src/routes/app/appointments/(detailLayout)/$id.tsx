import AppointmentDoctorDetail from '#/sections/appointment/AppointmentDoctorDetail'
import AppointmentHospitalDetail from '#/sections/appointment/AppointmentHospitalDetail'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/appointments/(detailLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['appointment', 'profile'])

  return (
    <div className="p-4 pb-20">
      {/* <AppointmentDoctorDetail /> */}
      <AppointmentHospitalDetail />
    </div>
  )
}
