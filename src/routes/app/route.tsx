import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: App,
})

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
