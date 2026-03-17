import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  Select,
} from '#/components/ui/select'
import { cn } from '#/lib/utils'

export default function InputSelect({
  className,
  placeholder,
  options,
}: {
  className?: string
  placeholder: string
  options: { label: string; value: string }[]
}) {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          'w-full border border-dust-red-1 px-[12px] py-[8px]',
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
