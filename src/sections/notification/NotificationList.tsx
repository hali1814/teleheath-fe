import { Icon } from '#/components/icon'
import Text from '#/components/text'
import NotificationCard from './NotificationCard'
import type { NotificationCardProps } from './NotificationCard'

export default function NotificationList({
  notifications,
}: {
  notifications: NotificationCardProps[]
}) {
  return (
    <div className="w-full flex flex-col mt-[16px] gap-[10px]">
      <div className="self-end flex items-center gap-[4px] mr-[16px]">
        <Icon
          name="double_check"
          className="w-[16px] h-[16px] text-dust-red-8"
        />
        <Text
          size="sm_12"
          className="font-medium leading-[1.3] text-dust-red-8"
        >
          Mark all as read
        </Text>
      </div>
      <div>
        {notifications.map((notification) => (
          <NotificationCard key={notification.title} {...notification} />
        ))}
      </div>
    </div>
  )
}
