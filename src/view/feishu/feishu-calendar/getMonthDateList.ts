import {ICalendarDate} from "calendar";

const DayMS = 24 * 60 * 60 * 1000

/**
 * 判断两个日期是否是同一天
 * @param d1
 * @param d2
 */
export function isEqualDate(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}
/**
 * 判断两个日期是否是同一个月
 * @param d1
 * @param d2
 */
export function isEqualMonth(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
}

/**
 * 获取当月的第一天
 * @param date
 */
export function getFirstDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * 获取当月的最后一天
 * @param date
 */
export function getLastDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth()+1, 0)
}

/**
 * 获取上个月末尾的日期（需要显示在当月前面）
 * 1. 获取所在月份第一天FD及其星期FW（0表示星期日）
 * 2. 向前推FW天即是上个月末尾的所有日期
 * @param date
 */
export function getPrevTailDateList(date: Date) {
  const dateList: Array<ICalendarDate> = []
  const firstDate = getFirstDate(date)
  const firstDateTime = firstDate.getTime()
  const firstDateWeek = firstDate.getDay()

  for (let i=0; i<firstDateWeek; i++) {
    const currDate = new Date(firstDateTime - (i+1) * DayMS)

    dateList.unshift({
      date: currDate,
      isPrevMonth: true,
      day: currDate.getDate()
    })
  }

  return dateList
}

/**
 * 获取下个月月头的日期（需要显示在当月的后面）
 * 从EW向前推(6-EW)天即是下个月开始的所有信息
 * @param date
 * @param appendWeek 是否多获取一周
 */
export function getNextHeadDateList(date: Date, appendWeek: boolean) {
  const dateList: Array<ICalendarDate> = []

  const lastDate = getLastDate(date)
  const lastDateTime = lastDate.getTime()
  const lastDateWeek = lastDate.getDay()

  for (let i=0; i<(6-lastDateWeek) + (appendWeek ? 7 : 0); i++) {
    const currDate = new Date(lastDateTime + (i+1) * DayMS)

    dateList.push({
      date: currDate,
      isNextMonth: true,
      day: currDate.getDate()
    })
  }

  return dateList
}

/**
 * 获取当前月份所有日期
 * 1. 获取所在月份最后一天ED及其星期EW
 * 2. 从FD到ED即为当前月的所有日期
 * @param date
 */
export function getCurrMonthDateList(date: Date) {
  const dateList: Array<ICalendarDate> = []
  const firstDate = getFirstDate(date)
  const lastDate = getLastDate(date)

  const today = new Date()

  for (let i=1; i<lastDate.getDate()+1; i++) {
    const currDate = new Date(firstDate)
    currDate.setDate(i)

    dateList.push({
      date: currDate,
      isCurrMonth: true,
      day: currDate.getDate(),
      isToday: isEqualDate(currDate, today)
    })

  }

  return dateList
}

function getMonthDateList(date: Date) {
  const prevDateList = getPrevTailDateList(date)
  const currDateList = getCurrMonthDateList(date)

  const appendWeek = (prevDateList.length + currDateList.length) <= 35

  const nextDateList = getNextHeadDateList(date, appendWeek)

  return prevDateList.concat(currDateList).concat(nextDateList)
}

export function getNextMonthDate(date: Date) {
  const year = date.getFullYear()

  let nextYear = year
  let nextMonth = (date.getMonth() + 1) + 1
  let nextDay = date.getDate()

  if (nextMonth === 13) {
    nextYear += 1
    nextMonth = 1
  }

  const lastDay = new Date(nextYear, nextMonth, 0).getDate()

  if (nextDay > lastDay) { // 31 -> 30
    nextDay = lastDay
  }

  return new Date(`${nextYear}/${nextMonth}/${nextDay}`)

}

export function getPrevMonthDate(date: Date) {
  let prevYear = date.getFullYear()
  let prevMonth = (date.getMonth() + 1) - 1
  let prevDay = date.getDate()

  if (prevMonth === 0) {
    prevYear -= 1
    prevMonth = 12
  }

  const lastDay = new Date(prevYear, prevMonth, 0).getDate()

  if (lastDay < prevDay) { // 31 -> 30,29
    prevDay = lastDay
  }

  return new Date(`${prevYear}/${prevMonth}/${prevDay}`)
}

export default getMonthDateList