import Text from '#/components/text'
import BookingItem from './BookingItem'

export default function BookingOffline() {
  return (
    <>
      <Text
        size="sm_12"
        className="font-medium tracking-[0.03em] text-muted-foreground uppercase"
      >
        Booking Offline
      </Text>
      <BookingItem
        title="Booking Offline"
        description="Booking Offline"
        icon="book"
      />
      <BookingItem
        title="Booking Offline"
        description="Booking Offline"
        icon="book"
      />
      <BookingItem
        title="Booking Offline"
        description="Booking Offline"
        icon="book"
      />
    </>
  )
}
