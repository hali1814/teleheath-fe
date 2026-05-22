import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useUploadImageMutation } from '#/services/query/upload/use-upload-image-mutate'
import { useBookingStore, type FileRowStatus } from '#/stores/booking-store'
import {
  convertImageToJpeg,
  needsJpegConversion,
} from '#/utils/compress-image.util'
import { useId } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_CHARACTERS = 500

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ALLOWED_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'pdf',
  'heic',
  'heif',
])

const ALLOWED_MIMES = new Set([
  'image/png',
  'image/jpeg',
  'image/heic',
  'image/heif',
  'application/pdf',
])

function getFileExtension(file: File): string {
  const name = file.name ?? ''
  const dotIdx = name.lastIndexOf('.')
  if (dotIdx === -1) return ''
  return name.slice(dotIdx + 1).toLowerCase()
}

function isAllowedFile(file: File): boolean {
  const ext = getFileExtension(file)
  if (ALLOWED_EXTENSIONS.has(ext)) return true
  const mime = file.type?.toLowerCase?.() ?? ''
  return ALLOWED_MIMES.has(mime)
}

function getMimeExtension(mime: string): string {
  switch (mime) {
    case 'image/png':
      return 'png'
    case 'image/jpeg':
      return 'jpg'
    case 'image/heic':
      return 'heic'
    case 'image/heif':
      return 'heif'
    case 'application/pdf':
      return 'pdf'
    default:
      return 'bin'
  }
}

function ensureNamedFile(file: File): File {
  const name = file.name ?? ''
  if (name && name.includes('.')) return file
  const ext = getMimeExtension(file.type?.toLowerCase?.() ?? '')
  const fallbackName = `upload-${Date.now()}.${ext}`
  return new File([file], fallbackName, {
    type: file.type || 'application/octet-stream',
    lastModified: file.lastModified,
  })
}

function extractUploadErrorMessage(err: unknown): string | undefined {
  if (!err || typeof err !== 'object') return undefined
  const anyErr = err as Record<string, unknown>
  const message = anyErr.message
  if (typeof message === 'string' && message.length > 0) return message
  const response = anyErr.response as Record<string, unknown> | undefined
  const data = response?.data as Record<string, unknown> | undefined
  const dataMessage = data?.message
  if (typeof dataMessage === 'string' && dataMessage.length > 0)
    return dataMessage
  return undefined
}

function countCharacters(value?: string | null): number {
  return (value ?? '').length
}

function clampToMaxCharacters(value: string, maxCharacters: number) {
  if (value.length <= maxCharacters) {
    return { value, truncated: false }
  }

  return {
    value: value.slice(0, maxCharacters),
    truncated: true,
  }
}

const MedicalFileItem = ({
  name,
  sizeLabel,
  status,
  onRemove,
  onRemoveAriaLabel,
}: {
  name: string
  sizeLabel: string
  status: FileRowStatus
  onRemove: () => void
  onRemoveAriaLabel: string
}) => {
  const { t } = useTranslation(['book-appointment'])
  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] bg-white">
      <Icon name="file" className="w-[16px] h-[20px] text-primary" />
      <div className="flex-1 flex flex-col gap-[4px] min-w-0">
        <Text className="leading-normal font-medium text-[#333333] truncate">
          {name}
        </Text>
        {status === 'uploading' ? (
          <div className="flex items-center gap-[8px]">
            <Spinner className="w-3 h-3" />
            <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
              {t('medicalRecords.uploading')}
            </Text>
          </div>
        ) : status === 'error' ? (
          <Text size="sm_12" className="leading-[1.3] text-destructive">
            {t('medicalRecords.uploadFailed')}
          </Text>
        ) : (
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            {sizeLabel}
          </Text>
        )}
      </div>
      <button
        type="button"
        className="shrink-0 p-0 border-0 bg-transparent cursor-pointer"
        onClick={onRemove}
        disabled={status === 'uploading'}
        aria-label={onRemoveAriaLabel}
      >
        <Icon name="close" className="w-[14px] h-[14px] text-[#B3B3B3]" />
      </button>
    </div>
  )
}

export function MedicalRecords() {
  const { t } = useTranslation(['book-appointment'])
  const { medicalFiles, medicalHistory, notes, setData } = useBookingStore()
  const appendMedicalFile = useBookingStore((s) => s.appendMedicalFile)
  const updateMedicalFile = useBookingStore((s) => s.updateMedicalFile)
  const removeMedicalFile = useBookingStore((s) => s.removeMedicalFile)

  const medicalFileInputId = useId()

  const { mutateAsync: uploadFile } = useUploadImageMutation({
    isShowError: false,
  })

  const handleCharacterLimitedChange = (
    field: 'medicalHistory' | 'notes',
    value: string,
  ) => {
    const previousValue = field === 'medicalHistory' ? medicalHistory : notes
    const previousCount = countCharacters(previousValue)
    const nextCount = countCharacters(value)
    const { value: clampedValue, truncated } = clampToMaxCharacters(
      value,
      MAX_CHARACTERS,
    )

    if (
      truncated &&
      previousCount <= MAX_CHARACTERS &&
      nextCount > MAX_CHARACTERS
    ) {
      toast.error(t('medicalRecords.wordLimitExceeded', { max: MAX_CHARACTERS }))
    }
    setData({ [field]: clampedValue })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length) return

    const accepted: File[] = []
    for (const file of Array.from(list)) {
      if (!isAllowedFile(file)) {
        toast.error(
          t('medicalRecords.toastFileNotAllowed', { fileName: file.name }),
        )
        continue
      }
      if (file.size > MAX_FILE_BYTES) {
        toast.error(
          t('medicalRecords.toastFileTooLarge', { fileName: file.name }),
        )
        continue
      }
      accepted.push(file)
    }

    e.target.value = ''

    if (!accepted.length) return

    void (async () => {
      for (const rawFile of accepted) {
        let file = ensureNamedFile(rawFile)
        if (needsJpegConversion(file)) {
          file = ensureNamedFile(await convertImageToJpeg(file))
        }
        const id = crypto.randomUUID()
        appendMedicalFile(id, file)

        try {
          const res = await uploadFile({ file })
          const inner = res.data
          const fileId = inner?.fileId
          if (!fileId) {
            throw new Error('Missing fileId')
          }
          updateMedicalFile(id, fileId, 'success')
        } catch (err) {
          console.error('[MedicalRecords] upload failed', {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            error: err,
          })
          const backendMessage = extractUploadErrorMessage(err)
          toast.error(
            t('medicalRecords.toastUploadError', { fileName: file.name }),
            backendMessage ? { description: backendMessage } : undefined,
          )
          updateMedicalFile(id, '', 'error')
        }
      }
    })()
  }

  const removeRow = (index: number) => {
    const row = medicalFiles[index]
    if (row && row.status !== 'uploading') {
      removeMedicalFile(row.id)
    }
  }

  return (
    <div className="flex flex-col gap-[12px] px-[16px]">
      <Text size="lg_16" className="leading-[1.2] font-semibold text-[#333333]">
        {t('medicalRecords.title')}
      </Text>
      <Text className="leading-normal text-[#999999]">
        {t('medicalRecords.intro')}
      </Text>
      <label
        htmlFor={medicalFileInputId}
        className="flex h-[190px] cursor-pointer touch-manipulation flex-col gap-[20px] rounded-[12px] border border-dashed border-dust-red-2 bg-dust-red-1 py-[24px] active:opacity-90"
        aria-label={t('medicalRecords.uploadAriaLabel')}
      >
        <input
          id={medicalFileInputId}
          type="file"
          className="sr-only"
          accept=".png,.jpg,.jpeg,.pdf,application/pdf,image/png,image/jpeg"
          multiple
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Icon name="upload" className="h-[30px] w-[30px] text-primary" />
          <Text className="leading-normal font-medium">
            {t('medicalRecords.uploadTitle')}
          </Text>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            {t('medicalRecords.formatsHint')}
          </Text>
        </div>
        <span className="inline-flex h-[33px] w-[140px] shrink-0 cursor-pointer select-none items-center justify-center self-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
          <Text size="sm_12" className="text-center font-medium text-white">
            {t('medicalRecords.selectFiles')}
          </Text>
        </span>
      </label>
      {medicalFiles.map((row, index) => (
        <MedicalFileItem
          key={row.id}
          name={row.file.name}
          sizeLabel={formatFileSize(row.file.size)}
          status={row.status}
          onRemove={() => removeRow(index)}
          onRemoveAriaLabel={t('medicalRecords.removeFileAria', {
            fileName: row.file.name,
          })}
        />
      ))}
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between gap-3">
          <Text className="font-medium leading-normal text-[#333333]">
            {t('medicalRecords.describeManual')}
          </Text>
          <Text size="sm_12" className="text-muted-foreground">
            {countCharacters(medicalHistory)}/{MAX_CHARACTERS}
          </Text>
        </div>
        <Textarea
          className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
          placeholder={t('medicalRecords.manualPlaceholder')}
          value={medicalHistory ?? ''}
          onChange={(e) =>
            handleCharacterLimitedChange('medicalHistory', e.target.value)
          }
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Text
          size="lg_16"
          className="font-semibold leading-[1.2] text-[#333333]"
        >
          {t('medicalRecords.additionalNotes')}
        </Text>
        <Text size="sm_12" className="text-muted-foreground">
          {countCharacters(notes)}/{MAX_CHARACTERS}
        </Text>
      </div>
      <Textarea
        className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
        placeholder={t('medicalRecords.notesPlaceholder')}
        value={notes ?? ''}
        onChange={(e) => handleCharacterLimitedChange('notes', e.target.value)}
      />
    </div>
  )
}
