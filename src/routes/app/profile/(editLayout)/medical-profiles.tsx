import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import EmptyMedicalProfiles from '#/sections/profile/EmptyMedicalProfiles'
import ProfileItem from '#/sections/profile/ProfileItem'
import { useGetListFamilyQuery } from '#/services/query/profile/list-family'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { formatDate, DATE_TIME_TYPE } from '#/utils'

export const Route = createFileRoute(
  '/app/profile/(editLayout)/medical-profiles',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['profile', 'common'])
  const router = useRouter()
  const { data: familyList } = useGetListFamilyQuery({
    params: {},
  })

  const familyMembers = familyList?.data ?? []

  return (
    <div className="px-4 pb-20">
      {familyMembers.length === 0 ? (
        <EmptyMedicalProfiles />
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {familyMembers.map((member) => {
            const relationshipLabel = member.relationship

            return (
              <ProfileItem
                key={member.id}
                avatarSrc={member.avatarUrl ?? undefined}
                name={member.name}
                relationshipLabel={relationshipLabel}
                patientIdLabel={`PATIENT ID: #${member.patientCode ?? '--'}`}
                dateOfBirth={formatDate(
                  member.dateOfBirth,
                  DATE_TIME_TYPE.MMM_DD_YYYY,
                )}
                phone={member.phone}
              />
            )
          })}
        </div>
      )}

      {/* stricky save button */}
      <div className="fixed inset-x-4 bottom-4">
        <Button
          type="button"
          variant="secondary"
          className="flex h-[45px] w-full items-center justify-center gap-3 rounded-[40px]"
          onClick={() => {
            router.navigate({
              to: '/app/profile/edit',
              search: { idMember: undefined, addNew: true },
            })
          }}
        >
          <Icon name="add_profile" />
          <Text size="base_14" className="font-medium text-white">
            {t('emptyMedicalProfilesAddNewProfile')}
          </Text>
        </Button>
      </div>
    </div>
  )
}
