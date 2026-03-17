import { PackageInformation, BranchPopUp } from '#/sections/package'
import Image from '#/components/image'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/package/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Image
        src="/thumbnail.png"
        alt="package-detail"
        className="w-full h-[360px]"
      />
      <div className="flex flex-col gap-[16px] p-[16px]">
        <PackageInformation />
        <BranchPopUp />
      </div>
    </>
  )
}
