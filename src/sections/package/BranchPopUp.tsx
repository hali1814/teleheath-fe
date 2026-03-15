import Text from '#/components/text'
import { Icon } from '#/components/icon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { useState } from 'react'
import { Button } from '#/components/ui/button'

const BranchItem = () => {
  return (
    <div className="flex flex-col gap-[10px] rounded-[12px] bg-white px-[16px] py-[20px] border border-[#F2F2F2]">
      <Text>Tam Anh Hospital, Ho Chi Minh City</Text>
      <div className="flex items-start gap-[8px]">
        <Icon
          name="map_marker_outline"
          className="w-[28px] h-[16px] text-dust-red-8"
        />
        <Text
          size="sm_12"
          className="font-normal leading-[1.3] text-muted-foreground"
        >
          2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City,
          Vietnam
        </Text>
      </div>
    </div>
  )
}

export default function BranchPopUp() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="flex items-center gap-[16px] rounded-[12px] bg-white p-[16px]"
        onClick={() => setOpen(true)}
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
          <Icon name="hospital" className="w-[20px] h-[20px] text-primary" />
        </div>
        <div>
          <Text className="font-medium leading-normal">Tam Anh Hospital</Text>
          <div className="flex items-center gap-[4px]">
            <Icon name="eye_outline" className="w-[16px] h-[16px]" />
            <Text className="font-medium leading-[1.3] text-muted-foreground">
              3 branch
            </Text>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className="gap-[20px] px-[20px] py-[24px] bg-white"
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="hidden">
                <DialogTitle></DialogTitle>
              </div>
              <Text size="lg_16" className="font-semibold leading-[1.2]">
                Tam Anh Hospital
              </Text>
              <Icon
                name="close"
                className="w-[14px] h-[14px]"
                color="#B3B3B3"
                onClick={() => setOpen(false)}
              />
            </div>
          </DialogHeader>
          {Array.from({ length: 3 }).map((_, index) => (
            <BranchItem key={index} />
          ))}
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[45px] bg-primary rounded-[40px] gap-[10px]"
              onClick={() => setOpen(false)}
            >
              <Text className="leading-normal font-medium text-white">
                Close
              </Text>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
