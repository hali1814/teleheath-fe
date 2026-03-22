import Text from '#/components/text'
import Image from '#/components/image'
import { Icon } from '#/components/icon'

const AVATAR_PLACEHOLDER_GRADIENT =
  'linear-gradient(240deg, #FFA7A7 0%, #FFEFEF 100%)'

export interface AvatarProps {
  src?: string | null
  alt?: string
  initials?: string
  onCameraClick?: () => void
}

export default function Avatar({
  src,
  alt = 'Avatar',
  initials = '?',
  onCameraClick,
}: AvatarProps) {
  const hasImage = Boolean(src)

  return (
    <div
      className="relative flex size-[128px] items-center justify-center rounded-[100px] border-4 border-white bg-clip-padding opacity-100"
      style={{
        padding: '26px 20px',
        background: hasImage ? undefined : AVATAR_PLACEHOLDER_GRADIENT,
        boxSizing: 'border-box',
      }}
    >
      {hasImage ? (
        <Image src={src!} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <Text
          size="8xl_40"
          className="font-semibold uppercase text-[#A8071A80]"
        >
          {initials}
        </Text>
      )}

      <div
        onClick={onCameraClick}
        className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white p-2 bg-secondary"
        aria-label="Change avatar"
      >
        <Icon color="#FFFFFF" name="camera" className="size-[12px] shrink-0" />
      </div>
    </div>
  )
}
