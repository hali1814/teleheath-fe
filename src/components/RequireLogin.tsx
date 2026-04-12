import { useTranslation } from 'react-i18next'
import Image from '#/components/image'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { goBackToAppMobile } from '#/utils/auth'

export default function RequireLogin() {
  const { t } = useTranslation('common')

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6">
      <Image
        src="/logo.png"
        alt=""
        className="mx-auto h-14 w-14 object-contain"
        width={56}
        height={56}
      />

      <div className="flex max-w-[320px] flex-col gap-3 text-center">
        <Text size="xl_18" className="font-semibold text-text-primary">
          {t('requireLogin.title')}
        </Text>
        <Text
          size="sm_12"
          className="font-normal leading-relaxed text-[#64748B]"
        >
          {t('requireLogin.description')}
        </Text>
      </div>

      <Button
        variant="secondary"
        className="h-[45px] w-full max-w-[320px] rounded-full"
        onClick={goBackToAppMobile}
      >
        <Text size="base_14" className="font-medium text-white">
          {t('requireLogin.button')}
        </Text>
      </Button>
    </div>
  )
}
