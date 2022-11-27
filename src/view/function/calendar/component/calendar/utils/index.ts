import {IEventInfo} from '../type'
import {getSaturday, getSunday, isEqualWeek} from "./date";

export interface IViewDateEvent {
  style: {
    top: string
    left: string
    width?: string
    height?: string
  }
  event: IEventInfo
  isHidden?: boolean
}

export function getEventWeekRange(event: IEventInfo, currentDate: Date): {start: number; end: number} {
  const {startTime, endTime} = event

  const sunday = getSunday(currentDate)
  const saturday = getSaturday(currentDate)

  const start = startTime.getDay()
  const end = endTime.getDay()

  if (isEqualWeek(startTime, endTime)) {
    return {start, end}
  }

  if (startTime < sunday && endTime > saturday) {
    return {start: 0, end: 6}
  }

  if (startTime < sunday) {
    return {start: 0, end}
  }

  if (endTime > saturday) {
    return {start, end: 6}
  }

  return {start: 0, end: 6}
}

/**
 * 获取水平显示事件位置信息
 */
export function getHorizontalDisplayEventList(
  weekEventList: Array<IEventInfo>,
  itemWidth: number,
  itemHeight: number,
  currentDate: Date
): Array<IViewDateEvent> {
  if (weekEventList.length === 0) {
    return []
  }

  const eventMap: Record<string, IViewDateEvent> = {}
  const eventMatrix = []
  let matrixRow = -1 // 行 0 - N
  const matrixCol = 6 // 列 0 - 6

  // 生成事件矩阵
  weekEventList.forEach((event) => {
    const {start, end} = getEventWeekRange(event, currentDate)

    let row = 0

    while (true) {
      let occupied = false

      if (!eventMatrix[row]) eventMatrix[row] = []

      for (let i = end; i >= start; i--) {
        occupied = occupied || !!eventMatrix[row][i]
      }

      if (!occupied) {
        break
      }
      row += 1
    }

    for (let week = start; week <= end; week++) {
      eventMatrix[row][week] = event.id
    }

    matrixRow = Math.max(matrixRow, row)
  })

  for (let row = 0; row <= matrixRow; row += 1) {
    if (eventMatrix[row].length === 0) {
      return
    }

    for (let week = 0; week <= matrixCol; week += 1) {
      const eventId = eventMatrix[row][week]

      if (!eventId || eventMap[eventId]) continue

      const event = weekEventList.find(e => e.id === eventId)
      const {start, end} = getEventWeekRange(event, currentDate)

      eventMap[eventId] = {
        event,
        style: {
          top: `${row * 20}px`,
          left: `${week * itemWidth + 4}px`,
          width: `${(end - start + 1) * itemWidth - 8}px`
        },
        isHidden: (row + 2) * 20 + 2 > itemHeight
      }
    }
  }

  return Object.values(eventMap)
}


export function getVerticalDisplayEventList(
  dateEventLst: Array<IEventInfo>,
  itemWidth: number,
  itemHeight: number
): Array<IViewDateEvent> {
  if (dateEventLst.length === 0) {
    return []
  }
  const DATE_SECTION = 4 // 每一个日期划分成4块

  const offsetMap: Record<string, {start: number; end: number}> = {}
  const eventMap: Record<string, IViewDateEvent> = {}
  const eventMatrix = []

  const matrixRow = 4 * 24 // 行 0 - N
  let matrixCol = -1 // 列 0 - N

  // 生成事件矩阵
  dateEventLst.forEach(dateEvent => {
    const {startTime, endTime} = dateEvent
    const startHour = startTime.getHours()
    const startMinute = startTime.getMinutes()

    const endHour = endTime.getHours()
    const endMinute = endTime.getMinutes()

    let start = Math.floor((startHour * DATE_SECTION) + (startMinute / 15))
    const end = Math.ceil((endHour * DATE_SECTION) + (endMinute / 15) - 1)

    // 开始时间和结束时间一致的事件显示一行 HardCode
    if (end < start) {
      start = end
    }

    offsetMap[dateEvent.id] = {start, end}

    let col = 0

    while (true) {
      let occupied = false // 当前列是否有占用

      if (!eventMatrix[col]) {
        eventMatrix[col] = []
      }

      for (let i = start; i <= end; i++) {
        occupied = occupied || !!eventMatrix[col][i]
      }

      if (!occupied) {
        break
      }

      col += 1
    }

    for (let i=start; i<=end; i++) {
      eventMatrix[col][i] = dateEvent.id
    }

    matrixCol = Math.max(matrixCol, col)
  })

  for (let col=0; col <= matrixCol; col++) {
    if (eventMatrix[col].length === 0) {
      return
    }

    for (let row=0; row<=matrixRow; row++) {
      const eventId = eventMatrix[col][row]

      if (!eventId || eventMap[eventId]) continue

      const event = dateEventLst.find(e => e.id === eventId)
      const {start, end} = offsetMap[eventId]

      // 判断是否可以向右占位
      let nextCol = col + 1

      while (nextCol <= matrixCol) {
        let occupied = false

        for (let i=start; i<=end; i++) {
          occupied = occupied || !!eventMatrix[nextCol][i]
        }

        if (occupied) {
          break
        }

        nextCol += 1
      }

      eventMap[eventId] = {
        event,
        style: {
          top: `${row * itemHeight / DATE_SECTION + 1}px`,
          left: `${col * itemWidth / (matrixCol + 1) + 2}px`,
          width: `${(nextCol - col) * itemWidth/(matrixCol+1) - (col + 1) * 2}px`,
          height: `${(end - start + 1) * itemHeight / DATE_SECTION - 2}px`
        }
      }
    }
  }

  return Object.values(eventMap)
}
