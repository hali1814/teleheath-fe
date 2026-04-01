import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'
import type { ListNotificationResponse } from '#/services/query/notification/list-notification'
import { useMarkReadNotificationMutation } from '#/services/query/notification/mark-read-notification'
import { formatTimeAgo } from '#/utils/time.util'
import { useNavigate } from '@tanstack/react-router'

const MAPPING_COLOR = {
  green: '#34D36C',
  red: '#CF1322',
  cyan: '#006D75',
  blue: '#1D39C4',
  orange: '#D46B08',
}

const mappingType = {
  appointment: {
    icon: 'check_circle_solid',
    color: 'cyan',
  },
  cancelled: {
    icon: 'send_cancel_filled',
    color: 'red',
  },
  reminder: {
    icon: 'notification_active',
    color: 'orange',
  },
  completed: {
    icon: 'bell_check',
    color: 'green',
  },
} as const satisfies Record<
  string,
  { icon: IconName; color: keyof typeof MAPPING_COLOR }
>

export default function NotificationCard({
  notifId,
  title,
  appointmentId,
  body,
  type,
  status,
  sentAt,
}: ListNotificationResponse) {
  const navigate = useNavigate()
  const isRead = status === 'READ'
  const colorCode =
    MAPPING_COLOR[mappingType[type as keyof typeof mappingType].color]
  const accentBg = `${colorCode}1A`
  const bgContainer = isRead ? 'bg-background' : 'bg-[#FFF4F4]'

  const { mutateAsync: markReadNotification } =
    useMarkReadNotificationMutation()

  const handleClick = async () => {
    if (!isRead) {
      await markReadNotification({ notifId })
    }
    navigate({
      to: '/app/appointments/$id',
      search: { type: 'appointment' as const },
      params: { id: appointmentId.toString() },
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex gap-3 p-[16px] border border-secondary/5',
        bgContainer,
      )}
    >
      <div className="flex items-center justify-center w-12 h-12">
        <div
          className="flex items-center justify-center w-[36px] h-[36px] rotate-45 rounded-[8px]"
          style={{ backgroundColor: accentBg }}
        >
          <Icon
            name={
              mappingType[type as keyof typeof mappingType].icon as IconName
            }
            className="w-[20px] h-[20px] -rotate-45"
            style={{ color: colorCode }}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Text
              className="font-medium leading-normal"
              style={{ color: isRead ? '#333333' : colorCode }}
            >
              {title}{' '}
            </Text>
            {isRead ? null : (
              <Icon
                name="circle_solid"
                className="w-[6px] h-[6px]"
                style={{ color: colorCode }}
              />
            )}
          </div>

          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            {body}
          </Text>
        </div>
      </div>

      <Text
        size="xs_10"
        className="font-medium leading-[1.3]"
        style={{ color: isRead ? '#94A3B8' : colorCode }}
      >
        {formatTimeAgo(sentAt)}
      </Text>
    </button>
  )
}
