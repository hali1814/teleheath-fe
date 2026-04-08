import { Trans } from 'react-i18next'

export function TransNoResultsFor({ query }: { query: string }) {
  return (
    <Trans
      ns="search"
      i18nKey="noResultsFor"
      values={{ query }}
      components={{ italic: <span className="italic" /> }}
    />
  )
}

export function TransNoSuggestionsFor({ query }: { query: string }) {
  return (
    <Trans
      ns="search"
      i18nKey="noSuggestionsFor"
      values={{ query }}
      components={{ italic: <span className="italic" /> }}
    />
  )
}
