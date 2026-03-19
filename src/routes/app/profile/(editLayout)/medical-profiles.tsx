import EmptyMedicalProfiles from '#/sections/profile/EmptyMedicalProfiles'
import ProfileItem from '#/sections/profile/ProfileItem'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/app/profile/(editLayout)/medical-profiles',
)({
  component: RouteComponent,
})

function RouteComponent() {
  if (false) {
    return <EmptyMedicalProfiles />
  }
  return (
    <div className="px-4">
      <ProfileItem
        name="John Doe"
        relationshipLabel="Self"
        patientIdLabel="1234567890"
        dateOfBirth="May 12, 1989"
        phone="+855 96 789 0123"
      />
    </div>
  )
}
