import { NotificationList } from '#/sections/notification'
import { notificationsMock } from '#/mockData/notifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/notification/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <NotificationList notifications={notificationsMock} />
    </div>
  )
}
