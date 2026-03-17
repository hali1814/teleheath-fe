import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import InputSelect from '#/components/input/InputSelect'
import { Button } from '#/components/ui/button'

export default function ModalFilterPackage({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              Filter
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px]"
              color="#B3B3B3"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[8px]">
            <Text>Country</Text>
            <InputSelect
              placeholder="Country"
              options={[
                { label: 'Vietnam', value: 'vietnam' },
                { label: 'Cambodia', value: 'cambodia' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>Hospital</Text>
            <InputSelect
              placeholder="Hospital"
              options={[
                { label: 'Hospital 1', value: 'hospital-1' },
                { label: 'Hospital 2', value: 'hospital-2' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>Price Range</Text>
            <InputSelect
              placeholder="Price Range"
              options={[
                { label: 'Under 100$', value: '0-100' },
                { label: '100 - 300$', value: '100-300' },
                { label: '300 - 500$', value: '300-500' },
                { label: 'Above 500$', value: '500' },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-[8px] pt-[10px]">
          <Button variant="ghost" className="p-0">
            <Text className="text-[#A8071A] leading-normal font-medium">
              Clear all filters
            </Text>
          </Button>
          <Button className="h-[45px] px-[32px] py-[12px] rounded-[40px]">
            <Text className="leading-normal font-medium text-white">Apply</Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
