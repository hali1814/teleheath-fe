/** Chuỗi có chứa keyword (đã normalize) — dùng cho filter client-side. */
function haystackMatches(haystack: string, needle: string): boolean {
  if (!needle) return true
  return normalizeText(haystack).includes(needle)
}

function normalizeText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase()
}

function normalizeKeyword(keyword: string): string {
  return normalizeText(keyword)
}

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v == null || typeof v !== 'object' || Array.isArray(v)) return null
  return v as Record<string, unknown>
}

function hospitalSearchBlob(h: unknown): string {
  const o = asRecord(h)
  if (!o) return ''
  return [o.name]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

function doctorSearchBlob(d: unknown): string {
  const o = asRecord(d)
  if (!o) return ''
  return [o.name]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

function packageSearchBlob(p: unknown): string {
  const o = asRecord(p)
  if (!o) return ''
  return [o.name]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

export type SpecialtySearchBuckets = {
  hospitals: unknown[]
  doctors: unknown[]
  packages: unknown[]
}

/**
 * Lọc kết quả search theo chuyên khoa trên FE (một lần load API, filter local).
 * Keyword rỗng → trả nguyên bản (cùng reference mảng khi không đổi).
 */
export function filterSpecialtySearchByKeyword(
  data: SpecialtySearchBuckets,
  keywordRaw: string,
): SpecialtySearchBuckets {
  const needle = normalizeKeyword(keywordRaw)
  if (!needle) {
    return data
  }

  return {
    hospitals: data.hospitals.filter((h) =>
      haystackMatches(hospitalSearchBlob(h), needle),
    ),
    doctors: data.doctors.filter((d) =>
      haystackMatches(doctorSearchBlob(d), needle),
    ),
    packages: data.packages.filter((p) =>
      haystackMatches(packageSearchBlob(p), needle),
    ),
  }
}
