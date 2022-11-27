export interface IEventInfo {
  id: number // 当前事件的唯一标识
  eventId: number // 当前事件的ID（重复事件时可以重复）
  subject: string // 时间主题
  startTime?: Date // 开始时间
  endTime?: Date   // 结束时间
  isFullDay?: boolean // 是否是全天事件
  isUrgent?: boolean  // 是否是紧急事件
  isFinished?: boolean // 事件是否已完成
  isOvertime?: boolean // 事件是否已逾期
  isNotReceived?: boolean // 是否是未接收事件
}

export interface IDateItem {
  id: number
  date: Date
  year: number
  month: number
  day: number
  isToday: boolean
  inPrevMonth?: boolean
  inCurrMonth?: boolean
  inNextMonth?: boolean
}

export interface IWeekItem {
  id: number
  day: number
  week: number
  text: string
  isToday: boolean
  date: Date
}

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