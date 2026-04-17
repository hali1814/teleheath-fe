import LocationBadge from '#/components/LocationBadge'
import Text from '#/components/text'
import type { Package } from '#/entities/packageEntity'
import { useClampExpand } from '#/hooks/use-clamp-expand'
import { cn } from '#/lib/utils'
import { formatPrice } from '#/utils/price.util'
import ExpandViewButton from '../common/ExpandViewButton'

export default function InformationDetail({
  name,
  price,
  description,
  countryName,
  promotionPrice,
}: Pick<
  Package,
  'name' | 'price' | 'description' | 'countryName' | 'promotionPrice'
>) {
  const {
    ref: bodyRef,
    expanded,
    needsExpand,
    toggle,
  } = useClampExpand({
    contentKey: description,
  })

  const hasActiveDiscount = promotionPrice != null && price > promotionPrice

  return (
    <>
      <Text size="2xl_20" className="font-semibold leading-normal">
        {name}
      </Text>
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex min-w-0 flex-col gap-1',
            hasActiveDiscount ? 'flex-row items-center' : 'flex-col',
          )}
        >
          {hasActiveDiscount ? (
            <>
              <Text
                size="4xl_24"
                className="font-semibold leading-normal text-primary"
              >
                {formatPrice(promotionPrice)}
              </Text>
              <Text
                size="base_14"
                className="font-medium leading-normal text-muted-foreground line-through"
              >
                {formatPrice(price)}
              </Text>
            </>
          ) : (
            <Text
              size="4xl_24"
              className="font-semibold leading-normal text-primary"
            >
              {formatPrice(price)}
            </Text>
          )}
        </div>
        <LocationBadge
          location={countryName}
          className="shrink-0 text-muted-foreground leading-normal"
          textSize="base_14"
          iconSize="w-[20px] h-[20px]"
        />
      </div>
      <div className="relative">
        <div
          ref={bodyRef}
          className={cn(
            'text-base text-muted-foreground leading-[1.7] font-normal',
            expanded ? '' : 'line-clamp-5',
          )}
        >
          {description}
        </div>
        {needsExpand && !expanded && (
          <div
            className="flex justify-center absolute -bottom-1 left-0 right-0 h-[32px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(251, 250, 250, 0.527027) 30.5%, rgba(250, 249, 249, 0.88) 61%, #F8F6F6 80.45%)',
            }}
          >
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
        {needsExpand && expanded && (
          <div className="w-full flex justify-center">
            <ExpandViewButton expanded={expanded} onClick={toggle} />
          </div>
        )}
      </div>
    </>
  )
}
