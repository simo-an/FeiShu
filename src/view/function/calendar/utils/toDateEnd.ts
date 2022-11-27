export function toDateEnd(date: Date) {
  date.setHours(23, 59, 59, 999)

  return date
}

export function toTimeEnd(date: Date) {
  return toDateEnd(date).getTime()
}
