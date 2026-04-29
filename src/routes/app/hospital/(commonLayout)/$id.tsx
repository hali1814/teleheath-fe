import { Icon } from '#/components/icon'
import PullToRefresh from '#/components/PullToRefresh'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Header } from '#/sections/home'
import {
  HospitalDetailHeader,
  GalleryImage,
  AboutHospital,
  SpecialtyList,
  BranchList,
} from '#/sections/hospital'
import { useGetHospitalDetailQuery } from '#/services/query/hospital/hospital-detail'
import { useProfileStore } from '#/stores/profile'
import { goBackToAppMobile } from '#/utils/auth'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/hospital/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['hospital', 'common'])
  const { id } = useParams({ from: '/app/hospital/(commonLayout)/$id' })
  const profile = useProfileStore((s) => s.profile)
  const navigate = useNavigate()
  const { data: { data: hospitalData } = { data: null }, refetch } =
    useGetHospitalDetailQuery({
      params: {
        hospitalId: id,
      },
    })

  if (!hospitalData) return null

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={t('hospital:detailTitle')} />
      <div className="pb-[100px]">
        <HospitalDetailHeader hospital={hospitalData} />
        <div className="flex flex-col gap-[16px] p-[16px]">
          {hospitalData?.gallery && hospitalData?.gallery?.length > 0 && (
            <GalleryImage images={hospitalData?.gallery?.slice(0, 10) ?? []} />
          )}
          {hospitalData?.about && (
            <AboutHospital aboutUs={hospitalData?.about} />
          )}
          {hospitalData?.specialties &&
            hospitalData?.specialties?.length > 0 && (
              <SpecialtyList specialties={hospitalData?.specialties ?? []} />
            )}
          <BranchList hospitalId={id} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 pt-[10px] pb-[35px] px-[20px] bg-background">
          <Button
            className="w-full h-[45px] bg-primary rounded-[40px] gap-[10px]"
            onClick={() => {
              if (!profile?.id) {
                goBackToAppMobile()
                return
              }
              navigate({
                to: '/app/book-appointment/hospital/$hospitalId',
                params: { hospitalId: id },
              })
            }}
          >
            <Icon
              name="book_appointment"
              color="white"
              className="w-[20px] h-[20px]"
            />
            <Text className="font-medium leading-normal text-white">
              {t('common:actions.bookAppointment')}
            </Text>
          </Button>
        </div>
      </div>
    </PullToRefresh>
  )
}
