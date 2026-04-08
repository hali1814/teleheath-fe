import Text from '#/components/text'
import { useGetListBranchesByDoctorQuery } from '#/services/query/doctor/list-branches-by-doctor'
import { useGetListBranchesQuery } from '#/services/query/hospital/list-branches'
import { useBookingStore } from '#/stores/booking-store'
import type { Branch } from '#/types/hospital'
import { useEffect, useMemo } from 'react'
import { LocationCard } from '../LocationCard'
import LoadingState from '#/components/LoadingState'
import { useGetListBranchesByPackageQuery } from '#/services/query/package/list-branches-by-package'

const EMPTY_BRANCHES: Branch[] = []

export type LocationStepType = 'HOSPITAL' | 'DOCTOR' | 'PACKAGE'

export function LocationStep({ type }: { type: LocationStepType }) {
  const { branch, setData, hospital, packageData, doctor, next } =
    useBookingStore()

  const hospitalBranchesQuery = useGetListBranchesQuery({
    params: { hospitalId: hospital?.hospitalId?.toString() ?? '' },
    enabled: type === 'HOSPITAL' && !!hospital?.hospitalId,
  })

  const doctorBranchesQuery = useGetListBranchesByDoctorQuery({
    params: { doctorId: doctor?.doctorId ?? '' },
    enabled: type === 'DOCTOR' && !!doctor?.doctorId,
  })

  const packageBranchesQuery = useGetListBranchesByPackageQuery({
    params: { packageId: packageData?.packageId ?? 0 },
    enabled: type === 'PACKAGE' && !!packageData?.packageId,
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
    setData({ branch: only })
    next()
  }, [branches, branch, setData, next])

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
          {branches.length > 0 &&
            branches.map((item) => (
              <LocationCard
                key={String(item.branchId)}
                selected={branch?.branchId === item.branchId}
                onClick={() => setData({ branch: item })}
                branchId={String(item.branchId)}
                nameVi={item.nameVi}
                nameKh={item.nameKh}
                nameEn={item.nameEn}
                address={item.detailedAddress}
              />
            ))}
        </>
      )}
    </div>
  )
}
