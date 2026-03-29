import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import type { ListFamilyPatient } from '#/services/query/profile/listFamily'
import FormProfile from './FormProfile'

export default function ProfileFormModal({
  defaultValues,
  open,
  onOpenChange,
}: {
  defaultValues?: ListFamilyPatient | null
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
              {defaultValues
                ? 'Edit Patient Profile'
                : 'Add New Patient Profile'}
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px]"
              color="#B3B3B3"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </DialogHeader>
        <FormProfile
          containerClassName="pb-0 px-0"
          isUserProfile={false}
          idMember={defaultValues?.id}
          customButton={(handleSaveProfile) => (
            <div className="flex justify-between items-center mt-[30px] gap-[20px]">
              <Button
                variant="secondary"
                className="h-[45px] flex-1 rounded-full bg-[#F2F2F2]"
                onClick={() => onOpenChange(false)}
              >
                <Text
                  size="base_14"
                  className="w-full text-center font-medium text-[#999999]"
                >
                  Close
                </Text>
              </Button>
              <Button
                variant="secondary"
                className="h-[45px] flex-1 rounded-full"
                onClick={handleSaveProfile}
              >
                <Text
                  size="base_14"
                  className="w-full flex items-center justify-center gap-[10px] font-medium text-white"
                >
                  {!defaultValues && (
                    <Icon
                      name="add_user"
                      className="w-[20px] h-[20px] text-white"
                    />
                  )}
                  {defaultValues ? 'Save' : 'Add Profile'}
                </Text>
              </Button>
            </div>
          )}
        />
      </DialogContent>
    </Dialog>
  )
}
