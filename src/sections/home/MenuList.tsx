import type { IconName } from '#/components/icon'
import MenuItem from '#/components/MenuItem'
import { useTranslation } from 'react-i18next'

export default function MenuList() {
  const { t } = useTranslation(['home'])

  const MENU_ITEMS: {
    icon: IconName
    title: string
    href: string
    variant: 'solid' | 'outline'
  }[] = [
    {
      icon: 'medical_services',
      title: t('menu.bookingOffline'),
      href: '/app/book-offline',
      variant: 'solid',
    },
    {
      icon: 'call_doctor',
      title: t('menu.onlineDoctor'),
      href: '/app/doctor',
      variant: 'outline',
    },
    {
      icon: 'chat_ai',
      title: t('menu.aiChatbot'),
      href: '/app/ai-chatbot',
      variant: 'outline',
    },
  ]

  return (
    <div className="flex gap-[16px]">
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.href}
          icon={item.icon}
          title={item.title}
          href={item.href}
          variant={item.variant}
          className="flex-1"
        />
      ))}
    </div>
  )
}
