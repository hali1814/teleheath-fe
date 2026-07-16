import { cn } from '#/lib/utils'
import Text from '#/components/text'

/**
 * Bộ tăng/giảm số lượng − [n] + (CR-01). Dùng ở ServiceCard (xe/combo) và ReviewStep.
 */
export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: {
  value: number
  min?: number
  max?: number
  onChange: (next: number) => void
  className?: string
}) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  const btn =
    'flex size-[28px] items-center justify-center rounded-[6px] text-[18px] leading-none text-[#334155] disabled:opacity-40'

  return (
    <div
      className={cn('flex items-center gap-[10px]', className)}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={btn}
        onClick={dec}
        disabled={value <= min}
        aria-label="decrease"
      >
        −
      </button>
      <div className="flex h-[28px] min-w-[36px] items-center justify-center rounded-[6px] border border-[#E2E2E2] px-[8px]">
        <Text size="sm_12" className="font-medium leading-none">
          {value}
        </Text>
      </div>
      <button
        type="button"
        className={btn}
        onClick={inc}
        disabled={value >= max}
        aria-label="increase"
      >
        +
      </button>
    </div>
  )
}
