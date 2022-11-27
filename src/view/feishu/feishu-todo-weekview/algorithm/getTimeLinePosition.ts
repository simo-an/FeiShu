interface ITimeLinePosition {
  top: number   // 时间线位置
  left: number  // 红点位置
}

const DayMinute = 24 * 60

/**
 * 获取时间线位置
 * @param date
 * @param width
 * @param height
 */
function getTimeLinePosition(date: Date, width: number, height: number): ITimeLinePosition {
  const minute = date.getMinutes()
  const hour = date.getHours()
  const week = date.getDay()

  const top = (24 * height) * ((hour * 60 + minute) / DayMinute)
  const left = week * width

  return { top, left }
}

export default getTimeLinePosition