import {
  PackageInformation,
  BranchPopUp,
  WhatIsIncluded,
} from '#/sections/package'
import Image from '#/components/image'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'
import { useGetPackageDetailQuery } from '#/services/query/package/package-detail'

export const Route = createFileRoute('/app/package/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['common'])
  const { id } = useParams({ from: '/app/package/(commonLayout)/$id' })

  const { data: { data: packageData } = { data: null } } =
    useGetPackageDetailQuery({
      params: {
        packageId: id,
      },
    })

  const branches = packageData?.hospitals

  return (
    <>
      <Image
        src={packageData?.imageUrl}
        alt="package-detail"
        className="w-full h-[360px]"
      />
      <div className="flex flex-col gap-[16px] p-[16px]">
        <PackageInformation {...packageData} location="Vietnam" />
        <BranchPopUp
          name={packageData?.name ?? ''}
          branchCount={branches?.length ?? 0}
          branches={branches ?? []}
        />
        {packageData?.inclusions && packageData?.inclusions?.length > 0 && (
          <WhatIsIncluded includedItems={packageData.inclusions} />
        )}
        <Button
          className="w-full h-[45px] bg-primary gap-[10px] rounded-[40px] mt-[50px] mb-[20px]"
          asChild
        >
          <Link
            to="/app/book-appointment/package/$packageId"
            params={{ packageId: id }}
          >
            <Icon
              name="book_appointment"
              className="w-[20px] h-[20px] text-white"
            />
            <Text className="leading-normal font-medium text-white">
              {t('actions.bookAppointment')}
            </Text>
          </Link>
        </Button>
      </div>
    </>
  )
}
