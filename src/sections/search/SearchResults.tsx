import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import type { Doctor } from '#/entities/doctorEntity'
import type { Hospital } from '#/entities/hospitalEntity'
import type { Tab } from '#/routes/app/search/(commonLayout)'
import { DoctorCard } from '../doctor'
import { HospitalCard } from '../hospital'
import { PackageCard } from '../package'
import EmptyState from './EmptyState'
import { TransNoResultsFor } from './TransSearchEmptyMessages'
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
  const { t } = useTranslation(['search'])
  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
      {!hideCount && (
        <>
          {isActive ? (
            <Text
              size="base_14"
              className="font-medium text-muted-foreground leading-normal"
            >
              {t('resultsFound', { count })}
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
  const { t } = useTranslation(['search'])
  const { hospitals, doctors, packages } = data

  if (tab === 'HOSPITAL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 ? (
          <Section
            title={t('tabs.hospitals')}
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
            <TransNoResultsFor query={query} />
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
            title={t('tabs.doctors')}
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
            <TransNoResultsFor query={query} />
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
            title={t('tabs.packages')}
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
            <TransNoResultsFor query={query} />
          </EmptyState>
        )}
      </div>
    )
  }

  if (tab === 'ALL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 && (
          <Section title={t('tabs.hospitals')} count={hospitals.length}>
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
          <Section title={t('tabs.doctors')} count={doctors.length}>
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
          <Section title={t('tabs.packages')} count={packages.length}>
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
