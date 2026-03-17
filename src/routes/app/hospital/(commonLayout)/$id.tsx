import {
  HospitalDetailHeader,
  GalleryImage,
  AboutHospital,
  SpecialtyList,
  BranchList,
} from '#/sections/hospital'
import { createFileRoute } from '@tanstack/react-router'

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
