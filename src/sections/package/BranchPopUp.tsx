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
import { useTranslation } from 'react-i18next'

const BranchItem = ({ name, address }: { name: string; address: string }) => {
  return (
    <div className="flex flex-col gap-[10px] rounded-[12px] bg-white px-[16px] py-[20px] border border-[#F2F2F2]">
      <Text>{name}</Text>
      <div className="flex items-start gap-[8px]">
        <Icon
          name="map_marker_outline"
          className="w-[16px] h-[16px] text-dust-red-8"
        />
        <Text
          size="sm_12"
          className="flex-1 font-normal leading-[1.3] text-muted-foreground"
        >
          {address}
        </Text>
      </div>
    </div>
  )
}

export default function BranchPopUp({
  name,
  branchCount,
  branches,
}: {
  name: string
  branchCount: number
  branches: {
    id: number
    name: string
    address: string
  }[]
}) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['package', 'common'])

  if (branchCount === 0) {
    return null
  }

  return (
    <>
      <div
        className="flex items-center gap-[16px] rounded-[12px] bg-white p-[16px]"
        onClick={() => (branchCount > 0 ? setOpen(true) : undefined)}
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
          <Icon name="hospital" className="w-[20px] h-[20px] text-primary" />
        </div>
        <div className="flex-1 flex flex-col gap-[6px]">
          <Text className="font-medium leading-normal">{name}</Text>
          <div className="flex items-center gap-[4px]">
            <Icon name="eye_outline" className="w-[16px] h-[16px]" />
            <Text className="font-medium leading-[1.3] text-muted-foreground">
              {branchCount} {t('branch')}
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
                {name}
              </Text>
              <Icon
                name="close"
                className="w-[14px] h-[14px]"
                color="#B3B3B3"
                onClick={() => setOpen(false)}
              />
            </div>
          </DialogHeader>
          {branches.map((branch) => (
            <BranchItem
              key={branch.id}
              name={branch.name}
              address={branch.address}
            />
          ))}
          <div className="flex justify-end">
            <Button
              className="w-[120px] h-[45px] bg-primary rounded-[40px] gap-[10px]"
              onClick={() => setOpen(false)}
            >
              <Text className="leading-normal font-medium text-white">
                {t('common:actions.close')}
              </Text>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
