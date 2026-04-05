import Header from '#/sections/home/Header'
import { createFileRoute, Outlet, useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/profile/(editLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  const search = useSearch({ strict: false })

  const title = useMemo(() => {
    if (search?.isUserProfile && !search?.idMember) {
      return t('profileInformation')
    }
    if (!search?.isUserProfile && !search?.idMember) {
      return t('patientProfile')
    }
    if (search?.idMember) {
      return t('editPatientProfile')
    }
  }, [search, t])

  return (
    <div>
      <Header title={title} />
      <Outlet />
    </div>
  )
}
