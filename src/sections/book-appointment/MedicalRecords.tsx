import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import { Textarea } from '#/components/ui/textarea'
import { useUploadImageMutation } from '#/services/query/upload/use-upload-image-mutate'
import { useBookingStore } from '#/stores/booking-store'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const MAX_FILE_BYTES = 10 * 1024 * 1024

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type FileRowStatus = 'uploading' | 'success' | 'error'

type MedicalFileRow = {
  id: string
  file: File
  fileId?: string
  status: FileRowStatus
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
  const { medicalHistory, notes, setData } = useBookingStore()
  const appendFileId = useBookingStore((s) => s.appendFileId)
  const removeFileId = useBookingStore((s) => s.removeFileId)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [rows, setRows] = useState<MedicalFileRow[]>([])

  const { mutateAsync: uploadFile } = useUploadImageMutation({
    isShowError: false,
  })

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

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
        const rowId = crypto.randomUUID()
        setRows((prev) => [...prev, { id: rowId, file, status: 'uploading' }])

        try {
          const res = await uploadFile({ file })
          const inner = res.data
          const fileId = inner?.fileId
          if (!fileId) {
            throw new Error('Missing fileId')
          }
          appendFileId(fileId)
          setRows((prev) =>
            prev.map((r) =>
              r.id === rowId ? { ...r, fileId, status: 'success' as const } : r,
            ),
          )
        } catch {
          toast.error(`Could not upload ${file.name}`)
          setRows((prev) =>
            prev.map((r) =>
              r.id === rowId ? { ...r, status: 'error' as const } : r,
            ),
          )
        }
      }
    })()
  }

  const removeRow = (index: number) => {
    const row = rows[index]
    if (row?.fileId) {
      removeFileId(row.fileId)
    }
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-[12px] px-[16px]">
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png"
        multiple
        onChange={handleFileChange}
      />
      <Text size="lg_16" className="leading-[1.2] font-semibold text-[#333333]">
        Medical Records
      </Text>
      <Text className="leading-normal text-[#999999]">
        Providing your medical history helps our specialists prepare for your
        visit.
      </Text>
      <div
        className="h-[190px] border border-dashed border-dust-red-2 bg-dust-red-1
      rounded-[12px] flex flex-col gap-[20px] py-[24px]
      "
      >
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Icon name="upload" className="w-[30px] h-[30px] text-primary" />
          <Text className="leading-normal font-medium">
            Upload Medical Files
          </Text>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            PDF, JPG, PNG (Max 10MB)
          </Text>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="self-center h-[33px] w-[140px] rounded-full"
          onClick={openFilePicker}
        >
          <Text
            size="sm_12"
            className="w-full text-center font-medium text-white"
          >
            Select Files
          </Text>
        </Button>
      </div>
      {rows.map((row, index) => (
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
