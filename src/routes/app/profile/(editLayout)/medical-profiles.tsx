import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import EmptyMedicalProfiles from '#/sections/profile/EmptyMedicalProfiles'
import ProfileItem from '#/sections/profile/ProfileItem'
import { useGetListFamilyQuery } from '#/services/query/profile/listFamily'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { formatDate, DATE_TIME_TYPE } from '#/utils'
import LoadingState from '#/components/LoadingState'

export const Route = createFileRoute(
  '/app/profile/(editLayout)/medical-profiles',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['profile', 'common'])
  const router = useRouter()
  const { data: familyList, isFetching } = useGetListFamilyQuery({
    params: {},
  })

  const familyMembers = familyList?.data?.patients ?? []

  if (isFetching) {
    return <LoadingState />
  }

  return (
    <div className="px-4 pb-20">
      {familyMembers.length === 0 ? (
        <EmptyMedicalProfiles />
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {familyMembers?.map((member) => {
            const relationshipLabel = member.relationship

            return (
              <ProfileItem
                key={member.id}
                avatarSrc={member.avatarUrl ?? undefined}
                name={member.fullName ?? ''}
                relationshipLabel={relationshipLabel}
                patientIdLabel={`PATIENT ID: #${member.profileCode ?? '--'}`}
                dateOfBirth={formatDate(member.dob, DATE_TIME_TYPE.MMM_DD_YYYY)}
                phone={member.contactNumber ?? ''}
                id={member.id}
              />
            )
          })}
        </div>
      )}

      {/* stricky save button */}
      <div className="fixed inset-x-0 bottom-0 bg-background px-4 pb-4">
        <Button
          type="button"
          variant="secondary"
          className="flex h-[45px] w-full items-center justify-center gap-3 rounded-[40px]"
          onClick={() => {
            router.navigate({
              to: '/app/profile/edit',
              search: { idMember: undefined, isUserProfile: false },
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
