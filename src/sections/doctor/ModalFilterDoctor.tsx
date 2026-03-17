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

export default function ModalFilterDoctor({
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
        className="gap-[20px] px-[20px] py-[24px] bg-white max-h-[80vh] overflow-y-auto no-scrollbar"
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
            <Text>Specialty</Text>
            <InputSelect
              placeholder="Specialty"
              options={[
                { label: 'Specialty 1', value: 'specialty-1' },
                { label: 'Specialty 2', value: 'specialty-2' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>Gender</Text>
            <InputSelect
              placeholder="Gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>Experience Years</Text>
            <InputSelect
              placeholder="Experience Years"
              options={[
                { label: 'Under 5 years', value: 'under-5' },
                { label: '5 - 10 years', value: '5-10' },
                { label: '10 - 15 years', value: '10-15' },
                { label: 'Over 20 years', value: 'over-20' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>Consultation Type</Text>
            <InputSelect
              placeholder="Consultation Type"
              options={[
                { label: 'In-person', value: 'in-person' },
                { label: 'Online consultation', value: 'online' },
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
