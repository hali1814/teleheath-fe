/** Chuỗi có chứa keyword (đã normalize) — dùng cho filter client-side. */
function haystackMatches(haystack: string, needle: string): boolean {
  if (!needle) return true
  return haystack.toLowerCase().includes(needle)
}

function normalizeKeyword(keyword: string): string {
  return keyword.trim().toLowerCase()
}

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v == null || typeof v !== 'object' || Array.isArray(v)) return null
  return v as Record<string, unknown>
}

function countryBlob(c: unknown): string {
  const o = asRecord(c)
  if (!o) return ''
  return [o.nameVi, o.nameEn, o.nameKh]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

function hospitalSearchBlob(h: unknown): string {
  const o = asRecord(h)
  if (!o) return ''
  return [
    o.nameVi,
    o.nameEn,
    o.nameKh,
    o.address,
    o.description,
    countryBlob(o.country),
  ]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

function doctorSearchBlob(d: unknown): string {
  const o = asRecord(d)
  if (!o) return ''
  let spec = ''
  if (Array.isArray(o.specialties)) {
    spec = o.specialties
      .map((s) => {
        const r = asRecord(s)
        if (!r) return ''
        if (typeof r.name === 'string') return r.name
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }
  return [o.nameVi, o.nameEn, o.nameKh, spec, countryBlob(o.country)]
    .map((x) => (typeof x === 'string' ? x : x != null ? String(x) : ''))
    .filter(Boolean)
    .join(' ')
}

function packageSearchBlob(p: unknown): string {
  const o = asRecord(p)
  if (!o) return ''
  let countries = ''
  if (Array.isArray(o.countries)) {
    countries = o.countries.map(countryBlob).filter(Boolean).join(' ')
  }
  let hosp = ''
  const h = asRecord(o.hospital)
  if (h) {
    hosp = [h.nameVi, h.nameEn, h.nameKh].filter(Boolean).join(' ')
  }
  return [o.name, o.description, o.category, countries, hosp]
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
