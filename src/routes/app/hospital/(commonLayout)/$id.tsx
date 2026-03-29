import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import i18n, { type AppLanguage } from '#/i18n'
import { Header } from '#/sections/home'
import {
  HospitalDetailHeader,
  GalleryImage,
  AboutHospital,
  SpecialtyList,
  BranchList,
} from '#/sections/hospital'
import { useGetHospitalDetailQuery } from '#/services/query/hospital/hospital-detail'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/hospital/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['common'])
  const { id } = useParams({ from: '/app/hospital/(commonLayout)/$id' })
  const { data: { data: hospitalData } = { data: null } } =
    useGetHospitalDetailQuery({
      params: {
        hospitalId: id,
      },
    })

  if (!hospitalData) return null

  const aboutUs = getLocalizedTextByLang(
    '',
    hospitalData?.aboutKh ?? '',
    hospitalData?.aboutEn ?? '',
    i18n.language as AppLanguage,
  )

  return (
    <>
      <Header title="Hospital Details" />
      <div className="pb-[100px]">
        <HospitalDetailHeader {...hospitalData} />
        <div className="flex flex-col gap-[16px] p-[16px]">
          {hospitalData?.gallery && hospitalData?.gallery?.length > 0 && (
            <GalleryImage images={hospitalData?.gallery ?? []} />
          )}
          {aboutUs && <AboutHospital aboutUs={aboutUs} />}
          {hospitalData?.specialties &&
            hospitalData?.specialties?.length > 0 && (
              <SpecialtyList specialties={hospitalData?.specialties ?? []} />
            )}
          <BranchList hospitalId={id} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 pt-[10px] pb-[35px] px-[20px] bg-background">
          <Button
            className="w-full h-[45px] bg-primary rounded-[40px] gap-[10px]"
            asChild
          >
            <Link
              to="/app/book-appointment/hospital/$hospitalId"
              params={{ hospitalId: id }}
            >
              <Icon
                name="book_appointment"
                color="white"
                className="w-[20px] h-[20px]"
              />
              <Text className="font-medium leading-normal text-white">
                {t('common:actions.bookAppointment')}
              </Text>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
