export function toDateStart(date: Date) {
  date.setHours(0, 0, 0, 0)

  return date
}

export function toTimeStart(date: Date) {
  return toDateStart(date).getTime()
}
