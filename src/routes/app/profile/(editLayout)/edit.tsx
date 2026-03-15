import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(editLayout)/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/profile/(editLayout)/edit"!</div>
}
