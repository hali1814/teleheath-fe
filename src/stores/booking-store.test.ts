import { describe, it, expect, beforeEach } from 'vitest'
import {
  useBookingStore,
  lineTotalOf,
  type SelectedAddon,
} from './booking-store'
import type { First100Banner } from '#/services/query/promotions/first100-banner'

const mk = (p: Partial<SelectedAddon>): SelectedAddon => ({
  id: 1,
  isBest: false,
  typeName: 't',
  originalPrice: 0,
  price: 0,
  promotionPrice: 0,
  description: '',
  addonServiceId: 1,
  addonServiceName: 'a',
  partnerId: 1,
  partnerName: 'p',
  partner: {
    id: 1,
    name: '',
    nameVi: '',
    nameEn: '',
    nameKh: '',
    photoUrl: '',
    country: [],
    address: '',
    distanceFromHospital: '',
  },
  amenities: [],
  quantity: 1,
  tripType: 1,
  ...p,
})

const banner = (show: boolean): First100Banner => ({
  promo_code: 'FIRST100',
  show_banner: show,
  status: show ? 'ACTIVE' : 'ENDED',
  limit: 100,
  used: show ? 10 : 100,
  remaining: show ? 90 : 0,
  discount_percent: 50,
  title: '',
  description: '',
})

const calc = (addons: SelectedAddon[], bnr?: First100Banner) => {
  useBookingStore.getState().setData({
    addonServiceTypes: addons,
    first100Banner: bnr,
  })
  useBookingStore.getState().calcFeeInfo(0)
  return useBookingStore.getState().feeInfo
}

beforeEach(() => useBookingStore.getState().reset())

describe('CR-01: quantity × đơn giá', () => {
  it('combo (03) nhân theo số lượng', () => {
    const combo = mk({ id: 3, dataTypeCode: '03', price: 87, quantity: 2 })
    expect(lineTotalOf(combo)).toBe(174)
    expect(calc([combo]).serviceFee).toBe(174)
  })

  it('ưu tiên giá promotion khi > 0', () => {
    const combo = mk({
      id: 3,
      dataTypeCode: '03',
      price: 100,
      promotionPrice: 80,
      quantity: 2,
    })
    expect(lineTotalOf(combo)).toBe(160)
  })
})

describe('CR-02: giá theo chiều đi (1W/2W)', () => {
  const carBase = {
    id: 1,
    dataTypeCode: '01' as const,
    price: 27.5,
    originalPrice2: 50,
    promotionPrice2: 0,
  }
  it('một chiều dùng giá 1W', () => {
    expect(lineTotalOf(mk({ ...carBase, tripType: 1 }))).toBeCloseTo(27.5)
  })
  it('khứ hồi dùng originalPrice2 khi không có promo 2W', () => {
    expect(lineTotalOf(mk({ ...carBase, tripType: 2 }))).toBeCloseTo(50)
  })
  it('khứ hồi ưu tiên promotionPrice2 khi > 0', () => {
    expect(
      lineTotalOf(mk({ ...carBase, promotionPrice2: 40, tripType: 2 })),
    ).toBeCloseTo(40)
  })
})

describe('CR-02: hotel = Σ (số đêm × đơn giá)', () => {
  it('2 phòng, 2 đêm + 1 đêm', () => {
    const hotel = mk({
      id: 2,
      dataTypeCode: '02',
      price: 23.4,
      rooms: [
        { checkInDate: '2026-06-29', checkOutDate: '2026-07-01', nights: 2 },
        { checkInDate: '2026-06-29', checkOutDate: '2026-06-30', nights: 1 },
      ],
    })
    expect(lineTotalOf(hotel)).toBeCloseTo(70.2)
  })
})

describe('CR-02 §3.1: discount First100 (50% 1 vé xe 2 chiều)', () => {
  const combo = mk({ id: 3, dataTypeCode: '03', price: 87, promoEligible: true })
  const car2W = mk({
    id: 1,
    dataTypeCode: '01',
    price: 27.5,
    promotionPrice2: 40,
    promoEligible: true,
    tripType: 2,
  })

  it('áp dụng: gross 127 − 20 = 107', () => {
    const fee = calc([combo, car2W], banner(true))
    expect(fee.discount).toBeCloseTo(20) // 50% × 40
    expect(fee.serviceFee).toBeCloseTo(107)
  })

  it('KHÔNG áp dụng khi banner tắt', () => {
    const fee = calc([combo, car2W], banner(false))
    expect(fee.discount).toBe(0)
    expect(fee.serviceFee).toBeCloseTo(127)
  })

  it('KHÔNG áp dụng khi thiếu combo đủ điều kiện', () => {
    const fee = calc([car2W], banner(true))
    expect(fee.discount).toBe(0)
  })

  it('KHÔNG áp dụng cho xe một chiều', () => {
    const car1W = mk({ ...car2W, tripType: 1 })
    const fee = calc([combo, car1W], banner(true))
    expect(fee.discount).toBe(0)
  })

  it('KHÔNG áp dụng cho private car (05)', () => {
    const priv = mk({ ...car2W, id: 5, dataTypeCode: '05', promoEligible: false })
    const fee = calc([combo, priv], banner(true))
    expect(fee.discount).toBe(0)
  })

  it('chỉ giảm 1 vé dù mua 2 vé xe', () => {
    const car2Qty = mk({ ...car2W, quantity: 2 })
    const fee = calc([combo, car2Qty], banner(true))
    // gross = 87 + 40*2 = 167; discount 20 (chỉ 1 vé) → 147
    expect(fee.discount).toBeCloseTo(20)
    expect(fee.serviceFee).toBeCloseTo(147)
  })
})

describe('CR-01: clamp số lượng theo maxQuantity', () => {
  it('không vượt maxQuantity, không nhỏ hơn 1', () => {
    const car = mk({ id: 1, dataTypeCode: '01', maxQuantity: 3, quantity: 1 })
    useBookingStore.getState().setData({ addonServiceTypes: [car] })
    useBookingStore.getState().setAddonQuantity(1, 10)
    expect(useBookingStore.getState().addonServiceTypes?.[0].quantity).toBe(3)
    useBookingStore.getState().setAddonQuantity(1, 0)
    expect(useBookingStore.getState().addonServiceTypes?.[0].quantity).toBe(1)
  })
})
