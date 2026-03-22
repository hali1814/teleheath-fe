import Text from '#/components/text'
import EmptyPatientProfiles from './EmptyPatientProfiles'
import { patientProfiles } from '#/mockData/book-appointment'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { Icon } from '#/components/icon'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import DetailProfileModal, {
  type DetailProfileModalProfile,
} from '../profile/DetailProfileModal'
import ProfileFormModal from '../profile/ProfileFormModal'

const PatientProfileItem = ({
  profile,
  selected = false,
  onClick,
  onViewDetails,
}: {
  profile: (typeof patientProfiles)[0]
  selected?: boolean
  onClick?: () => void
  onViewDetails?: () => void
}) => {
  return (
    <div className="w-[122px] px-[20px] flex justify-center items-center shrink-0">
      <div onClick={onClick} className="flex flex-col items-center gap-[12px]">
        <div className="relative">
          <Avatar
            className={cn(
              'w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden after:border-0',
              selected && 'border-2 border-[#ED2630]',
            )}
          >
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              className="w-[68px] h-[68px]"
            />
          </Avatar>
          {selected && (
            <div
              className="absolute right-0 bottom-0 w-[24px] h-[24px] bg-primary rounded-full 
         flex items-center justify-center z-50 border-2 border-white"
            >
              <Icon name="check" className="w-[8px] h-[8px] text-white" />
            </div>
          )}
        </div>
        <div>
          <Text className="text-center font-medium leading-normal">
            {profile.name}
          </Text>
          <div onClick={onViewDetails}>
            <Text
              size="sm_12"
              className="text-center font-medium leading-[1.3] text-dust-red-8"
            >
              View Details
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PatientProfileList({
  selected,
  onClick,
}: {
  selected?: string
  onClick?: (patientID: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [openAddNewProfileModal, setOpenAddNewProfileModal] = useState(false)
  const [profile, setProfile] = useState<DetailProfileModalProfile | null>(null)

  const handleViewDetails = (patientID: string) => {
    setProfile(
      patientProfiles.find((profile) => profile.patientID === patientID),
    )
    setOpen(true)
  }

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <Text size="lg_16" className="font-semibold leading-[1.2]">
          Patient Profile
        </Text>
        {patientProfiles.length > 0 ? (
          <div className="flex gap-[16px] overflow-x-auto no-scrollbar py-[10px]">
            {patientProfiles.map((profile) => (
              <PatientProfileItem
                key={profile.patientID}
                profile={profile}
                selected={selected === profile.patientID}
                onClick={() => onClick?.(profile.patientID)}
                onViewDetails={() => handleViewDetails(profile.patientID)}
              />
            ))}
          </div>
        ) : (
          <EmptyPatientProfiles />
        )}
      </div>
      {profile && (
        <DetailProfileModal
          open={open}
          onOpenChange={setOpen}
          profile={profile}
          onEdit={() => setOpenAddNewProfileModal(true)}
        />
      )}
      <ProfileFormModal
        open={openAddNewProfileModal}
        onOpenChange={setOpenAddNewProfileModal}
      />
    </>
  )
}
