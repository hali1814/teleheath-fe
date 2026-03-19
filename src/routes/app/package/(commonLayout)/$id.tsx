import {
  PackageInformation,
  BranchPopUp,
  WhatIsIncluded,
} from '#/sections/package'
import Image from '#/components/image'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/package/(commonLayout)/$id')({
  component: RouteComponent,
})

const packageData = {
  name: 'General Check-up',
  price: 170.0,
  location: 'Vietnam',
  introduction:
    'Complete blood work, advanced diagnostic imaging, comprehensive heart screening with cardiologist review, liver and kidney function tests, and specialist consultation. A comprehensive medical checkup package designed to provide a detailed and thorough assessment of your health and overall well-being. This premium package features advanced screenings and dedicated support throughout your visit, ensuring a seamless and high-quality healthcare experience.',
  includedItems: [
    {
      title: 'Full Blood Count',
      description: 'Comprehensive laboratory analysis',
    },
    {
      title: 'ECG Monitoring',
      description: 'Resting electrocardiogram recording',
    },
    {
      title: 'Echocardiogram',
      description: 'Advanced ultrasound heart imaging',
    },
  ],
  hospitalName: 'Tam Anh Hospital',
  branches: [
    {
      name: 'Tam Anh Hospital',
      address:
        '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam',
    },
    {
      name: 'Tam Anh Hospital',
      address:
        '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam',
    },
    {
      name: 'Tam Anh Hospital',
      address:
        '2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam',
    },
  ],
}

function RouteComponent() {
  const { t } = useTranslation(['common'])

  return (
    <>
      <Image
        src="/thumbnail.png"
        alt="package-detail"
        className="w-full h-[360px]"
      />
      <div className="flex flex-col gap-[16px] p-[16px]">
        <PackageInformation {...packageData} />
        <BranchPopUp
          name={packageData.hospitalName}
          branchCount={packageData.branches.length}
          branches={packageData.branches}
        />
        <WhatIsIncluded includedItems={packageData.includedItems} />
        <Button className="w-full h-[45px] bg-primary gap-[10px] rounded-[40px] mt-[50px] mb-[20px]">
          <Icon
            name="book_appointment"
            className="w-[20px] h-[20px] text-white"
          />
          <Text className="leading-normal font-medium text-white">
            {t('actions.bookAppointment')}
          </Text>
        </Button>
      </div>
    </>
  )
}
