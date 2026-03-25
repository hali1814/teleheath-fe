import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Progress } from '#/components/ui/progress'
import { Header } from '../home'
import { useRouter } from '@tanstack/react-router'

export function StepLayout({
  title,
  children,
  onNext,
  onBack,
  step,
  total,
  disableNext,
  onSubmit,
}: any) {
  const router = useRouter()

  return (
    <div className="flex min-h-dvh flex-col relative bg-background pb-[103px]">
      <Header isHome={false} title={title} />
      {/* Header */}
      <div className="flex flex-col gap-[12px] px-[16px] py-[10px] mt-[16px]">
        <div className="flex justify-between items-center">
          <Text className="font-medium leading-normal">{title}</Text>
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground uppercase"
          >
            {`Step ${step + 1} of ${total}`}
          </Text>
        </div>
        <Progress
          value={((step + 1) / total) * 100}
          className="h-[6px] rounded-full bg-[#FADDDD]"
        />
      </div>

      {/* Content */}
      <div className="flex-1 mt-[20px]">{children}</div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center pt-[10px] pb-[32px] px-[20px] bg-background">
        <Button
          className="w-[120px] h-[45px] rounded-[40px] bg-[#FFFFFF] border border-[#F2F2F2]"
          onClick={() => {
            if (step > 0) {
              onBack()
            } else {
              router.history.back()
            }
          }}
        >
          <Text className="font-medium leading-normal text-placeholder-input">
            Back
          </Text>
        </Button>

        <Button
          className="w-[120px] h-[45px] rounded-[40px] bg-primary"
          onClick={() => {
            if (step === total - 1) {
              onSubmit()
            } else {
              onNext()
            }
          }}
          disabled={disableNext}
        >
          <Text className="font-medium leading-normal text-white">
            {step === total - 1 ? 'Book Now' : 'Continue'}
          </Text>
        </Button>
      </div>
    </div>
  )
}
