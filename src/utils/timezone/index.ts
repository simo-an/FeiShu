/**
 * {year} 年 {month} 月 第 {week} 个星期 {day} 的 {hour} 点
 * 求上面描述的日期
 */
import {defaultTimeZone, TimeZoneItem, timeZoneList} from "./timezone-date";

export interface TimeZoneItemInfo extends TimeZoneItem {
  displayText?: string
  offsetTime?: number
  inCurrentTimeZone?: boolean
}

export const getDSTDate = (year: number, month: number, week: number, day: number, hour: number): number => {
  if (week === Infinity) {
    return getDSTDateOfLastWeek(year, month, day, hour)
  }

  const firstDay = new Date(`${year}-${String(month).padStart(2, '0')}-01 00:00`)

  const firstWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay()
  const firstOffset = day - firstWeek + 1
  const offsetDay = (week - 1) * 7 + (firstOffset > 0 ? firstOffset : 7 + firstOffset)

  firstDay.setDate(offsetDay)
  firstDay.setHours(hour)

  return firstDay.getTime()
}

/**
 * {year} 年 {month} 月 最后一个星期 {day} 的 {hour} 点
 * 求上面描述的日期
 */
export const getDSTDateOfLastWeek = (year: number, month: number, day: number, hour: number): number => {
  const currentDay = new Date(`${year}-${String(month).padStart(2, '0')}`)
  const lastDay = new Date(currentDay.getTime())

  for (let i=1; i<=31; i++) {
    currentDay.setDate(i)
    if (currentDay.getMonth() === lastDay.getMonth()) {
      const d = currentDay.getDay() === 0 ? 7 : currentDay.getDay()
      if (d === day) lastDay.setDate(i)
    }
  }

  lastDay.setHours(hour)

  return lastDay.getTime()
}

export const inDST = (timeZone: TimeZoneItem): boolean => {
  if (!timeZone.dstRule) return false

  const current = new Date()
  const { start, end } = timeZone.dstRule

  const offset = (timeZone.gmtOffset + current.getTimezoneOffset() * 60) * 1000

  const dstStartDate = getDSTDate(
    current.getFullYear(),
    start.month, start.week, start.day, start.hour
  ) - offset

  const dstEndDate = getDSTDate(
    current.getFullYear(),
    end.month, end.week, end.day, end.hour
  ) - offset

  return dstEndDate < dstStartDate
    ? Date.now() < dstEndDate || Date.now() > dstStartDate  // 取两头
    : Date.now() > dstStartDate && Date.now() < dstEndDate // 取中间
}

const getTimeZoneText = (offset: number): string => {
  const hour = String((Math.abs(offset) / 60 / 60) | 0).padStart(2, '0')
  const minute = String(((Math.abs(offset) / 60 / 60) % 1) * 60).padStart(2, '0')

  return `${offset >= 0 ? '+' : '-'}${hour}:${minute}`
}


export const getLocalTimeZone = (): TimeZoneItemInfo => {
  const current = new Date()

  const currentOffset = -current.getTimezoneOffset() * 60
  const augustOffset = -(new Date(current.getFullYear(), 8, 1).getTimezoneOffset()) * 60
  const decemberOffset = -(new Date(current.getFullYear(), 12, 1).getTimezoneOffset()) * 60

  let localTimeZone:TimeZoneItemInfo

  // 没有夏令时
  if (augustOffset === decemberOffset) {
    localTimeZone = timeZoneList.find((tz) => !tz.dstRule && tz.gmtOffset === currentOffset)

    if (localTimeZone) {
      localTimeZone.inDST = false
      localTimeZone.inCurrentTimeZone = true
    }
  } else {
    // 存在夏令时
    timeZoneList.find((tz) => {
      const isLocalTimeZone = (tz.gmtOffset === decemberOffset && tz.dstOffset === augustOffset)
        || (tz.gmtOffset === augustOffset && tz.dstOffset === decemberOffset)


      if (isLocalTimeZone) {
        localTimeZone = tz
        localTimeZone.inCurrentTimeZone = true
        localTimeZone.inDST = currentOffset === tz.dstOffset
      }

      return isLocalTimeZone
    })
  }

  if (!localTimeZone) { // 没有当前时区
    localTimeZone = defaultTimeZone
  }

  return localTimeZone
}

export function getTimezoneViaId(zoneId: string): TimeZoneItemInfo {
  const timezone: TimeZoneItemInfo = timeZoneList.find(tz => tz.zoneId === zoneId)

  timezone.inDST = inDST(timezone)

  return timezone
}

export function getWorkTimeRangeViaTimezone(zoneId: string) {
  const timezone = getTimezoneViaId(zoneId)
  const localTimezone = getLocalTimeZone()

  const timezoneOffset = timezone.inDST ? timezone.dstOffset : timezone.gmtOffset
  const localTimezoneOffset = localTimezone.inDST ? localTimezone.dstOffset : localTimezone.gmtOffset

  const offset = (localTimezoneOffset - timezoneOffset) / 60 / 60

  const startHour = `${(24 + 8 - offset) % 24}`.padStart(2, '0')
  const endHour = `${(24 + 17 - offset) % 24}`.padStart(2, '0')

  return `${startHour}:00 - ${endHour}:00 ${timezone.inDST ? '[夏令时]' : ''}`
}