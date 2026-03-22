import { BottomSheet } from '#/components/BottomSheet'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import { useUploadImageMutation } from '#/services/query/upload/use-upload-image-mutate'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface UploadAvatarProps {
  /** Gọi sau khi upload thành công, trả về URL file từ server. */
  onChange?: (fileUrl: string) => void
}

export default function UploadAvatar({ onChange }: UploadAvatarProps) {
  const { t } = useTranslation(['profile'])
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const libraryInputRef = useRef<HTMLInputElement>(null)

  const { mutateAsync, isPending } = useUploadImageMutation()

  const uploadFile = useCallback(
    async (file: File) => {
      const res = await mutateAsync({ file })
      console.log(res)
      if (res.success && res.data?.fileUrl) {
        setAvatarUrl(res.data.fileUrl)
        onChange?.(res.data.fileUrl)
      }
    },
    [mutateAsync, onChange],
  )

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      await uploadFile(file)
    },
    [uploadFile],
  )

  const openInputAfterSheetClose = (
    ref: React.RefObject<HTMLInputElement | null>,
  ) => {
    setSheetOpen(false)
    window.setTimeout(() => ref.current?.click(), 0)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileChange}
        aria-hidden
      />
      <input
        ref={libraryInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileChange}
        aria-hidden
      />

      <button
        type="button"
        disabled={isPending}
        onClick={() => setSheetOpen(true)}
        className="relative flex h-[128px] w-[128px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-[#D331311A] p-0 disabled:opacity-60"
        aria-label={t('uploadPhoto')}
      >
        {avatarUrl ? (
          <>
            <Image
              src={avatarUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            {isPending ? (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/35"
                aria-hidden
              >
                <Spinner className="size-8 text-white" />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <svg
              className="pointer-events-none absolute inset-0"
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
            {isPending ? (
              <Spinner className="size-8 text-[#D33131]" />
            ) : (
              <Icon name="upload_camera" className="pointer-events-none" />
            )}
          </>
        )}
      </button>

      {!avatarUrl ? (
        <Text
          size="base_14"
          className="text-dust-red-8 mt-4 text-center font-medium"
        >
          {t('uploadPhoto')}
        </Text>
      ) : null}

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={t('choosePhotoSource')}
      >
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            className="flex h-auto w-full items-center justify-start gap-3 rounded-2xl px-4 py-4 shadow-none hover:bg-muted/60"
            onClick={() => openInputAfterSheetClose(cameraInputRef)}
          >
            <Icon name="camera" className="size-6 shrink-0 text-[#D33131]" />
            <Text size="base_14" className="font-medium text-text-primary">
              {t('photoFromCamera')}
            </Text>
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            className="flex h-auto w-full items-center justify-start gap-3 rounded-2xl px-4 py-4 shadow-none hover:bg-muted/60"
            onClick={() => openInputAfterSheetClose(libraryInputRef)}
          >
            <Icon name="upload" className="size-6 shrink-0 text-[#D33131]" />
            <Text size="base_14" className="font-medium text-text-primary">
              {t('photoFromLibrary')}
            </Text>
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
