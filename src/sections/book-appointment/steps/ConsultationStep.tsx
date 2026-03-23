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
    <div className="space-y-3">
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
