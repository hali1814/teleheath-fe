import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'
import { ActionButton } from './ItemAppointment'

export default function AppointmentDoctorDetail() {
  const { t } = useTranslation(['appointment'])
  return (
    <div>
      {/* header */}
      <div className="rounded-[12px] bg-white p-4">
        <div className="flex items-start justify-between">
          <Text
            size="lg_16"
            className="font-medium leading-[24px] text-text-primary"
          >
            {t('medicalProfessional')}
          </Text>
          <div className="rounded-full bg-[#3B82F61A] px-2 py-[2px]">
            <Text
              size="xs_10"
              className="font-semibold uppercase tracking-[0.5px] leading-[15px] text-[#3B82F6]"
            >
              {t('confirmed')}
            </Text>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex size-20 items-center justify-center rounded-[48px] bg-[#53B6B5]">
            <Icon name="user_doctor_solid" className="size-12 text-white" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Text
              size="base_14"
              className="font-semibold leading-[17px] text-[#0F172A]"
            >
              Dr. Nguyen Duc Anh
            </Text>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-secondary"
            >
              {t('neurosurgeryAndSpineSurgery')}
            </Text>
            <div className="flex items-center gap-2">
              <Icon name="money_appointment" className="size-4" />
              <Text
                size="base_14"
                className="font-medium leading-[20px] text-text-primary"
              >
                {t('consultation')}: $50.00
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="mt-4 rounded-[12px] bg-white p-4">
        <Text
          size="lg_16"
          className="font-semibold leading-[19px] text-text-primary"
        >
          {t('appointmentInformation')}
        </Text>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-[32px] bg-[#ED26301A]">
            <Icon name="user_appointment" className="size-5" />
          </div>

          <div className="flex flex-col gap-1">
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-secondary"
            >
              {t('patient')}
            </Text>
            <Text
              size="base_14"
              className="font-medium leading-[21px] text-text-primary"
            >
              Sokra Chum
            </Text>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-[8px] border border-[#FFCCC7] bg-[#FFF1F0] p-3">
            <Text
              size="xs_10"
              className="font-bold uppercase leading-[15px] text-[#FF7875]"
            >
              {t('date')}
            </Text>
            <Text
              size="base_14"
              className="mt-2 font-medium leading-[21px] text-text-primary"
            >
              Nov 16, 2025
            </Text>
          </div>

          <div className="rounded-[8px] border border-[#FFCCC7] bg-[#FFF1F0] p-3">
            <Text
              size="xs_10"
              className="font-bold uppercase leading-[15px] text-[#FF7875]"
            >
              {t('time')}
            </Text>
            <Text
              size="base_14"
              className="mt-2 font-medium leading-[21px] text-text-primary"
            >
              10:00 - 10:30 AM
            </Text>
          </div>
        </div>
      </div>
      {/* Medical Records */}
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

        <div className="mt-3 rounded-[8px] bg-[#F8F6F6] px-3 pt-3 pb-4">
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

      {/* Important Reminders */}
      <div className="rounded-[12px] border-l-4 border-l-[#F0B133] bg-[#F8F6F0] px-4 py-5 mt-4">
        <div className="flex items-center gap-2">
          <Icon name="notice_appointment" className="size-[15px] shrink-0" />
          <Text
            size="base_14"
            className="font-semibold leading-[17px] text-[#F0B133]"
          >
            {t('importantReminders')}
          </Text>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="size-[6px] shrink-0 rounded-full bg-[#F0B133]" />
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-[#334155]"
            >
              {t('reminderJoinBefore')}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <span className="size-[6px] shrink-0 rounded-full bg-[#F0B133]" />
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-[#334155]"
            >
              {t('reminderCheckDevice')}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <span className="size-[6px] shrink-0 rounded-full bg-[#F0B133]" />
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-[#334155]"
            >
              {t('reminderPrepareQuestions')}
            </Text>
          </div>
        </div>
      </div>

      {/* stricky save button */}
      <div className="fixed inset-x-4 bottom-4 flex">
        <ActionButton
          text={t('joinCall')}
          iconName="add_record"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
