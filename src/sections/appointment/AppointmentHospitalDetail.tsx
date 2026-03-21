import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'

export default function AppointmentHospitalDetail() {
  const { t } = useTranslation(['appointment'])
  return (
    <div>
      {/* Appointment Information */}
      <div className="rounded-[12px] bg-white p-4">
        <div className="flex items-start justify-between">
          <Text
            size="lg_16"
            className="font-semibold leading-[19px] text-text-primary"
          >
            {t('appointmentInformation')}
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

        <div className="mt-4 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
            <Icon
              name="hospital_appointment"
              color="#E22A36"
              className="size-5 text-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-secondary"
            >
              {t('hospitalAndBranch')}
            </Text>
            <Text
              size="lg_16"
              className="font-semibold leading-[24px] text-text-primary"
            >
              Tam Anh Hospital
            </Text>
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-primary"
            >
              Ho Chi Minh
            </Text>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
            <Icon name="location_appointment" className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-secondary"
            >
              {t('address')}
            </Text>
            <Text
              size="base_14"
              className="font-normal leading-[150%] text-text-primary"
            >
              2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City
            </Text>
            <div className="mt-[2px] flex items-center gap-1">
              <Icon
                name="map_outline"
                color="#A8071A"
                className="size-4 shrink-0"
              />
              <Text
                size="base_14"
                className="font-medium leading-[21px] text-[#A8071A]"
              >
                {t('map')}
              </Text>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[32px] bg-[#ED26301A]">
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
              Nov 18, 2025
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
              06:30 - 07:00 AM
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Icon name="medical_appointment" className="size-4" />
          <Text
            size="base_14"
            className="font-medium leading-[21px] text-text-primary"
          >
            {t('specialty')}: Cardiology
          </Text>
        </div>
      </div>

      {/* Service Package */}
      <div className="mt-4 rounded-[12px] bg-white p-4">
        <div className="flex items-start justify-between">
          <Text
            size="lg_16"
            className="font-semibold leading-[19px] text-text-primary"
          >
            {t('servicePackage')}
          </Text>
          <div className="rounded-full bg-[#FEF3C7] px-3 py-1">
            <Text
              size="sm_12"
              className="font-semibold leading-[16px] text-[#B45309]"
            >
              VIP
            </Text>
          </div>
        </div>

        <Text
          size="lg_16"
          className="mt-4 font-semibold leading-[19px] text-secondary"
        >
          {t('vipConsultation')}
        </Text>

        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full   bg-[#FFF1F0]">
              <Icon name="check_appointment" className="size-[10px]" />
            </div>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-text-secondary"
            >
              {t('priorityBookingZeroWaitTime')}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full   bg-[#FFF1F0]">
              <Icon name="check_appointment" className="size-[10px]" />
            </div>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-text-secondary"
            >
              {t('consultationWithSeniorSpecialists')}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full   bg-[#FFF1F0]">
              <Icon name="check_appointment" className="size-[10px]" />
            </div>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-text-secondary"
            >
              {t('dedicatedHealthConcierge')}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full   bg-[#FFF1F0]">
              <Icon name="check_appointment" className="size-[10px]" />
            </div>
            <Text
              size="sm_12"
              className="font-normal leading-[16px] text-text-secondary"
            >
              {t('exclusiveVipLoungeAccess')}
            </Text>
          </div>
        </div>
      </div>

      {/* Selected Services */}
      <div className="mt-4 rounded-[12px] bg-white p-4">
        <Text
          size="lg_16"
          className="font-semibold leading-[19px] text-text-primary"
        >
          {t('selectedServices')}
        </Text>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[50px] bg-[#D331311A]">
              <Icon name="car_appointment" className="size-5" />
            </div>
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-secondary"
            >
              {t('doorToDoorTransport')}
            </Text>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[50px] bg-[#D331311A]">
              <Icon name="user_sp_appointment" className="size-5" />
            </div>
            <Text
              size="base_14"
              className="font-normal leading-[21px] text-text-secondary"
            >
              {t('supportStaff')}
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
    </div>
  )
}
