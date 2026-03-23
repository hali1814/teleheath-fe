import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { Badge } from '#/components/ui/badge'
import { ALL_PAGINATION } from '#/const/pagination'
import { DoctorCard, ModalFilterDoctor } from '#/sections/doctor'
import { useGetListDoctorQuery } from '#/services/query/doctor/list-doctor'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/doctor/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation(['doctor', 'common'])

  const {
    data: { data: { content: doctorsData = [] } = { content: [] } } = {
      data: { content: [] },
    },
  } = useGetListDoctorQuery({
    params: ALL_PAGINATION,
  })

  return (
    <>
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex items-center gap-[10px]">
          <SearchBar placeholder={t('searchPlaceholder')} />
          <div className="relative" onClick={() => setOpen(true)}>
            <Icon name="filter" className="text-icon" />
            <Badge className="w-[16px] h-[16px] rounded-full absolute -top-2 -right-2 p-0">
              0
            </Badge>
          </div>
        </div>
        {doctorsData.length > 0 &&
          doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              {...doctor}
              variant="horizontal"
              location="Vietnam"
            />
          ))}
      </div>
      <ModalFilterDoctor open={open} onOpenChange={setOpen} />
    </>
  )
}
