declare module 'calendar' {
  export interface ICalendarDate {
    date: Date
    day: number
    isToday?: boolean
    isPrevMonth?: boolean
    isCurrMonth?: boolean
    isNextMonth?: boolean
  }
}