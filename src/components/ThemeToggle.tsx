import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

type ThemeMode = 'light' | 'dark'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation('common')
  const mode: ThemeMode = theme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    if (theme === 'system') {
      setTheme('light')
    }
  }, [setTheme, theme])

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setTheme(nextMode)
  }

  const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
  const label = t('theme.switchMode', {
    mode: t(`theme.${mode}`),
    nextMode: t(`theme.${nextMode}`),
  })

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-sm font-semibold text-(--sea-ink) shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
    >
      {t(`theme.${mode}`)}
    </button>
  )
}
