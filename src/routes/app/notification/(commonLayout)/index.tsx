import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/notification/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/hospital/"!</div>
}
