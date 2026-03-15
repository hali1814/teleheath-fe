import HospitalDetailHeader from '#/sections/hospital/HospitalDetailHeader'
import AboutHospital from '#/sections/hospital/AboutHospital'
import GalleryImage from '#/sections/hospital/GalleryImage'
import { createFileRoute } from '@tanstack/react-router'
import SpecialtyList from '#/sections/hospital/SpecialtyList'
import BranchList from '#/sections/hospital/BranchList'

export const Route = createFileRoute('/app/hospital/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <HospitalDetailHeader />
      <div className="flex flex-col gap-[16px] p-[16px]">
        <GalleryImage />
        <AboutHospital />
        <SpecialtyList />
        <BranchList />
      </div>
    </>
  )
}
