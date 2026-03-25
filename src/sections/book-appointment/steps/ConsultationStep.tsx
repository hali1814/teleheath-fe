import Text from '#/components/text'
import { useGetListConsultationsQuery } from '#/services/query/hospital/list-consultation'
import { useBookingStore } from '#/stores/booking-store'
import { ConsultationCard } from '../ConsultationCard'

export function ConsultationStep() {
  const { consultationTier, setData, hospitalId } = useBookingStore()

  const { data: { data: consultations } = { data: [] } } =
    useGetListConsultationsQuery({
      params: {
        hospitalId: hospitalId ?? '',
      },
      enabled: !!hospitalId,
    })

  return (
    <div className="space-y-4 px-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Select consultation type
      </Text>
      {consultations.map((item) => (
        <ConsultationCard
          key={item.id}
          selected={consultationTier?.id === item.id}
          onClick={() => setData({ consultationTier: item })}
          {...item}
        />
      ))}
    </div>
  )
}
