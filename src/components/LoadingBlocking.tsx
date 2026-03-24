import Image from '#/components/image'
import Text from '#/components/text'
import { Spinner } from '#/components/ui/spinner'
import { useTranslation } from 'react-i18next'

interface LoadingBlockingProps {
  isLoading?: boolean
  label?: string
}

export default function LoadingBlocking({
  isLoading = true,
  label,
}: LoadingBlockingProps) {
  const { t } = useTranslation('common')

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-1200 flex items-center justify-center bg-background/85 backdrop-blur-[1px]"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex size-[84px] items-center justify-center rounded-full border border-primary/20 bg-white shadow-sm">
          <Spinner className="absolute size-10 text-primary" />
          <Image
            src="/logo.png"
            alt="logo"
            className="relative z-10 size-8 rounded-full object-contain"
            loading="eager"
          />
        </div>
        <Text size="base_14" className="font-medium text-primary">
          {label ?? t('entry.loadingLabel')}
        </Text>
      </div>
    </div>
  )
}
