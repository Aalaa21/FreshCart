import { Spinner } from "@/components/ui/spinner"

export default function LoadingComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="size-8 text-green-500"/>
    </div>
  )
}
