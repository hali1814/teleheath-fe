import { createFileRoute, redirect } from '@tanstack/react-router'

/** `/app` → token đã được parent `/app` route kiểm tra → đưa về home */
export const Route = createFileRoute('/app/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/home' })
  },
})
