/** Cả API branch và doctor đều trả { morning, afternoon } với phần tử có `status`. */
export type ScheduleDayBuckets = {
  morning: { status: string }[]
  afternoon: { status: string }[]
}

export const checkEmptySchedule = (schedule: ScheduleDayBuckets | null | undefined) => {
  if (!schedule) return true
  if (!schedule.morning || !schedule.afternoon) return true
  if (schedule.morning.length === 0 && schedule.afternoon.length === 0)
    return true
  if (
    schedule.morning.every((item) => item.status === 'FULL') &&
    schedule.afternoon.every((item) => item.status === 'FULL')
  )
    return true
  return false
}
