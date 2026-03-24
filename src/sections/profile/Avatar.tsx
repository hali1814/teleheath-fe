import Text, { type TextSize } from '#/components/text'
import Image from '#/components/image'
import { Icon } from '#/components/icon'

const AVATAR_PLACEHOLDER_GRADIENT =
  'linear-gradient(240deg, #FFA7A7 0%, #FFEFEF 100%)'

export interface AvatarProps {
  src?: string | null
  alt?: string
  initials?: string
  onCameraClick?: () => void
  size?: number
  hideCamera?: boolean
  textSize?: TextSize
}

export default function Avatar({
  src,
  alt = 'Avatar',
  initials = '?',
  onCameraClick,
  size = 128,
  hideCamera = false,
  textSize = '8xl_40',
}: AvatarProps) {
  const hasImage = Boolean(src)

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-4 border-white bg-clip-padding opacity-100`}
      style={{
        // Khi có ảnh, không padding để ảnh phủ full hình tròn.
        padding: hasImage ? 0 : '26px 20px',
        background: hasImage ? undefined : AVATAR_PLACEHOLDER_GRADIENT,
        boxSizing: 'border-box',
        width: size,
        height: size,
      }}
    >
      {hasImage ? (
        <Image
          src={src!}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <Text
          size={textSize}
          className="font-semibold uppercase text-[#A8071A]"
        >
          {initials}
        </Text>
      )}

      {!hideCamera && (
        <div
          onClick={onCameraClick}
          className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white p-2 bg-secondary"
          aria-label="Change avatar"
        >
          <Icon
            color="#FFFFFF"
            name="camera"
            className="size-[12px] shrink-0"
          />
        </div>
      )}
    </div>
  )
}
