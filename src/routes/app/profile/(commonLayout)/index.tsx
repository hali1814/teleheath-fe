import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/package/(commonLayout)/"!</div>
}
