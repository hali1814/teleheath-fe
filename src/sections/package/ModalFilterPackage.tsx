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
import { useTranslation } from 'react-i18next'

export default function ModalFilterPackage({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useTranslation(['package', 'common'])
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
              {t('filter.title')}
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
            <Text>{t('filter.country')}</Text>
            <InputSelect
              placeholder={t('filter.country')}
              options={[
                { label: 'Vietnam', value: 'vietnam' },
                { label: 'Cambodia', value: 'cambodia' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.hospital')}</Text>
            <InputSelect
              placeholder={t('filter.hospital')}
              options={[
                { label: 'Hospital 1', value: 'hospital-1' },
                { label: 'Hospital 2', value: 'hospital-2' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Text>{t('filter.priceRange')}</Text>
            <InputSelect
              placeholder={t('filter.priceRange')}
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
              {t('common:actions.clearAllFilters')}
            </Text>
          </Button>
          <Button className="h-[45px] px-[32px] py-[12px] rounded-[40px]">
            <Text className="leading-normal font-medium text-white">
              {t('common:actions.apply')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
