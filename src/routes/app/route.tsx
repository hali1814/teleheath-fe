import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getToken } from '#/stores/token'
import { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="bg-background">
      <Outlet />
    </div>
  )
}
