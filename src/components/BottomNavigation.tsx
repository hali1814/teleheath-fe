import { Icon, type IconName } from './icon'
import Text from './text'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import footerPng from '#/assets/images/home/footer.png'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from '@tanstack/react-router'

const NavItem = ({
  icon,
  label,
  isActive,
  href,
}: {
  icon: IconName
  label: string
  isActive: boolean
  href: string
}) => {
  return (
    <Link
      to={href}
      className="flex-1 flex flex-col items-center justify-center gap-[8px]"
    >
      <Icon name={icon} color={isActive ? 'var(--primary)' : '#cccccc'} />
      <Text
        size="sm_12"
        className={cn(
          'text-center leading-[1.3]',
          isActive ? 'text-primary' : 'text-placeholder-input',
        )}
      >
        {label}
      </Text>
    </Link>
  )
}

export default function BottomNavigation() {
  const { pathname } = useLocation()
  const { t } = useTranslation(['common'])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 shadow-lg py-[14px]"
      style={{
        backgroundImage: `url(${footerPng})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative flex justify-between items-center">
        <NavItem
          icon="home"
          label={t('bottomNavigation.home')}
          isActive={pathname === '/app/home'}
          href="/app/home"
        />
        <NavItem
          icon="appointment"
          label={t('bottomNavigation.appointments')}
          isActive={pathname === '/app/appointments'}
          href="/app/appointments"
        />
        <Link
          to="/app/book-appointment"
          className="h-[47.6px] flex-1 flex flex-col items-center justify-end gap-[8px]"
        >
          <div
            className="absolute -top-[28px] w-[48px] h-[48px] rounded-full flex items-center justify-center"
            style={{
              background:
                'linear-gradient(to right, #E22A36, #E55752, #E78871)',
            }}
          >
            <Icon name="book" color="white" className="w-[24px] h-[24px]" />
          </div>
          <Text
            size="sm_12"
            className={cn(
              'text-center leading-[1.3]',
              pathname === '/app/book-appointment'
                ? 'text-primary'
                : 'text-placeholder-input',
            )}
          >
            {t('bottomNavigation.book')}
          </Text>
        </Link>
        <NavItem
          icon="history"
          label={t('bottomNavigation.history')}
          isActive={pathname === '/app/history'}
          href="/app/history"
        />
        <NavItem
          icon="profile"
          label={t('bottomNavigation.profile')}
          isActive={pathname === '/app/profile'}
          href="/app/profile"
        />
      </div>
    </div>
  )
}
