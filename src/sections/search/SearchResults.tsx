import Text from '#/components/text'
import type { Doctor } from '#/entities/doctorEntity'
import type { Hospital } from '#/entities/hospitalEntity'
import type { Tab } from '#/routes/app/search/(commonLayout)'
import { DoctorCard } from '../doctor'
import { HospitalCard } from '../hospital'
import { PackageCard } from '../package'
import EmptyState from './EmptyState'
import type { Package } from '#/entities/packageEntity'

const Section = ({
  title,
  children,
  count,
  isActive = false,
  hideCount = false,
}: {
  title: string
  children: React.ReactNode
  count: number
  isActive?: boolean
  hideCount?: boolean
}) => {
  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      {!hideCount && (
        <>
          {isActive ? (
            <Text
              size="base_14"
              className="font-medium text-muted-foreground leading-normal"
            >
              {count} results found.
            </Text>
          ) : (
            <Text
              size="sm_12"
              className="font-medium text-muted-foreground uppercase"
            >
              {title} ({count})
            </Text>
          )}
        </>
      )}
      <div className="flex flex-col gap-[16px]">{children}</div>
    </div>
  )
}

export default function SearchResults({
  data,
  tab,
  query,
  hideCount = false,
  hideBookAppointment = true,
}: {
  data: any
  tab: Tab
  query: string
  hideCount?: boolean
  hideBookAppointment?: boolean
}) {
  const { hospitals, doctors, packages } = data

  if (tab === 'HOSPITAL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 ? (
          <Section
            title="Hospitals"
            count={hospitals.length}
            isActive={true}
            hideCount={hideCount}
          >
            {hospitals.map((item: Hospital) => (
              <HospitalCard
                key={item.hospitalId}
                {...item}
                size="md"
                showBadge={true}
                hideBookAppointment={hideBookAppointment}
                variantButton="solid"
                showAddress={true}
              />
            ))}
          </Section>
        ) : (
          <EmptyState>
            No results for <span className="italic">&quot;{query}&quot;</span>
          </EmptyState>
        )}
      </div>
    )
  }

  if (tab === 'DOCTOR') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {doctors.length > 0 ? (
          <Section
            title="Doctors"
            count={doctors.length}
            isActive={true}
            hideCount={hideCount}
          >
            {doctors.map((item: Doctor) => (
              <DoctorCard
                key={item.doctorId}
                {...item}
                variant="horizontal"
                hideBookAppointment={hideBookAppointment}
                sizeAvatar={
                  hideBookAppointment ? 'w-[63px] h-[63px]' : undefined
                }
              />
            ))}
          </Section>
        ) : (
          <EmptyState>
            No results for <span className="italic">&quot;{query}&quot;</span>
          </EmptyState>
        )}
      </div>
    )
  }

  if (tab === 'PACKAGE') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {packages.length > 0 ? (
          <Section
            title="Packages"
            count={packages.length}
            isActive={true}
            hideCount={hideCount}
          >
            {packages.map((item: Package) => (
              <PackageCard
                key={item.packageId}
                {...item}
                hideBookAppointment={hideBookAppointment}
                sizeThumbnail="fixed"
              />
            ))}
          </Section>
        ) : (
          <EmptyState>
            No results for <span className="italic">&quot;{query}&quot;</span>
          </EmptyState>
        )}
      </div>
    )
  }

  if (tab === 'ALL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 && (
          <Section title="Hospitals" count={hospitals.length}>
            {hospitals.map((item: Hospital) => (
              <HospitalCard
                key={item.hospitalId}
                {...item}
                size="md"
                showBadge={true}
                hideBookAppointment={hideBookAppointment}
                variantButton="solid"
                showAddress={true}
              />
            ))}
          </Section>
        )}

        {doctors.length > 0 && (
          <Section title="Doctors" count={doctors.length}>
            {doctors.map((item: Doctor) => (
              <DoctorCard
                key={item.doctorId}
                {...item}
                variant="horizontal"
                hideBookAppointment={hideBookAppointment}
                sizeAvatar={
                  hideBookAppointment ? 'w-[63px] h-[63px]' : undefined
                }
              />
            ))}
          </Section>
        )}

        {packages.length > 0 && (
          <Section title="Packages" count={packages.length}>
            {packages.map((item: Package) => (
              <PackageCard
                key={item.packageId}
                {...item}
                hideBookAppointment={hideBookAppointment}
                sizeThumbnail="fixed"
              />
            ))}
          </Section>
        )}
      </div>
    )
  }
}
