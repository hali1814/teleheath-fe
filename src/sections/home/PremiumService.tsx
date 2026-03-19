import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'

export default function PremiumService() {
  const { t } = useTranslation(['home'])

  const benefits = [
    t('premiumService.benefits.bookAppointments'),
    t('premiumService.benefits.doorToDoorTransport'),
    t('premiumService.benefits.supportStaff'),
  ]

  const benefitIcons = ['calendar', 'car_check', 'supporter']

  return (
    <div className="p-[20px] relative rounded-[16px] w-full bg-linear-to-r from-[#E1444E] to-[#F9B8A8]">
      <div className="relative flex flex-col justify-between gap-3">
        <Icon
          name="logo_premium_service"
          className="absolute top-0 right-0 w-[42px] h-[42px]"
          color="white"
        />

        <Badge
          variant="outline"
          className="self-start px-[10px] py-[4px] text-white bg-white/20 border-white/40 rounded-full"
        >
          <Text
            size="xs_10"
            className="font-semibold tracking-[0.48px] leading-none text-white uppercase"
          >
            {t('premiumService.tag')}
          </Text>
        </Badge>

        <div>
          <Text
            size="2xl_20"
            className="font-semibold leading-normal text-white"
          >
            {t('premiumService.title')}
          </Text>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white/25">
                <Icon name="check" className="w-[8px] h-[8px]" color="white" />
              </div>
              <Text
                size="sm_12"
                className="font-medium leading-[1.3] text-white/90"
              >
                {item}
              </Text>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button className="px-[12px] rounded-[6px] bg-white">
            <Text
              size="sm_12"
              className="font-semibold leading-none text-[#F5222D] uppercase"
            >
              {t('premiumService.bookNow')}
            </Text>
          </Button>

          <div className="flex items-center">
            {benefitIcons.map((icon, index) => (
              <span
                key={icon}
                className={cn(
                  'w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center',
                  {
                    '-ml-2': index > 0,
                  },
                )}
              >
                <Icon
                  name={icon as IconName}
                  color="white"
                  className="w-[10px] h-[10px]"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
