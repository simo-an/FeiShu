const DayMS = 24 * 60 * 60 * 1000
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
  const dateList = []

  return dateList
}

/**
 * 获取下个月月头的日期（需要显示在当月的后面）
 * 从EW向前推(6-EW)天即是下个月开始的所有信息
 * @param date
 */
export function getNextHeadDateList(date: Date) {
  const dateList = []

  return dateList
}

/**
 * 获取当前月份所有日期
 * 1. 获取所在月份最后一天ED及其星期EW
 * 2. 从FD到ED即为当前月的所有日期
 * @param date
 */
export function getCurrMonthDateList(date: Date) {
}

function getMonthDateList(date: Date) {
  const prevDateList = getPrevTailDateList(date)
  const currDateList = getCurrMonthDateList(date)
  const nextDateList = getNextHeadDateList(date)

  return prevDateList.concat(currDateList).concat(nextDateList)
}

export default getMonthDateList