import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { EmptyState } from '../search'
import NotificationCard from './NotificationCard'
import { useGetListNotificationQuery } from '#/services/query/notification/list-notification'
import { useMarkReadAllNotificationMutation } from '#/services/query/notification/mark-read-all-notification'
import LoadingBlocking from '#/components/LoadingBlocking'
import LoadingState from '#/components/LoadingState'

export default function NotificationList() {
  const { data, isLoading } = useGetListNotificationQuery({
    params: {},
  })

  const notifications = data?.data ?? []

  const { mutateAsync: markReadAllNotification } =
    useMarkReadAllNotificationMutation()

  return (
    <div className="w-full flex flex-col mt-[16px] gap-[10px]">
      <button
        className="self-end flex items-center gap-[4px] mr-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => markReadAllNotification({})}
        disabled={notifications.length === 0 || isLoading}
      >
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
      </button>
      <div>
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.notifId}
                  {...notification}
                />
              ))
            ) : (
              <EmptyState>No notifications found</EmptyState>
            )}
          </>
        )}
      </div>
    </div>
  )
}
