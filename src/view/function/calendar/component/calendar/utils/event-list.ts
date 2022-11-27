import {IEventInfo} from '../type'

export interface IViewDateEvent {
  style: {
    top: string
    left: string
    width: string
  }
  isHidden: boolean
  event: IEventInfo
}

export interface IFormatDate {
  year: number
  month: number
  day: number
  week: number
}

export function formatEventDate(date: Date): IFormatDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay()
  }
}

export function getArrayIndex(data: number, array: Array<number>, no: number = 0) {
  let result

  array.some((d, idx) => {
    const found = d === data && no === 0

    if (found) result = idx
    if (!found && idx > 0 && d < array[idx - 1]) no -= 1

    return found
  })

  return result
}

export function getDayListRange(
  startDate: IFormatDate,
  endDate: IFormatDate,
  currentDate: IFormatDate,
  dayList: Array<number>
) {
  const start = getArrayIndex(startDate.day, dayList, (startDate.month - currentDate.month + 13) % 12)
  const end = getArrayIndex(endDate.day, dayList, (endDate.month - currentDate.month + 13) % 12)

  return {start, end}
}

/**
 * 获取水平矩阵
 * @param monthEventList
 * @param date 当前日期
 * @param dayList 当前日期列表
 */
export function getHorizontalMatrix(monthEventList: Array<IEventInfo>, date: Date, dayList: Array<number>): Array<Array<number>> {
  const matrix: Array<Array<number>> = []

  const currentDate = formatEventDate(date)

  monthEventList.forEach((itemEvent) => {
    const startDate = formatEventDate(itemEvent.startTime)
    const endDate = formatEventDate(itemEvent.endTime)

    const range = getDayListRange(startDate, endDate, currentDate, dayList)

    let row = 0

    while (true) {
      let occupied = false

      if (!matrix[row]) matrix[row] = []

      for (let i = range.start; i <= range.end; i++) {
        occupied = occupied || !!matrix[row][i]
      }

      if (!occupied) break

      row += 1
    }

    for (let i = range.start; i <= range.end; i++) {
      matrix[row][i] = itemEvent.id
    }
  })

  return matrix
}

/**
 * 获取水平显示事件位置信息
 */
export function getHorizontalDisplayEventList(
  weekEventList: Array<IEventInfo>,
  itemWidth: number,
  itemHeight: number
): Array<IViewDateEvent> {
  if (weekEventList.length === 0) {
    return []
  }
}
