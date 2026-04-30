import Text from '#/components/text'
import EmptyPatientProfiles from './EmptyPatientProfiles'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Icon } from '#/components/icon'
import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import DetailProfileModal from '../profile/DetailProfileModal'
import ProfileFormModal from '../profile/ProfileFormModal'
import type { ListFamilyPatient } from '#/services/query/profile/listFamily'
import { useTranslation } from 'react-i18next'

const PatientProfileItem = ({
  patient,
  selected = false,
  onClick,
  onViewDetails,
  viewDetailsLabel,
}: {
  patient: ListFamilyPatient
  selected?: boolean
  onClick?: () => void
  onViewDetails?: () => void
  viewDetailsLabel: string
}) => {
  return (
    <div className="w-[122px] px-[20px] flex justify-center items-start shrink-0">
      <div onClick={onClick} className="flex flex-col items-center gap-[12px]">
        <div className="relative">
          <Avatar
            className={cn(
              'w-[80px] h-[80px] flex items-center justify-center rounded-full overflow-hidden after:border-0',
              selected ? 'border-2 border-[#ED2630]' : 'opacity-50',
            )}
          >
            <AvatarImage
              src={patient.avatarUrl ?? undefined}
              alt={patient.fullName ?? ''}
              className="w-[68px] h-[68px]"
            />
            <AvatarFallback className="w-[68px] h-[68px] bg-[linear-gradient(135deg,#FFEFEF_0%,#FFA7A7_100%)]">
              <Text
                size="2xl_20"
                className="font-semibold leading-normal text-[#A8071A80] uppercase"
              >
                {patient?.fullName?.slice(0, 2)}
              </Text>
            </AvatarFallback>
          </Avatar>
          {selected && (
            <div
              className="absolute right-0 bottom-0 w-[24px] h-[24px] bg-primary rounded-full 
         flex items-center justify-center z-20 border-2 border-white"
            >
              <Icon name="check" className="w-[8px] h-[8px] text-white" />
            </div>
          )}
        </div>
        <div>
          <Text className="text-center font-medium leading-normal">
            {patient.fullName}
          </Text>
          <div
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.()
            }}
          >
            <Text
              size="sm_12"
              className="text-center font-medium leading-[1.3] text-dust-red-8"
            >
              {viewDetailsLabel}
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
  profiles,
  canAddMore = true,
  maxAllowed = 10,
}: {
  selected?: number
  onClick?: (patient: ListFamilyPatient) => void
  profiles: ListFamilyPatient[]
  canAddMore?: boolean
  maxAllowed?: number
}) {
  const { t } = useTranslation('profile')
  const [open, setOpen] = useState(false)
  const [openAddNewProfileModal, setOpenAddNewProfileModal] = useState(false)
  const [patientToViewDetails, setPatientToViewDetails] =
    useState<ListFamilyPatient | null>(null)
  const [pendingSelectProfileId, setPendingSelectProfileId] = useState<
    number | null
  >(null)
  const addDisabled = !canAddMore

  const handleViewDetails = (patientId: number) => {
    const patient = profiles?.find((patient) => patient.id === patientId)
    if (!patient) return
    setPatientToViewDetails(patient)
    setOpen(true)
  }

  useEffect(() => {
    if (!pendingSelectProfileId) return

    const createdProfile = profiles.find((p) => p.id === pendingSelectProfileId)
    if (!createdProfile) return

    onClick?.(createdProfile)
    setPendingSelectProfileId(null)
  }, [pendingSelectProfileId, profiles, onClick])

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center justify-between px-[16px]">
          <Text size="lg_16" className="font-semibold leading-[1.2]">
            {t('patientProfile')}
          </Text>
          <button
            type="button"
            disabled={addDisabled}
            aria-disabled={addDisabled}
            className={cn(addDisabled && 'cursor-not-allowed opacity-50')}
            onClick={() => {
              if (addDisabled) return
              setPatientToViewDetails(null)
              setOpenAddNewProfileModal(true)
            }}
          >
            <Text
              size="sm_12"
              className="font-medium leading-[1.3] text-primary"
            >
              + {t('addProfile')}
            </Text>
          </button>
        </div>
        {profiles && profiles.length > 0 ? (
          <div className="flex gap-[16px] overflow-x-auto no-scrollbar py-[10px] pl-[16px]">
            {profiles.length > 0 &&
              profiles.map((patient) => (
                <PatientProfileItem
                  key={patient.id}
                  patient={patient}
                  selected={selected === patient.id}
                  onClick={() => onClick?.(patient)}
                  onViewDetails={() => handleViewDetails(patient.id)}
                  viewDetailsLabel={t('viewDetails')}
                />
              ))}
          </div>
        ) : (
          <EmptyPatientProfiles
            disabledAddProfile={addDisabled}
            maxAllowed={maxAllowed}
            onClickAddProfile={() => {
              if (addDisabled) return
              setPatientToViewDetails(null)
              setOpenAddNewProfileModal(true)
            }}
          />
        )}
      </div>
      {patientToViewDetails && (
        <DetailProfileModal
          open={open}
          onOpenChange={setOpen}
          patient={patientToViewDetails}
          onEdit={() => setOpenAddNewProfileModal(true)}
        />
      )}
      <ProfileFormModal
        defaultValues={patientToViewDetails}
        open={openAddNewProfileModal}
        onOpenChange={setOpenAddNewProfileModal}
        onSuccess={(profile) => {
          if (!patientToViewDetails && profile?.id) {
            setPendingSelectProfileId(profile.id)
          }
        }}
      />
    </>
  )
}
