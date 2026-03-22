import { Icon } from '#/components/icon'
import Text from '#/components/text'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { ProfileForm, type ProfileFormValues } from './ProfileForm'

export default function ProfileFormModal({
  defaultValues,
  open,
  onOpenChange,
}: {
  defaultValues?: ProfileFormValues
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const handleSubmit = (data: any) => {
    console.log(data)
  }

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
              Add New Patient Profile
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px]"
              color="#B3B3B3"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </DialogHeader>
        <ProfileForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
