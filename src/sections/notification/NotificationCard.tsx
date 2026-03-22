import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { formatTimeAgo } from '#/utils/time.util'

const MAPPING_COLOR = {
  green: '#34D36C',
  red: '#CF1322',
  cyan: '#006D75',
  blue: '#1D39C4',
  orange: '#D46B08',
}

const MAPPING_ICON = {
  bell_check: 'bell_check',
  appointment_cancelled: 'send_cancel_filled',
  check_circle: 'check_circle_solid',
  video: 'video_solid',
  notification_active: 'notification_active',
} as const satisfies Record<string, IconName>

export interface NotificationCardProps {
  color: keyof typeof MAPPING_COLOR
  icon: keyof typeof MAPPING_ICON
  title: string
  description: string
  time: Date | string | number
  isRead?: boolean
}

export default function NotificationCard({
  color,
  icon,
  title,
  description,
  time,
  isRead = false,
}: NotificationCardProps) {
  const colorCode = MAPPING_COLOR[color]
  const accentBg = `${colorCode}1A`
  const bgContainer = isRead ? 'bg-background' : 'bg-[#FFF4F4]'

  return (
    <div
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
            name={MAPPING_ICON[icon]}
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
            {description}
          </Text>
        </div>
      </div>

      <Text
        size="xs_10"
        className="font-medium leading-[1.3]"
        style={{ color: isRead ? '#94A3B8' : colorCode }}
      >
        {formatTimeAgo(time)}
      </Text>
    </div>
  )
}
