import Text from '#/components/text'
import First100BadgeImg from '#/assets/images/book-appointment/first100-badge.png'

/**
 * CR-02 §3.10 — Banner "First-time customer offer".
 * Chỉ render khi `show_banner === true` (caller kiểm soát việc mount).
 * Style bám Figma node 7244:7224 (viền primary #e22a36, nền dust-red-1 #fff1f0,
 * icon tem % dạng ảnh, title Medium primary, desc #64748B).
 */
export function First100Banner({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-[12px] rounded-[12px] border border-primary bg-dust-red-1 px-[12px] py-[8px]">
      <img
        src={First100BadgeImg}
        alt=""
        aria-hidden
        className="size-[24px] shrink-0"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Text size="sm_12" className="font-medium leading-[1.5] text-primary">
          {title}
        </Text>
        <Text size="sm_12" className="font-normal leading-[1.5] text-[#64748B]">
          {description}
        </Text>
      </div>
    </div>
  )
}
