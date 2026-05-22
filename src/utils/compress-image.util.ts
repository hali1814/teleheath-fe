/**
 * Nén ảnh phía client (Canvas) trước khi upload multipart.
 * Trả về `File` JPEG; nếu không đọc được ảnh hoặc lỗi thì trả về file gốc.
 */

const JPEG_PASSTHROUGH_MIMES = new Set(['image/jpeg', 'image/png'])

export function needsJpegConversion(file: File): boolean {
  const mime = (file.type || '').toLowerCase()
  if (!mime.startsWith('image/')) return false
  return !JPEG_PASSTHROUGH_MIMES.has(mime)
}

export async function convertImageToJpeg(
  file: File,
  quality = 0.95,
): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  try {
    const img = await loadImageFromFile(file)
    const w = img.naturalWidth || img.width
    const h = img.naturalHeight || img.height
    if (!w || !h) return file
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(img, 0, 0, w, h)
    const blob = await canvasToJpegBlob(canvas, quality)
    return new File([blob], buildOutputName(file.name), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  } catch {
    return file
  }
}

export interface CompressImageFileOptions {
  /** Cạnh dài nhất (px) sau khi scale; mặc định 1920 */
  maxSide?: number
  /** Kích thước tối đa mong muốn (bytes) */
  maxBytes?: number
  /** Chất lượng JPEG ban đầu 0–1 */
  initialQuality?: number
  /** Chất lượng JPEG tối thiểu trước khi giảm thêm kích thước */
  minQuality?: number
}

const DEFAULT_MAX_SIDE = 1920
const DEFAULT_MAX_BYTES = 980 * 1024
const DEFAULT_INITIAL_QUALITY = 0.88
const DEFAULT_MIN_QUALITY = 0.52

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('compressImageFile: failed to decode image'))
    }
    img.src = url
  })
}

function canvasToJpegBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('compressImageFile: canvas.toBlob returned null'))
      },
      'image/jpeg',
      quality,
    )
  })
}

function buildOutputName(originalName: string): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image'
  return `${base}.jpg`
}

/**
 * Nén ảnh thành JPEG, giảm dần quality rồi scale nếu vẫn quá lớn.
 */
export async function compressImageFile(
  file: File,
  options?: CompressImageFileOptions,
): Promise<File> {
  if (!file.type.startsWith('image/')) return file

  const maxBytes = options?.maxBytes ?? DEFAULT_MAX_BYTES
  if (file.size <= maxBytes) return file

  const initialQuality = options?.initialQuality ?? DEFAULT_INITIAL_QUALITY
  const minQuality = options?.minQuality ?? DEFAULT_MIN_QUALITY

  let maxSide = options?.maxSide ?? DEFAULT_MAX_SIDE

  try {
    const img = await loadImageFromFile(file)
    const w = img.naturalWidth || img.width
    const h = img.naturalHeight || img.height
    if (!w || !h) return file

    for (let scaleRound = 0; scaleRound < 6; scaleRound += 1) {
      const scale = Math.min(1, maxSide / Math.max(w, h))
      const tw = Math.max(1, Math.round(w * scale))
      const th = Math.max(1, Math.round(h * scale))

      const canvas = document.createElement('canvas')
      canvas.width = tw
      canvas.height = th
      const ctx = canvas.getContext('2d')
      if (!ctx) return file
      ctx.drawImage(img, 0, 0, tw, th)

      let quality = initialQuality
      while (quality >= minQuality - 1e-6) {
        const blob = await canvasToJpegBlob(canvas, quality)
        if (blob.size <= maxBytes) {
          return new File([blob], buildOutputName(file.name), {
            type: 'image/jpeg',
            lastModified: Date.now(),
          })
        }
        quality -= 0.07
      }

      maxSide = Math.floor(maxSide * 0.82)
      if (maxSide < 320) break
    }

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(w * (320 / Math.max(w, h))))
    canvas.height = Math.max(1, Math.round(h * (320 / Math.max(w, h))))
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const blob = await canvasToJpegBlob(canvas, minQuality)
    return new File([blob], buildOutputName(file.name), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  } catch {
    return file
  }
}
