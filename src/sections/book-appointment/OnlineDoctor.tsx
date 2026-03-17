import Text from '#/components/text'
import BookingItem from './BookingItem'

export default function OnlineDoctor() {
  return (
    <>
      <Text
        size="sm_12"
        className="font-medium tracking-[0.03em] text-muted-foreground uppercase"
      >
        Online Doctor
      </Text>
      <BookingItem
        title="Online Doctor"
        description="Online Doctor"
        icon="book"
      />
    </>
  )
}
