import MenuItem from '#/components/MenuItem'
import { useTranslation } from 'react-i18next'

export default function MenuList() {
  const { t } = useTranslation(['home'])

  return (
    <div className="flex gap-[16px]">
      <MenuItem
        icon="medical_services"
        title={t('menu.bookingOffline')}
        variant="solid"
        className="flex-1"
      />
      <MenuItem
        icon="call_doctor"
        title={t('menu.onlineDoctor')}
        variant="outline"
        className="flex-1"
      />
      <MenuItem
        icon="chat_ai"
        title={t('menu.aiChatbot')}
        variant="outline"
        className="flex-1"
      />
    </div>
  )
}
