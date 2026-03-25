import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getToken } from '#/stores/token'

export const Route = createFileRoute('/app')({
  component: App,
  beforeLoad: ({ location }) => {
    const path = location.pathname
    if (path === '/app/entry' || path.startsWith('/app/entry/')) {
      return
    }

    const token = getToken()
    if (!token) {
      throw redirect({ to: '/app/entry' })
    }
  },
})

function App() {
  return (
    <div className="bg-background">
      <Outlet />
    </div>
  )
}
