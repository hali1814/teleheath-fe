import Image from '#/components/image'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

const MAX_IMAGE = 6

export default function GalleryImage({ images }: { images: string[] }) {
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('gallery')}
      </Text>
      <div className="w-full grid grid-cols-3 gap-[16px]">
        {images.length > 0 &&
          images.slice(0, MAX_IMAGE).map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt="gallery-image"
                className="h-[112px] rounded-[8px]"
              />
              {index === MAX_IMAGE - 1 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-[8px]">
                  <Text className="text-white leading-normal font-medium">
                    + {index + 1}
                  </Text>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
