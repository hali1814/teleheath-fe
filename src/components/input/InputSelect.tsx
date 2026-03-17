import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  Select,
} from '#/components/ui/select'
import { cn } from '#/lib/utils'
import Text from '#/components/text'

export default function InputSelect({
  className,
  label = '',
  isRequired = false,
  placeholder,
  options,
  value,
  defaultValue,
  onValueChange,
}: {
  className?: string
  label?: string
  isRequired?: boolean
  placeholder: string
  options: { label: string; value: string }[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <Text size="base_14" className="text-text-secondary font-normal">
          {label}
          {isRequired ? <span className="text-primary ml-1">*</span> : null}
        </Text>
      ) : null}

      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={cn(
            'w-full h-[45px] rounded-[6px] border border-dust-red-1 bg-white px-[12px]',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="rounded-[8px]">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
