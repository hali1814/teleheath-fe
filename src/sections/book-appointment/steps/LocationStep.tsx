import Text from '#/components/text'
import { useGetListBranchesByDoctorQuery } from '#/services/query/doctor/list-branches-by-doctor'
import { useGetListBranchesQuery } from '#/services/query/hospital/list-branches'
import { useBookingStore } from '#/stores/booking-store'
import type { Branch } from '#/types/hospital'
import { useCallback, useEffect, useMemo } from 'react'
import { LocationCard } from '../LocationCard'
import LoadingState from '#/components/LoadingState'
import { useGetListBranchesByPackageQuery } from '#/services/query/package/list-branches-by-package'
import { EmptyState } from '#/sections/search'

const EMPTY_BRANCHES: Branch[] = []

export type LocationStepType = 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

export function LocationStep({ type }: { type: LocationStepType }) {
  const { branch, setData, hospital, packageData, doctor, next } =
    useBookingStore()

  const packageId =
    (packageData as { packageId?: number } | undefined)?.packageId ??
    packageData?.id ??
    0

  const updateBranch = useCallback(
    (nextBranch: Branch) => {
      const isSameBranch = branch?.branchId === nextBranch.branchId
      if (isSameBranch) return

      setData({
        branch: nextBranch,
        room: undefined,
        doctor: type === 'HOSPITAL' ? undefined : doctor,
        serviceIds: [],
        addonServiceTypes: [],
        appointmentDate: undefined,
        startTime: undefined,
        endTime: undefined,
      })
    },
    [branch?.branchId, setData, type, doctor],
  )

  const hospitalBranchesQuery = useGetListBranchesQuery({
    params: {
      hospitalId: hospital?.hospitalId?.toString() ?? '',
      isRoomAvailable: true,
    },
    enabled: type === 'HOSPITAL' && !!hospital?.hospitalId,
  })

  const doctorBranchesQuery = useGetListBranchesByDoctorQuery({
    params: { doctorId: doctor?.doctorId ?? '' },
    enabled: type === 'DOCTOR' && !!doctor?.doctorId,
  })

  const packageBranchesQuery = useGetListBranchesByPackageQuery({
    params: { packageId },
    enabled: type === 'PACKAGE' && !!packageId,
  })

  const branches = useMemo((): Branch[] => {
    switch (type) {
      case 'HOSPITAL':
        return hospitalBranchesQuery.data?.data ?? EMPTY_BRANCHES
      case 'DOCTOR':
        return doctorBranchesQuery.data?.data ?? EMPTY_BRANCHES
      case 'PACKAGE':
        return packageBranchesQuery.data?.data ?? EMPTY_BRANCHES
    }
  }, [
    type,
    hospitalBranchesQuery.data?.data,
    doctorBranchesQuery.data?.data,
    packageBranchesQuery.data?.data,
  ])

  useEffect(() => {
    if (branches.length !== 1) return
    const only = branches[0]
    if (branch?.branchId === only.branchId) return
    updateBranch(only)
    next()
  }, [branches, branch, next, updateBranch])

  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select Location
      </Text>
      {hospitalBranchesQuery.isLoading ||
      doctorBranchesQuery.isLoading ||
      packageBranchesQuery.isLoading ? (
        <LoadingState />
      ) : (
        <>
          {branches.length > 0 ? (
            branches.map((item) => (
              <LocationCard
                key={String(item.branchId)}
                selected={branch?.branchId === item.branchId}
                onClick={() => updateBranch(item)}
                branchId={String(item.branchId)}
                nameVi={item.nameVi}
                nameKh={item.nameKh}
                nameEn={item.nameEn}
                address={item.detailedAddress}
              />
            ))
          ) : (
            <EmptyState>No locations found</EmptyState>
          )}
        </>
      )}
    </div>
  )
}
