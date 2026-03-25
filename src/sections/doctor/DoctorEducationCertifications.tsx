import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import type { Doctor } from '#/types/doctor'
import { useTranslation } from 'react-i18next'

const EducationCertificationItem = ({
  icon,
  title,
  description,
}: {
  icon: IconName
  title: string
  description: string
}) => {
  return (
    <div className="flex items-start gap-[12px]">
      <Icon name={icon} className="w-[20px] h-[20px] text-primary" />
      <div className="flex flex-col gap-[8px]">
        <Text className="font-semibold leading-[1.2]">{title}</Text>
        <Text
          size="sm_12"
          className="font-normal leading-[1.3] text-muted-foreground"
        >
          {description}
        </Text>
      </div>
    </div>
  )
}

export default function DoctorEducationCertifications({
  certifications,
}: Pick<Doctor, 'certifications'>) {
  const { t } = useTranslation(['doctor', 'common'])
  return (
    <div className="w-full flex flex-col gap-[16px] py-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('educationCertifications')}
      </Text>
      <div className="flex flex-col gap-[12px]">
        {/* {educationCertifications.map((educationCertification) => (
          <EducationCertificationItem
            key={educationCertification.title}
            {...educationCertification}
          />
        ))} */}
        {certifications.split(',').map((certification) => (
          <EducationCertificationItem
            key={certification}
            icon="graduate_cap"
            title={certification}
            description=""
          />
        ))}
      </div>
    </div>
  )
}
