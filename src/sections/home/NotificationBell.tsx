import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Badge } from '#/components/ui/badge'
import { useGetListNotificationQuery } from '#/services/query/notification/list-notification'
import { useProfileStore } from '#/stores/profile'
import { Link } from '@tanstack/react-router'

export default function NotificationBell() {
  const { profile } = useProfileStore()
  const hasProfileId = !!profile?.id

  const { data } = useGetListNotificationQuery({
    params: {
      statuses: 'DELIVERED',
    },
    enabled: hasProfileId,
  })

  if (!hasProfileId) {
    return null
  }

  const notificationCount = data?.data?.length ?? 0

  return (
    <Link to="/app/notification" className="relative shrink-0">
      <Icon name="notification" className="w-[21px] h-[21px]" color="#B3B3B3" />
      <Badge className="absolute -top-1 -right-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full p-0 px-[4px] text-[10px]">
        <Text size="xs_10" className="leading-[1.3] text-white">
          {notificationCount}
        </Text>
      </Badge>
    </Link>
  )
}
