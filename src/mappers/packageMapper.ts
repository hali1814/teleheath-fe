import type { ApiPackage } from '#/dto/packageDto'
import type { Package } from '#/entities/packageEntity'

/** Giá khuyến mãi chỉ hợp lệ khi `now` nằm trong [promotionStart, promotionEnd] (cận biên inclusive). */
function isPromotionActive(
  promotionStart: string | null | undefined,
  promotionEnd: string | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!promotionStart?.trim() || !promotionEnd?.trim()) return false
  const startMs = new Date(promotionStart).getTime()
  const endMs = new Date(promotionEnd).getTime()
  const nowMs = now.getTime()
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return false
  return nowMs >= startMs && nowMs <= endMs
}

export const mapApiPackage = (api: ApiPackage): Package => ({
  packageId: api.id,
  name: api.name,
  description: api.description,
  imageUrl: api.imageUrl,
  price: api.price ?? 0,
  promotionPrice: (() => {
    const listPrice = api.price ?? 0
    if (!isPromotionActive(api.promotionStart, api.promotionEnd)) {
      return listPrice
    }
    const promo = api.promotionPrice
    if (promo == null || Number.isNaN(Number(promo))) return listPrice
    return Number(promo)
  })(),
  hospitalName: api?.hospital?.name,
  countryName: api?.countries?.length > 0 ? api.countries[0].name : '',
  branches:
    api?.hospital?.branches?.length > 0
      ? api.hospital.branches.map((branch) => ({
          id: branch.branchId,
          name: branch.name,
          address: branch.detailedAddress,
        }))
      : [],
  checkupTypes:
    api?.checkupTypes?.length > 0
      ? api.checkupTypes.map((checkupType) => checkupType.name)
      : [],
})
