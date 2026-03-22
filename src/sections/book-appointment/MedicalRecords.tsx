import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'

const MedicalFileItem = () => {
  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] bg-white">
      <Icon name="file" className="w-[16px] h-[20px] text-primary" />
      <div className="flex-1 flex flex-col gap-[4px]">
        <Text className="leading-normal font-medium text-[#333333]">
          Blood_Test_Report_Jan.pdf
        </Text>
        <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
          2.4 MB
        </Text>
      </div>
      <Icon name="close" className="w-[14px] h-[14px] text-[#B3B3B3]" />
    </div>
  )
}

export function MedicalRecords() {
  return (
    <div className="flex flex-col gap-[12px]">
      <Text size="lg_16" className="leading-[1.2] font-semibold text-[#333333]">
        Medical Records
      </Text>
      <Text className="leading-normal text-[#999999]">
        Providing your medical history helps our specialists prepare for your
        visit.
      </Text>
      <div
        className="h-[190px] border border-dashed border-dust-red-2 bg-dust-red-1
      rounded-[12px] flex flex-col gap-[20px] py-[24px]
      "
      >
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Icon name="upload" className="w-[30px] h-[30px] text-primary" />
          <Text className="leading-normal font-medium">
            Upload Medical Files
          </Text>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            PDF, JPG, PNG (Max 10MB)
          </Text>
        </div>
        <Button
          variant="secondary"
          className="self-center h-[33px] w-[140px] rounded-full"
        >
          <Text
            size="sm_12"
            className="w-full text-center font-medium text-white"
          >
            Select Files
          </Text>
        </Button>
      </div>
      <MedicalFileItem />
      <div className="flex flex-col gap-[10px]">
        <Text className="font-medium leading-normal text-[#333333]">
          Describe medical history manually
        </Text>
        <Textarea
          className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
          placeholder="Tell us more about your symptoms or medical history..."
        />
      </div>
      <Text size="lg_16" className="font-semibold leading-[1.2] text-[#333333]">
        Additional Notes
      </Text>
      <Textarea
        className="h-[92px] border-dust-red-1 bg-white rounded-[6px] px-[16px] py-[12px]"
        placeholder="Any other information you'd like to share?"
      />
    </div>
  )
}
