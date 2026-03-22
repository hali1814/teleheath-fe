import { useGetListConsultationsQuery } from '#/services/query/hospital/list-consultation'
import { useBookingStore } from '#/stores/booking-store'
import { useParams } from '@tanstack/react-router'
import { ConsultationCard } from '../ConsultationCard'

export function ConsultationStep() {
  const { consultationTierId, setData } = useBookingStore()
  const { hospitalId } = useParams({
    from: '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
  })

  const { data: { data: consultations } = { data: [] } } =
    useGetListConsultationsQuery({
      params: {
        hospitalId: hospitalId,
      },
    })

  return (
    <div className="space-y-3">
      {consultations.map((item) => (
        <ConsultationCard
          key={item.id}
          selected={consultationTierId === item.id}
          onClick={() => setData({ consultationTierId: item.id })}
          {...item}
        />
      ))}
    </div>
  )
}
