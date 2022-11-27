import {IDateItem, IWeekItem} from '../type'
import {WeekInterval, WeekMap, DayInterval} from './const'

export function printFormatDate(date: Date) {
  if (!date) {
    return
  }
  console.warn(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
}

export function getTimeText(date: Date): string {
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${hour}:${minute}`
}

/**
 * 判断两天是否是同一天
 * @param day1
 * @param day2
 */
export function isEqualDay(day1: Date, day2: Date): boolean {
  return (day1.getFullYear() === day2.getFullYear()) &&
    (day1.getMonth() === day2.getMonth()) &&
    (day1.getDate() === day2.getDate())
}

/**
 * 判断两个日期是否在同一个星期
 * @param day1
 * @param day2
 */
export function isEqualWeek(day1: Date, day2: Date): boolean {
  const day1Time = day1.getTime()
  const day2Time = day2.getTime()

  if (Math.abs(day1Time - day2Time) > WeekInterval) {
    return false
  }

  if (isEqualDay(day1, day2)) {
    return true
  }

  if (day1Time > day2Time) {
    return day1.getDay() > day2.getDay()
  }

  if (day1Time < day2Time) {
    return day1.getDay() < day2.getDay()
  }

  return true
}

export function getSunday(date: Date, isEnd?: boolean) {
  const week = date.getDay()
  const day = new Date(date.getTime() - week * DayInterval)


  isEnd
    ? day.setHours(23, 59, 59, 999)
    : day.setHours(0, 0, 0, 0)

  return day
}

export function getSaturday(date: Date, isEnd?: boolean) {
  const week = date.getDay()

  const day = new Date(date.getTime() + (6 - week) * DayInterval)

  isEnd
    ? day.setHours(23, 59, 59, 999)
    : day.setHours(0, 0, 0, 0)

  return day
}

/**
 * 判断两天是否在同一个月
 * @param day1
 * @param day2
 */
export function isEqualMonth(day1: Date, day2: Date): boolean {
  return (day1.getFullYear() === day2.getFullYear()) &&
    (day1.getMonth() === day2.getMonth())
}

/**
 * 获取当月的第一天
 * @param date
 */
export function getFirstDate(date: Date): Date {
  return new Date(`${date.getFullYear()}/${date.getMonth() + 1}/1`)
}

/**
 * 获取当月的最后一天
 * @param date
 */
export function getLastDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * 获取指定日期所在月的天数
 * @param date 日期
 */
export function getDaysInOneMonth(date: Date): number {
  return getLastDate(date).getDate()
}

/**
 * 获取当月第一天的星期
 * @param date
 */
export function getWeekInFirstDate(date: Date): number {
  return getFirstDate(date).getDay()
}

/**
 * 获取下个月的当前天（09/07 -> 10/07）
 * @param date
 */
export function getNextMonthDate(date: Date): Date {
  const year = date.getFullYear()

  let nextYear = year
  let nextMonth = (date.getMonth() + 1) + 1
  let nextDay = date.getDate()

  if (nextMonth === 13) {
    nextYear = year + 1
    nextMonth = 1
  }

  // 考虑 31 -> 30 的情况
  const lastDay = new Date(nextYear, nextMonth, 0).getDate()

  if (nextDay > lastDay) {
    nextDay = lastDay
  }

  return new Date(`${nextYear}/${nextMonth}/${nextDay}`)
}

/**
 * 获取上个月的当前天（09/07 -> 08/07）
 * @param date
 */
export function getPrevMonthDate(date: Date): Date {
  const year = date.getFullYear()

  let prevYear = year
  let prevMonth = (date.getMonth() + 1) - 1
  let prevDay = date.getDate()

  if (prevMonth === 0) {
    prevYear = year - 1
    prevMonth = 12
  }

  // 考虑 31 -> 30 的情况
  const lastDay = new Date(prevYear, prevMonth, 0).getDate()

  if (prevDay > lastDay) {
    prevDay = lastDay
  }

  return new Date(`${prevYear}/${prevMonth}/${prevDay}`)
}

/**
 * 获取上个月末尾的日期（需要显示在当月前面）
 * @param date
 */
export function getPrevTailDateList(date: Date): Array<IDateItem> {
  const dateList: Array<IDateItem> = []
  const firstDateWeek = getWeekInFirstDate(date)
  const prevDate = getPrevMonthDate(date)
  const firstDay = getDaysInOneMonth(prevDate) - firstDateWeek + 1

  const prevYear = prevDate.getFullYear()
  const prevMonth = prevDate.getMonth() + 1

  const today = new Date()

  for (let i = 0; i < firstDateWeek; i++) {
    const currDate = new Date(`${prevYear}/${prevMonth}/${firstDay + i}`)

    dateList.push({
      id: i + 1,
      year: prevYear,
      month: prevMonth,
      day: firstDay + i,
      isToday: isEqualDay(currDate, today),
      inPrevMonth: true,
      date: currDate
    })
  }

  return dateList
}

/**
 * 获取下个月月头的日期（需要显示在当月的后面）
 * @param date
 */
export function getNextHeadDateList(date: Date): Array<IDateItem> {
  const dateList: Array<IDateItem> = []
  const firstDateWeek = getWeekInFirstDate(date)
  const nextDate = getNextMonthDate(date)

  // 当月和上月末尾总共的天数
  const dateLength = getDaysInOneMonth(date) + firstDateWeek
  const nextLength = 7 - dateLength % 7

  const nextYear = nextDate.getFullYear()
  const nextMonth = nextDate.getMonth() + 1

  const today = new Date()

  for (let i = 0; i < nextLength; i++) {
    const currDate = new Date(`${nextYear}/${nextMonth}/${i + 1}`)

    dateList.push({
      id: dateLength + i + 1,
      year: nextYear,
      month: nextMonth,
      day: i + 1,
      isToday: isEqualDay(currDate, today),
      inNextMonth: true,
      date: currDate
    })
  }

  return dateList
}

/**
 * 获取当前月份所有日期
 * @param date
 */
export function getCurrMonthDateList(date: Date): Array<IDateItem> {
  const dateList: Array<IDateItem> = []
  const dateLength = getDaysInOneMonth(date)
  const firstDateWeek = getWeekInFirstDate(date)

  const currYear = date.getFullYear()
  const currMonth = date.getMonth() + 1

  const today = new Date()

  for (let i = 0; i < dateLength; i++) {
    const currDateText = `${currYear}/${currMonth}/${i + 1}`
    const currDate = new Date(currDateText)

    dateList.push({
      id: i + 1 + firstDateWeek,
      year: currYear,
      month: currMonth,
      day: i + 1,
      isToday: isEqualDay(currDate, today),
      inCurrMonth: true,
      date: currDate
    })
  }

  return dateList
}

/**
 * 获取当前月显示的日期列表
 * @param date
 */
export function getDisplayDateList(date: Date): Array<IDateItem> {
  const prevDateList = getPrevTailDateList(date)
  const currDateList = getCurrMonthDateList(date)
  const nextDateList = getNextHeadDateList(date)

  return prevDateList.concat(currDateList).concat(nextDateList)
}

export function getNextWeekDate(date: Date): Date {
  return new Date(date.getTime() + WeekInterval)
}

export function getPrevWeekDate(date: Date): Date {
  return new Date(date.getTime() - WeekInterval)
}

/**
 * 根据当前日期获取其所在周列表
 * @param date
 */

export function getEqualWeekList(date: Date): Array<IWeekItem> {
  const weekList: Array<IWeekItem> = []
  const week = date.getDay()

  // 获取前面的日期
  for (let i = week; i > 0; i--) {
    const currDate = new Date(date.getTime() - DayInterval * i)

    weekList.push({
      id: week - i + 1,
      day: currDate.getDate(),
      week: currDate.getDay(),
      text: WeekMap[currDate.getDay()],
      isToday: isEqualDay(currDate, new Date()),
      date: currDate
    })
  }

  for (let i = week; i < 7; i++) {
    const currDate = new Date(date.getTime() + DayInterval * (i - week))

    weekList.push({
      id: i + 1,
      day: currDate.getDate(),
      week: currDate.getDay(),
      text: WeekMap[currDate.getDay()],
      isToday: isEqualDay(currDate, new Date()),
      date: currDate
    })
  }

  return weekList
}
