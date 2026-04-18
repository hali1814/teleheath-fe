import type { ReactNode } from 'react'
import PullToRefreshBase from 'react-simple-pull-to-refresh'
import { Spinner } from './ui/spinner'

type PullToRefreshProps = {
  onRefresh: () => Promise<unknown>
  children: ReactNode
}

export default function PullToRefresh({
  onRefresh,
  children,
}: PullToRefreshProps) {
  return (
    <PullToRefreshBase
      onRefresh={onRefresh}
      pullingContent=""
      refreshingContent={
        <div className="flex items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      }
      canFetchMore={false}
      resistance={3}
      maxPullDownDistance={80}
      className="relative z-0"
    >
      {children}
    </PullToRefreshBase>
  )
}
