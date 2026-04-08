import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { Doctor } from '#/entities/doctorEntity'
import { useTranslation } from 'react-i18next'

const EducationCertificationItem = ({ title }: { title: string }) => {
  return (
    <div className="flex items-start gap-[12px]">
      <Icon name="seal_check" className="w-[20px] h-[20px] text-primary" />
      <div className="flex flex-col gap-[8px]">
        <Text className="leading-normal">{title}</Text>
      </div>
    </div>
  )
}

export default function DoctorEducationCertifications({
  educations,
}: Pick<Doctor, 'educations'>) {
  const { t } = useTranslation(['doctor', 'common'])
  return (
    <div className="w-full flex flex-col gap-[16px] py-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('educationCertifications')}
      </Text>
      <div className="flex flex-col gap-[12px]">
        {educations?.map((education, index) => (
          <EducationCertificationItem key={index} title={education} />
        ))}
      </div>
    </div>
  )
}
