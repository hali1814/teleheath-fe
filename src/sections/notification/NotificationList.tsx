import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { EmptyState } from '../search'
import NotificationCard from './NotificationCard'
import { useGetListNotificationQuery } from '#/services/query/notification/list-notification'
import { useMarkReadAllNotificationMutation } from '#/services/query/notification/mark-read-all-notification'
import LoadingBlocking from '#/components/LoadingBlocking'
import LoadingState from '#/components/LoadingState'
import { useTranslation } from 'react-i18next'
import PullToRefresh from '#/components/PullToRefresh'
import { Header } from '../home'

export default function NotificationList() {
  const { t } = useTranslation(['common', 'search'])
  const { data, isLoading, refetch } = useGetListNotificationQuery({
    params: {},
  })

  const notifications = data?.data ?? []
  const isAllRead =
    notifications.length > 0 &&
    notifications.every((notification) => notification.status === 'READ')

  const { mutateAsync: markReadAllNotification } =
    useMarkReadAllNotificationMutation()

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={t('notificationsTitle')} />
      <div className="w-full flex flex-col mt-[16px] gap-[10px]">
        <button
          className="self-end flex items-center gap-[4px] mr-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => markReadAllNotification({})}
          disabled={notifications.length === 0 || isLoading || isAllRead}
        >
          <Icon
            name="double_check"
            className="w-[16px] h-[16px] text-dust-red-8"
          />
          <Text
            size="sm_12"
            className="font-medium leading-[1.3] text-dust-red-8"
          >
            {t('markAllAsRead')}
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
                <EmptyState>{t('search:empty.notifications')}</EmptyState>
              )}
            </>
          )}
        </div>
      </div>
    </PullToRefresh>
  )
}
