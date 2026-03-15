import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/package/(commonLayout)/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/package/(commonLayout)/$id"!</div>
}
