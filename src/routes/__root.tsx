import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (!loader) return
    loader.style.transition = 'opacity 150ms ease-out'
    loader.style.opacity = '0'
    const timer = setTimeout(() => loader.remove(), 180)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Outlet />
      <Toaster position="top-center" />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
