import Text from '#/components/text'
import { cn } from '#/lib/utils'
import { useState } from 'react'
import ExpandViewButton from '../common/ExpandViewButton'

export default function AboutHospital() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        About Hospital
      </Text>
      <div className="relative">
        <Text
          className={cn(
            'text-muted-foreground leading-[1.7] font-normal',
            expanded ? '' : 'line-clamp-6',
          )}
        >
          Tam Anh General Hospital System is a prestigious 5-star healthcare
          network in Vietnam, recognized for its excellence in medical
          examination, treatment, and patient-centered care. The system is
          supported by a team of highly experienced professors, specialists, and
          doctors with outstanding professional expertise and dedication to
          medical ethics.
        </Text>
        {!expanded && (
          <div className="flex justify-center absolute -bottom-1 left-0 right-0 h-[32px] bg-[linear-gradient(180deg,#FFFFFF00_0%,#FBFAFA_52.7%,#FAF9F9_88%,#F8F6F6_100%)]">
            <ExpandViewButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
        {expanded && (
          <div className="w-full flex justify-center">
            <ExpandViewButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
