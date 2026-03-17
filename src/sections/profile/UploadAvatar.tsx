import { Icon } from '#/components/icon'

export default function UploadAvatar() {
  return (
    <div className="relative flex h-[128px] w-[128px] items-center justify-center rounded-full bg-[#D331311A]">
      <svg
        className="absolute inset-0"
        viewBox="0 0 128 128"
        aria-hidden="true"
      >
        <circle
          cx="64"
          cy="64"
          r="63"
          fill="none"
          stroke="#D331314D"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      </svg>
      <Icon name="upload_camera" />
    </div>
  )
}
