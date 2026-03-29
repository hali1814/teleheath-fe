import Text from '#/components/text'
import { Skeleton } from '#/components/ui/skeleton'
import { Link } from '@tanstack/react-router'

/** Thanh tìm kiếm home — bo tròn giống SearchBar */
export function HomeSearchSkeleton() {
  return (
    <Skeleton className="h-[45px] w-full rounded-[30px]" aria-hidden />
  )
}

/** Banner carousel — cùng chiều cao mặc định với SliderBanner (180px) */
export function HomeBannerSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton
        className="h-[180px] w-full rounded-[12px]"
        aria-hidden
      />
      <div className="flex justify-center gap-[6px]">
        <Skeleton className="h-1 w-6 rounded-full" />
        <Skeleton className="h-1 w-2 rounded-full" />
      </div>
    </div>
  )
}

/** Country tab — hộp bo 30px, hai ô trong */
export function HomeCountryTabSkeleton() {
  return (
    <div
      className="flex h-[45px] w-full items-center gap-1 rounded-[30px] bg-secondary/5 px-1"
      style={{
        boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.05) inset',
      }}
      aria-hidden
    >
      <Skeleton className="h-[37px] flex-1 rounded-[30px]" />
      <Skeleton className="h-[37px] flex-1 rounded-[30px]" />
    </div>
  )
}

/** Danh sách ngang: chỉ skeleton card (title + View all là tĩnh, truyền từ ngoài) */
export function HomeHorizontalSectionSkeleton({
  title,
  viewAllHref,
  viewAllLabel,
}: {
  title: string
  viewAllHref: string
  viewAllLabel: string
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between px-[16px]">
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {title}
        </Text>
        <Link to={viewAllHref}>
          <Text
            size="sm_12"
            className="font-medium leading-none text-dust-red-8"
          >
            {viewAllLabel}
          </Text>
        </Link>
      </div>
      <div className="flex gap-[14px] overflow-hidden pl-[16px]">
        <div className="flex w-[60%] max-w-[300px] shrink-0 flex-col gap-2">
          <Skeleton className="h-[96px] w-full rounded-[12px]" />
          <Skeleton className="h-3 w-[80%] rounded-md" />
          <Skeleton className="h-3 w-[60%] rounded-md" />
          <Skeleton className="mt-1 h-8 w-full rounded-[8px]" />
        </div>
        <div className="flex w-[60%] max-w-[300px] shrink-0 flex-col gap-2">
          <Skeleton className="h-[96px] w-full rounded-[12px]" />
          <Skeleton className="h-3 w-[80%] rounded-md" />
          <Skeleton className="h-3 w-[60%] rounded-md" />
          <Skeleton className="mt-1 h-8 w-full rounded-[8px]" />
        </div>
        <div className="w-[16px] shrink-0" />
      </div>
    </div>
  )
}

/** Lưới chuyên khoa 3 cột — chỉ skeleton ô; heading tĩnh */
export function HomeSpecialtyGridSkeleton({
  title,
  viewAllHref,
  viewAllLabel,
}: {
  title: string
  viewAllHref: string
  viewAllLabel: string
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between px-[16px]">
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {title}
        </Text>
        <Link to={viewAllHref}>
          <Text
            size="sm_12"
            className="font-medium leading-none text-dust-red-8"
          >
            {viewAllLabel}
          </Text>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-y-[36px] px-[16px] py-[10px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-[10px]"
          >
            <Skeleton className="size-[52px] shrink-0 rounded-full" />
            <Skeleton className="h-3 w-[72%] max-w-[80px] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
