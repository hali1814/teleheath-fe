import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function EmptyPatientProfiles() {
  const { t } = useTranslation('profile')
  return (
    <div className="pb-[32px]">
      <div className="mt-[32px] flex flex-col items-center">
        <div className="relative size-[90px]">
          <Icon name="medical_profile_search" className="size-[90px]" />

          <div className="absolute right-0 bottom-1 flex size-[28px] items-center justify-center rounded-full border-2 border-white bg-primary">
            <Icon name="profile_search" className="size-[12px]" color="white" />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-[4px]">
          <div className="h-[5px] w-[49px] rounded-full bg-[#D3313133]" />
          <div className="h-[5px] w-[17px] rounded-full bg-[#D3313133]" />
        </div>
      </div>

      <Text
        size="lg_16"
        className="font-semibold text-text-primary text-center mt-6"
      >
        {t('emptyMedicalProfilesTitle')}
      </Text>

      <div className="mt-2 flex items-center justify-center">
        <Text
          size="base_14"
          className="mt-2  text-text-tertiary font-normal leading-[21px] text-center w-[300px]"
        >
          Add your profile or a family member to start booking appointments.
        </Text>
      </div>

      <div className="mt-[32px] flex items-center justify-center">
        <Button className="h-[44px] w-[200px] flex items-center justify-center gap-[8px] rounded-[12px]">
          <Text className="font-medium text-white leading-normal">
            Add Profile
          </Text>
        </Button>
      </div>
    </div>
  )
}
