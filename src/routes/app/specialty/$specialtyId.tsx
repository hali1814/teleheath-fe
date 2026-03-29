import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/specialty/$specialtyId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/specialty/$specialty"!</div>
}
