import { consultationTypes } from '#/mockData/book-appointment'
import { useBookingStore } from '#/stores/booking-store'
import { ConsultationCard } from '../ConsultationCard'

export function ConsultationStep() {
  const { consultationType, setData } = useBookingStore()

  return (
    <div className="space-y-3">
      {consultationTypes.map((item) => (
        <ConsultationCard
          key={item.title}
          title={item.title}
          benefits={item.benefits}
          selected={consultationType === item.title}
          onClick={() => setData({ consultationType: item.title })}
        />
      ))}
    </div>
  )
}
