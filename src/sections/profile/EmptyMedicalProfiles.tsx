import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import CardNavigate from '#/sections/common/CardNavigate'

export default function EmptyMedicalProfiles() {
  const { t } = useTranslation('profile')
  return (
    <div className="pb-24">
      <div className="mt-12 flex flex-col items-center">
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
          {t('emptyMedicalProfilesDescription')}
        </Text>
      </div>

      <div className="mt-10 flex w-full flex-col gap-2 px-4">
        <CardNavigate
          title={t('emptyMedicalProfilesManageFamilyTitle')}
          subtitle={t('emptyMedicalProfilesManageFamilySubtitle')}
          icon="family"
          className="w-full bg-[#FDEDED]"
          onClick={() => console.log('Manage your family')}
          hideArrow
        />

        <CardNavigate
          title={t('emptyMedicalProfilesFasterBookingTitle')}
          subtitle={t('emptyMedicalProfilesFasterBookingSubtitle')}
          icon="express"
          className="w-full bg-[#FDEDED]"
          hideArrow
          onClick={() => console.log('Faster booking')}
        />
      </div>
    </div>
  )
}
