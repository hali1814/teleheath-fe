import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { cn } from '#/lib/utils'
import type { ListNotificationResponse } from '#/services/query/notification/list-notification'
import { useMarkReadNotificationMutation } from '#/services/query/notification/mark-read-notification'
import { formatTimeAgo } from '#/utils/time.util'
import { useNavigate } from '@tanstack/react-router'

export default function NotificationCard({
  notifId,
  title,
  appointmentId,
  body,
  type,
  status,
  sentAt,
  iconUrl,
}: ListNotificationResponse) {
  const navigate = useNavigate()
  const isRead = status === 'READ'
  const accentBg = isRead ? `#5858581A` : `#CF13221A`
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
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      className={cn(
        'w-full flex gap-3 p-[16px] border border-secondary/5 cursor-pointer',
        bgContainer,
      )}
    >
      <div className="flex items-center justify-center w-12 h-12">
        <div
          className="flex items-center justify-center w-[36px] h-[36px] rotate-45 rounded-[8px]"
          style={{ backgroundColor: accentBg }}
        >
          <Image
            src={iconUrl}
            alt="icon"
            className="w-[20px] h-[20px] -rotate-45"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Text className="font-medium leading-normal text-[#333333]">
              {title}{' '}
            </Text>
            {isRead ? null : (
              <Icon
                name="circle_solid"
                className="w-[6px] h-[6px] text-[#CF1322]"
              />
            )}
          </div>

          <Text
            size="sm_12"
            className="leading-[1.3] text-muted-foreground text-left"
          >
            {renderBodyWithLinks(body)}
          </Text>
        </div>
      </div>

      <Text size="xs_10" className="font-medium leading-[1.3] text-[#333333]">
        {formatTimeAgo(sentAt)}
      </Text>
    </div>
  )
}

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi

function renderBodyWithLinks(body: string) {
  if (!body) return body
  const parts = body.split(URL_REGEX)
  return parts.map((part, index) => {
    if (URL_REGEX.test(part)) {
      URL_REGEX.lastIndex = 0
      const href = part.startsWith('http') ? part : `https://${part}`
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation()
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          className="relative inline-block py-1 px-0.5 -my-1 text-blue-600 underline break-all"
        >
          {part}
        </a>
      )
    }
    return <span key={index}>{part}</span>
  })
}
