import { useEffect, useRef, useState } from 'react'

import { Icon } from '#/components/icon'
import Text from '#/components/text'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { fileUrlForSameOriginDisplay } from '#/utils/file-url.util'
import { useTranslation } from 'react-i18next'

type MedicalFileRow = MyAppointmentItem['medicalFiles'][number]

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—'
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB'] as const
  const i = Math.min(
    sizes.length - 1,
    Math.floor(Math.log(bytes) / Math.log(k)),
  )
  const value = bytes / k ** i
  const rounded = i === 0 ? Math.round(value) : parseFloat(value.toFixed(1))
  return `${rounded} ${sizes[i]}`
}

/** Preview: image in <img>, PDF in iframe; other → message + open link */
function getPreviewKind(file: MedicalFileRow): 'image' | 'pdf' | 'other' {
  const ct = (file.contentType ?? '').toLowerCase()
  const name = (file.originalFilename ?? '').toLowerCase()
  if (ct.startsWith('image/')) return 'image'
  if (
    /\.(png|jpe?g|gif|webp|svg)$/i.test(name) &&
    (ct === '' || ct === 'application/octet-stream')
  ) {
    return 'image'
  }
  if (
    ct === 'application/pdf' ||
    ct === 'application/x-pdf' ||
    name.endsWith('.pdf')
  ) {
    return 'pdf'
  }
  return 'other'
}

/**
 * Tải PDF qua fetch → blob URL rồi mở trong iframe.
 * Cách này thường xem được trong modal khi server chặn nhúng trực tiếp (X-Frame-Options),
 * vì `blob:` cùng origin với trang.
 */
function PdfPreview({ url, title }: { url: string; title: string }) {
  const { t } = useTranslation(['common'])
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false
    objectUrlRef.current = null

    const applyDirectUrl = () => {
      if (!cancelled) setIframeSrc(url)
    }

    const load = async () => {
      setIframeSrc(null)
      try {
        const res = await fetch(url, { credentials: 'include' })
        if (!res.ok || cancelled) {
          applyDirectUrl()
          return
        }
        const blob = await res.blob()
        if (cancelled) return
        const objectUrl = URL.createObjectURL(blob)
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current)
        }
        objectUrlRef.current = objectUrl
        setIframeSrc(objectUrl)
      } catch {
        applyDirectUrl()
      }
    }

    void load()
    return () => {
      cancelled = true
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [url])

  if (iframeSrc === null) {
    return (
      <div className="flex h-[min(70vh,640px)] min-h-[200px] items-center justify-center rounded-md border border-[#E2E8F0] bg-[#F8FAFC]">
        <Text size="sm_12" className="text-text-secondary">
          {t('common:entry.loadingLabel')}
        </Text>
      </div>
    )
  }

  return (
    <iframe
      title={title}
      src={iframeSrc}
      className="h-[min(70vh,640px)] w-full rounded-md border border-[#E2E8F0] bg-white"
    />
  )
}

function MedicalFilePreviewBody({
  file,
  url,
}: {
  file: MedicalFileRow
  url: string
}) {
  const { t } = useTranslation(['appointment'])
  const kind = getPreviewKind(file)

  if (kind === 'image') {
    return (
      <div className="flex max-h-[min(70vh,640px)] min-h-[120px] items-center justify-center overflow-auto bg-[#F8FAFC] p-2">
        <img
          src={url}
          alt={file.originalFilename}
          className="max-h-[min(70vh,640px)] w-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  if (kind === 'pdf') {
    return <PdfPreview url={url} title={file.originalFilename} />
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8 text-center">
      <Text size="base_14" className="text-text-secondary">
        {t('appointment:medicalFilePreviewUnsupported')}
      </Text>
      <Button variant="outline" size="sm" asChild>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {t('appointment:medicalFileOpenInNewTab')}
        </a>
      </Button>
    </div>
  )
}

export interface MedicalRecordsProps {
  medicalFiles?: MyAppointmentItem['medicalFiles']
  notes?: MyAppointmentItem['notes']
}

export default function MedicalRecords({
  medicalFiles,
  notes,
}: MedicalRecordsProps) {
  const { t } = useTranslation(['appointment'])
  const [preview, setPreview] = useState<{
    file: MedicalFileRow
    url: string
  } | null>(null)

  const files = medicalFiles ?? []
  const noteText = notes?.trim() ?? ''
  const hasFiles = files.length > 0
  const hasNote = noteText.length > 0

  if (!hasFiles && !hasNote) {
    return null
  }

  return (
    <>
      <div className="mt-4 rounded-[16px] bg-white p-4">
        <Text
          size="lg_16"
          className="font-semibold leading-[19px] text-text-primary"
        >
          {t('medicalRecords')}
        </Text>

        {hasFiles ? (
          <div className="mt-4 flex flex-col gap-3">
            {files.map((file, index) => {
              const href =
                fileUrlForSameOriginDisplay(file.remotePath) ?? file.remotePath
              const key = file.fileId || `${index}-${file.originalFilename}`
              const row = (
                <div className="flex items-center gap-3">
                  <Icon
                    name="document_appointment"
                    className="size-5 shrink-0"
                    aria-hidden
                  />
                  <div className="flex min-w-0 flex-1 flex-col text-left">
                    <Text
                      size="base_14"
                      className="truncate font-medium leading-[21px] text-text-primary"
                    >
                      {file.originalFilename || file.remotePath}
                    </Text>
                    <Text
                      size="sm_12"
                      className="font-normal leading-[16px] text-text-secondary"
                    >
                      {formatFileSize(file.sizeBytes)}
                    </Text>
                  </div>
                </div>
              )
              if (href) {
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPreview({ file, url: href })}
                    className="block w-full rounded-[8px] border border-[#FFF1F0] bg-white px-4 py-3 text-left transition-colors hover:bg-[#FFF9F9]"
                  >
                    {row}
                  </button>
                )
              }
              return (
                <div
                  key={key}
                  className="rounded-[8px] border border-[#FFF1F0] bg-white px-4 py-3 opacity-80"
                >
                  {row}
                </div>
              )
            })}
          </div>
        ) : null}

        {hasNote ? (
          <div
            className={cn(
              'rounded-[8px] bg-[#F8F6F6] px-3 pb-4 pt-3',
              hasFiles ? 'mt-3' : 'mt-4',
            )}
          >
            <Text
              size="base_14"
              className="font-semibold leading-[17px] text-text-primary"
            >
              {t('patientNote')}
            </Text>
            <Text
              size="sm_12"
              className="mt-[10px] whitespace-pre-wrap font-normal leading-[160%] text-[#333333]"
            >
              {noteText}
            </Text>
          </div>
        ) : null}
      </div>

      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null)
        }}
      >
        <DialogContent
          showCloseButton
          aria-describedby={undefined}
          className="flex max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-3xl flex-col gap-3 overflow-hidden p-4 sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">
            {preview?.file.originalFilename}
          </DialogTitle>
          {preview ? (
            <>
              <Text
                size="lg_16"
                className="line-clamp-2 shrink-0 pr-8 font-semibold text-text-primary"
              >
                {preview.file.originalFilename || preview.file.remotePath}
              </Text>
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-muted/20">
                <MedicalFilePreviewBody
                  file={preview.file}
                  url={preview.url}
                />
              </div>
              <div className="flex shrink-0 justify-end border-t border-border pt-3">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={preview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('medicalFileOpenInNewTab')}
                  </a>
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
