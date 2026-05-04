import { Header } from '#/sections/home'
import FormProfile from '#/sections/profile/FormProfile'
import { useProfileEditLayoutTitleStore } from '#/stores/profile-edit-layout-title'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

/** Optional query: `/edit` hoặc `/edit?idMember=1` */
const editSearchSchema = z.object({
  idMember: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === undefined || v === '') return undefined
      const n = typeof v === 'number' ? v : Number(v)
      return Number.isFinite(n) ? n : undefined
    }),
  isUserProfile: z.boolean().optional().default(false),
})

export type EditSearch = z.infer<typeof editSearchSchema>

export const Route = createFileRoute('/app/profile/(editLayout)/edit')({
  validateSearch: (search): EditSearch => editSearchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const { idMember, isUserProfile } = Route.useSearch()
  const { t } = useTranslation(['profile'])
  const layoutTitle = useProfileEditLayoutTitleStore((s) => s.title)
  const setLayoutTitle = useProfileEditLayoutTitleStore((s) => s.setTitle)

  const fallbackTitle = isUserProfile
    ? t('profileInformation')
    : idMember
      ? t('patientProfile')
      : t('addPatientProfile')

  useEffect(() => {
    setLayoutTitle(fallbackTitle)
  }, [fallbackTitle, setLayoutTitle])

  return (
    <>
      <Header title={layoutTitle || fallbackTitle} />

      <FormProfile idMember={idMember} isUserProfile={isUserProfile} />
    </>
  )
}
