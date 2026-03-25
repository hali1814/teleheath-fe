import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

export default function MedicalRecords() {
  const { t } = useTranslation(['appointment'])

  return (
    <div>
      <div className="mt-4 rounded-[16px] bg-white p-4">
        <Text
          size="lg_16"
          className="font-semibold leading-[19px] text-text-primary"
        >
          {t('medicalRecords')}
        </Text>

        <div className="mt-4 rounded-[8px] border border-[#FFF1F0] bg-white px-4 py-3">
          <div className="flex items-center gap-3">
            <Icon name="document_appointment" className="size-5 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col">
              <Text
                size="base_14"
                className="truncate font-medium leading-[21px] text-text-primary"
              >
                Blood_Test_Report_Jan.pdf
              </Text>
              <Text
                size="sm_12"
                className="font-normal leading-[16px] text-text-secondary"
              >
                2.4 MB
              </Text>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-[8px] bg-[#F8F6F6] px-3 pb-4 pt-3">
          <Text
            size="base_14"
            className="font-semibold leading-[17px] text-text-primary"
          >
            {t('patientNote')}
          </Text>
          <Text
            size="sm_12"
            className="mt-[10px] font-normal leading-[160%] text-[#333333]"
          >
            I have been experiencing headaches and dizziness for the past two
            weeks. The pain usually occurs in the afternoon and sometimes comes
            with nausea. I have attached my recent blood test report for your
            review.
          </Text>
        </div>
      </div>
    </div>
  )
}
