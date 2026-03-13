import { Button } from './ui/button'
import PackageCard from './PackageCard'

export default function PackageList() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-medium">Specialized Packages</h2>
        <Button variant="link" size="sm">
          View all
        </Button>
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        <PackageCard
          className="w-[192px]"
          name="Package Name"
          location="Location"
          price={170.0}
          thumbnail="/thumbnail.png"
        />
        <PackageCard
          className="w-[192px]"
          name="Package Name"
          location="Location"
          price={170.0}
          thumbnail="/thumbnail.png"
        />
        <PackageCard
          className="w-[192px]"
          name="Package Name"
          location="Location"
          price={170.0}
          thumbnail="/thumbnail.png"
        />
      </div>
    </div>
  )
}
