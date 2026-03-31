import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'
import { Spinner } from './ui/spinner'

export default function LoadingState({ className }: { className?: string }) {
  const { t } = useTranslation('common')

  return (
    <div
      className={cn(
        'h-[450px] w-full flex flex-col items-center justify-center gap-[8px]',
        className,
      )}
    >
      <Spinner className="size-9 text-primary" />
      <Text
        size="sm_12"
        className="uppercase tracking-wider text-muted-foreground"
      >
        {t('entry.loadingLabel')}
      </Text>
    </div>
  )
}
