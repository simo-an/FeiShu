export const DayMS = 24 * 60 * 60 * 1000
export const WeekMS = 7 * DayMS

const WeekMap = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六'
}

export interface IWeekDate {
  date: Date
  day: number
  week: number
  text: string
  isToday: boolean
}

export function isEqualDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}

function getEqualWeekList(date: Date): Array<IWeekDate> {
  const dateList: Array<IWeekDate> = []

  const dateTimes = date.getTime()
  const week = date.getDay()
  const today = new Date()

  // 获取前面的日期
  for (let i = week; i > 0; i--) {
    const currDate = new Date(dateTimes - DayMS * i)

    dateList.push({
      date: currDate,
      week: currDate.getDay(),
      day: currDate.getDate(),
      text: WeekMap[currDate.getDay()],
      isToday: isEqualDay(currDate, today)
    })

  }

  // 获取后面的日期
  for (let i = week; i < 7; i++) {
    const currDate = new Date(dateTimes + DayMS * (i - week))

    dateList.push({
      date: currDate,
      week: currDate.getDay(),
      day: currDate.getDate(),
      text: WeekMap[currDate.getDay()],
      isToday: isEqualDay(currDate, today)
    })

  }

  return dateList
}

export default getEqualWeekList