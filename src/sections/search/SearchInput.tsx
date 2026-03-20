import { Icon } from '#/components/icon'
import SearchBar from '#/components/SearchBar'
import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function SearchInput({
  onSearch,
}: {
  onSearch: (query: string) => void
}) {
  const router = useRouter()
  const { t } = useTranslation(['home', 'common'])

  return (
    <div className="w-full flex items-center gap-[10px] px-[16px] pt-[12px] pb-[8px]">
      <div onClick={() => router.history.back()}>
        <Icon
          name="arrow_left"
          className="w-[12px] h-[24px] text-text-secondary"
        />
      </div>
      <SearchBar
        placeholder={t('home:searchPlaceholder')}
        onSearch={onSearch}
      />
    </div>
  )
}
