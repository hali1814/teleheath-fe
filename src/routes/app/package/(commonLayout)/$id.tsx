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
import { Header } from '#/sections/home'

export const Route = createFileRoute('/app/package/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['common'])
  const { id } = useParams({ from: '/app/package/(commonLayout)/$id' })

  const { data: { data: packageData } = { data: null } } =
    useGetPackageDetailQuery({
      params: {
        packageId: parseInt(id),
      },
    })

  const branches = packageData?.hospital?.branches

  return (
    <>
      <Header title="Package Details" />
      <Image
        src={packageData?.imageUrl ?? ''}
        alt={packageData?.name ?? ''}
        className="size-[361px] mx-auto"
      />
      <div className="flex flex-col gap-[16px] p-[16px] pb-[130px]">
        <PackageInformation
          name={packageData?.name ?? ''}
          price={packageData?.price ?? 0}
          description={packageData?.description ?? ''}
          countries={packageData?.countries ?? []}
        />
        <BranchPopUp
          name={packageData?.hospital?.name ?? ''}
          branchCount={branches?.length ?? 0}
          branches={branches ?? []}
        />
        {packageData?.checkupTypes && packageData?.checkupTypes?.length > 0 && (
          <WhatIsIncluded checkupTypes={packageData.checkupTypes} />
        )}
        <div className="fixed bottom-0 left-0 right-0 px-[20px] pt-[10px] pb-[35px] bg-background">
          <Button
            className="w-full h-[45px] bg-primary gap-[10px] rounded-[40px]"
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
      </div>
    </>
  )
}
