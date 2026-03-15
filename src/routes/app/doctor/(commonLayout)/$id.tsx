import DoctorInformation from '#/sections/doctor/DoctorInformation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/doctor/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <DoctorInformation />
    </div>
  )
}
