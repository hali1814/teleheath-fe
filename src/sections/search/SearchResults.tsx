import Text from '#/components/text'
import type { Tab } from '#/routes/app/search/(commonLayout)'
import { DoctorCard } from '../doctor'
import { HospitalCard } from '../hospital'
import { PackageCard } from '../package'

const Section = ({
  title,
  children,
  count,
  isActive = false,
}: {
  title: string
  children: React.ReactNode
  count: number
  isActive?: boolean
}) => {
  return (
    <div className="flex flex-col gap-[16px] px-[16px]">
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
      <div className="flex flex-col gap-[16px]">{children}</div>
    </div>
  )
}

export default function SearchResults({ data, tab }: { data: any; tab: Tab }) {
  const { hospitals, doctors, packages } = data

  if (tab === 'HOSPITAL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 && (
          <Section title="Hospitals" count={hospitals.length} isActive={true}>
            {hospitals.map((item: any) => (
              <HospitalCard
                key={item.id}
                {...item}
                size="md"
                showBadge={true}
                hideBookAppointment={true}
              />
            ))}
          </Section>
        )}
      </div>
    )
  }

  if (tab === 'DOCTOR') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {doctors.length > 0 && (
          <Section title="Doctors" count={doctors.length} isActive={true}>
            {doctors.map((item: any) => (
              <DoctorCard
                key={item.id}
                {...item}
                variant="horizontal"
                hideBookAppointment={true}
                sizeAvatar="sm"
              />
            ))}
          </Section>
        )}
      </div>
    )
  }

  if (tab === 'PACKAGE') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {packages.length > 0 && (
          <Section title="Packages" count={packages.length} isActive={true}>
            {packages.map((item: any) => (
              <PackageCard
                key={item.id}
                {...item}
                hideBookAppointment={true}
                sizeThumbnail="sm"
              />
            ))}
          </Section>
        )}
      </div>
    )
  }

  if (tab === 'ALL') {
    return (
      <div className="flex flex-col gap-4 py-4">
        {hospitals.length > 0 && (
          <Section title="Hospitals" count={hospitals.length}>
            {hospitals.map((item: any) => (
              <HospitalCard
                key={item.id}
                {...item}
                size="md"
                showBadge={true}
                hideBookAppointment={true}
              />
            ))}
          </Section>
        )}

        {doctors.length > 0 && (
          <Section title="Doctors" count={doctors.length}>
            {doctors.map((item: any) => (
              <DoctorCard
                key={item.id}
                {...item}
                variant="horizontal"
                hideBookAppointment={true}
              />
            ))}
          </Section>
        )}

        {packages.length > 0 && (
          <Section title="Packages" count={packages.length}>
            {packages.map((item: any) => (
              <PackageCard
                key={item.id}
                {...item}
                hideBookAppointment={true}
                sizeThumbnail="sm"
              />
            ))}
          </Section>
        )}
      </div>
    )
  }
}
