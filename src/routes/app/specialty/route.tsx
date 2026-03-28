import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/specialty')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/specialty"!</div>
}
