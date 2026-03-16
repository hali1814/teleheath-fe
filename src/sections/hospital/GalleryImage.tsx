import Image from '#/components/image'
import Text from '#/components/text'

const MAX_IMAGE = 6

export default function GalleryImage() {
  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        Gallery
      </Text>
      <div className="w-full grid grid-cols-3 gap-[16px]">
        {Array.from({ length: MAX_IMAGE }).map((_, index) => (
          <div key={index} className="relative">
            <Image
              src="/thumbnail.png"
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
