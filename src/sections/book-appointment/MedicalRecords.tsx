import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useUploadImageMutation } from '#/services/query/upload/use-upload-image-mutate'
import { useBookingStore, type FileRowStatus } from '#/stores/booking-store'
import { useId } from 'react'
import { toast } from 'sonner'

const MAX_FILE_BYTES = 10 * 1024 * 1024

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const MedicalFileItem = ({
  name,
  sizeLabel,
  status,
  onRemove,
}: {
  name: string
  sizeLabel: string
  status: FileRowStatus
  onRemove: () => void
}) => {
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
              Uploading…
            </Text>
          </div>
        ) : status === 'error' ? (
          <Text size="sm_12" className="leading-[1.3] text-destructive">
            Upload failed
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
        aria-label={`Remove ${name}`}
      >
        <Icon name="close" className="w-[14px] h-[14px] text-[#B3B3B3]" />
      </button>
    </div>
  )
}

export function MedicalRecords() {
  const { medicalFiles, medicalHistory, notes, setData } = useBookingStore()
  const appendMedicalFile = useBookingStore((s) => s.appendMedicalFile)
  const updateMedicalFile = useBookingStore((s) => s.updateMedicalFile)
  const removeMedicalFile = useBookingStore((s) => s.removeMedicalFile)

  const medicalFileInputId = useId()

  const { mutateAsync: uploadFile } = useUploadImageMutation({
    isShowError: false,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list?.length) return

    const accepted: File[] = []
    for (const file of Array.from(list)) {
      if (file.size > MAX_FILE_BYTES) {
        toast.error(`${file.name} exceeds 10MB`)
        continue
      }
      accepted.push(file)
    }

    e.target.value = ''

    if (!accepted.length) return

    void (async () => {
      for (const file of accepted) {
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
        } catch {
          toast.error(`Could not upload ${file.name}`)
          updateMedicalFile(id, '', 'error')
        }
      }
    })()
  }

  const removeRow = (index: number) => {
    const row = medicalFiles[index]
    if (row?.fileId) {
      removeMedicalFile(row.id)
    }
  }

  return (
    <div className="flex flex-col gap-[12px] px-[16px]">
      <Text size="lg_16" className="leading-[1.2] font-semibold text-[#333333]">
        Medical Records
      </Text>
      <Text className="leading-normal text-[#999999]">
        Providing your medical history helps our specialists prepare for your
        visit.
      </Text>
      <label
        htmlFor={medicalFileInputId}
        className="flex h-[190px] cursor-pointer touch-manipulation flex-col gap-[20px] rounded-[12px] border border-dashed border-dust-red-2 bg-dust-red-1 py-[24px] active:opacity-90"
        aria-label="Upload medical files"
      >
        <input
          id={medicalFileInputId}
          type="file"
          className="sr-only"
          accept="image/*,application/pdf,.pdf,.jpg,.jpeg,.png,.heic,.heif"
          multiple
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Icon name="upload" className="h-[30px] w-[30px] text-primary" />
          <Text className="leading-normal font-medium">
            Upload Medical Files
          </Text>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            PDF, JPG, PNG (Max 10MB)
          </Text>
        </div>
        <span className="inline-flex h-[33px] w-[140px] shrink-0 cursor-pointer select-none items-center justify-center self-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
          <Text size="sm_12" className="text-center font-medium text-white">
            Select Files
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
        />
      ))}
      <div className="flex flex-col gap-[10px]">
        <Text className="font-medium leading-normal text-[#333333]">
          Describe medical history manually
        </Text>
        <Textarea
          className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
          placeholder="Tell us more about your symptoms or medical history..."
          value={medicalHistory}
          onChange={(e) => setData({ medicalHistory: e.target.value })}
        />
      </div>
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Additional Notes
      </Text>
      <Textarea
        className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
        placeholder="Any other information you'd like to share?"
        value={notes}
        onChange={(e) => setData({ notes: e.target.value })}
      />
    </div>
  )
}
