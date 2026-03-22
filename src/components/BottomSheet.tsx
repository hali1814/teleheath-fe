import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface BottomSheetProps {
  open: boolean
  children: React.ReactNode
  onClose: () => void
  title?: string
}

export function BottomSheet({
  open,
  children,
  onClose,
  title = '',
}: BottomSheetProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet
        open={open}
        onOpenChange={(next) => {
          if (!next) onClose()
        }}
        modal
      >
        <SheetContent
          side={'bottom'}
          showCloseButton={false}
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] bg-white rounded-t-3xl"
        >
          <SheetHeader>
            <SheetTitle className="text-text-primary font-semibold text-lg text-center">
              {title}
            </SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
