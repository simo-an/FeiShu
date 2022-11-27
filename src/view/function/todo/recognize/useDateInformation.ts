import {createOrRegexp, createRegexp} from "./createRegexp";

const dateTimeOffsetMap = {
  year:{
    "大前年":-3, "前年":-2, "去年":-1, "上一年":-1, "今年":0, "明年":1, "后年":2, "default":0
  },
  month:{
    "上个月":-1, "上月":-1, "这个月":0, "这月":0, "本月":0, "下个月":1, "下月":1, "default":0
  },
  week:{
    "上上周":-2, "上周":-1, "上个周":-1, "周": 0,"这周":0, "本周":0, "下周":1, "下个周":1, "下下周":2,
    "上星期":-1, "上个星期":-1, "星期":0, "这星期":0, "这个星期":0, "下个星期":1, "下星期":1,
    "上礼拜":-1, "上个礼拜":-1, "礼拜":0, "这礼拜":0, "这个礼拜":0, "下个礼拜":1, "下礼拜":1, "default":0
  },
  day:{
    "大前天":-3, "前天":-2, "前一天":-1, "昨天":-1, "昨日":-1,
    "今天":0, "今日":0, "现在":0,
    "明天":1, "明日":1, "后天":2, "大后天":3, "default":0
  },
  time:{
    "凌晨":2, "清晨":6, "早晨":7, "早上":10, "上午":10,
    "中午":12, "午后":13, "下午":15,
    "傍晚":18, "晚上":20, "晚":20, "深夜":23, "default":0
  }
}

const numberRegexpText = '[0-9零一二三四五六七八九十两]'
const yearRegexpText = `(${Object.keys(dateTimeOffsetMap.year).join("|")})`
const monthRegexpText = `(${Object.keys(dateTimeOffsetMap.month).join("|")})`
const weekRegexpText = `(${Object.keys(dateTimeOffsetMap.week).join("|")})`
const dayRegexpText = `(${Object.keys(dateTimeOffsetMap.day).join("|")})`
const timeRegexpText = `(${Object.keys(dateTimeOffsetMap.time).join("|")})`


let offsetRegexp: RegExp = null
let yearOffsetRegexp: RegExp = null
let monthOffsetRegexp: RegExp = null
let weekOffsetRegexp: RegExp = null
let dayOffsetRegexp: RegExp = null
let hourOffsetRegexp: RegExp = null
let minuteOffsetRegexp: RegExp = null
let yearRegexp: RegExp = null
let monthRegexp: RegExp = null
let weekRegexp: RegExp = null
let dayRegexp: RegExp = null
let timeRegexp: RegExp = null


function createTimeOffsetRegexp(): void {
  const yearText = `(${yearRegexpText}的*)`
  const monthText = `(${monthRegexpText}的*)`
  const weekText = `(${weekRegexpText}的?((周|星期|礼拜)?[一二三四五六日天末1-6]?的?))`
  const dayText = `(${dayRegexpText}的*)`
  const timeText = `(${timeRegexpText}的*)`

  const yearOffsetText = `((${numberRegexpText}+年[之以]?[前后])|(过了${numberRegexpText}+年))`
  const monthOffsetText = `((${numberRegexpText}+个?月[之以]?[前后])|(过了${numberRegexpText}+个?月))`
  const weekOffsetText = `((${numberRegexpText}+个?(周|星期|礼拜)[之以]?[前后])|(过了${numberRegexpText}+(周|星期|礼拜)))`
  const dayOffsetText = `((${numberRegexpText}+天[之以]?[前后])|(过了${numberRegexpText}+天))`
  const hourOffsetText = `((${numberRegexpText}+(小时[之以]?[前后]))|(过了${numberRegexpText}+小时))`
  const minuteOffsetText = `((${numberRegexpText}+分钟[之以]?[前后])|(过了${numberRegexpText}+分钟))`

  yearOffsetRegexp = createRegexp(yearOffsetText, 'g')
  monthOffsetRegexp = createRegexp(monthOffsetText, 'g')
  weekOffsetRegexp = createRegexp(weekOffsetText, 'g')
  dayOffsetRegexp = createRegexp(dayOffsetText, 'g')
  hourOffsetRegexp = createRegexp(hourOffsetText, 'g')
  minuteOffsetRegexp = createRegexp(minuteOffsetText, 'g')

  yearRegexp = createRegexp(yearText, 'g')
  monthRegexp = createRegexp(monthText, 'g')
  weekRegexp = createRegexp(weekText, 'g')
  dayRegexp = createRegexp(dayText, 'g')
  timeRegexp = createRegexp(timeText, 'g')

  offsetRegexp = createOrRegexp([
    yearText, yearOffsetText,
    monthText, monthOffsetText,
    weekText, weekOffsetText,
    dayText, dayOffsetText,
    timeText, hourOffsetText, minuteOffsetText,
  ], '+')
}

function useTimeOffsetRegexp() {
  if (!offsetRegexp) {
    createTimeOffsetRegexp()
  }
  offsetRegexp.lastIndex = 0
  yearOffsetRegexp.lastIndex = 0
  monthOffsetRegexp.lastIndex = 0
  weekOffsetRegexp.lastIndex = 0
  dayOffsetRegexp.lastIndex = 0
  hourOffsetRegexp.lastIndex = 0
  minuteOffsetRegexp.lastIndex = 0
  yearRegexp.lastIndex = 0
  monthRegexp.lastIndex = 0
  weekRegexp.lastIndex = 0
  dayRegexp.lastIndex = 0
  timeRegexp.lastIndex = 0

  return {
    offsetRegexp,
    yearOffsetRegexp,
    monthOffsetRegexp,
    weekOffsetRegexp,
    dayOffsetRegexp,
    hourOffsetRegexp,
    minuteOffsetRegexp,
    yearRegexp,
    monthRegexp,
    weekRegexp,
    dayRegexp,
    timeRegexp,
  }
}

function useDateTimeOffset(date: string, time: string) {
  if (!dateTimeOffsetMap[date]) {
    return 0
  }

  return dateTimeOffsetMap[date][time]
}

/////////////////////////////

const specialTimeMap = {"整": 0, "一刻":15, "半":30, "三刻":45}
let specialTimeRegexp: RegExp = null

function useSpecialTimeRegexp() {
  if (!specialTimeRegexp) {
    specialTimeRegexp = createRegexp(
      '((二十{1-4}?)|([十1]{0-9}?)|{0-9-2})点({special-time}|((({0-5}?十?{0-9}?)|(零?{0-9}))分?))?',
      'g',
      {
        "1-4": "[一二三四1-4]",
        "1-5": "[一二三四五1-5]",
        "1-7": "[一二三四五六日1-7]",
        "1-9": "[一二三四五六七八九十1-9]",
        "0-5": "[零一二三四五0-5]",
        "0-9": "[零一二三四五六七八九十0-9]",
        "0-9-2": "[零一二三四五六七八九十两0-9]",
        "special-time": Object.keys(specialTimeMap).join("|")
      })
  }
  specialTimeRegexp.lastIndex = 0

  return specialTimeRegexp
}

function useSpecialTime(date: string): number {
  return specialTimeMap[date]
}

/////////////////////////
const formatDateMap = {
  YYYY: "(20\\d{2})",  // 年份只考虑20XX年
  YY: "(\\d{2})",  // 年份只考虑20XX年
  MM: "(1[0-2]|0?[1-9])",
  dd: "(3[0-1]|[1-2][0-9]|0?[1-9])",
  hh: "(20|21|22|23|[0-1]?\\d)",
  mm: "([0-5]?\\d)",

  YSplit: "[-/年.,\\s]",
  YBackSplit: "[年.,\\s]?",

  MSplit: "[-/月.,\\s]",

  dFrontSplit: "[日号]",
  dSplit: "[-/日号.,\\s]",
  dBackSplit: "[日号.,\\s]?",

  hSplit: "[:点时]",
  mSplit: "[:分\s]",
}

const YYYYMMDDRegexpText = '({YYYY}{YSplit})({MM}{MSplit})({dd}{dBackSplit})'
const YYMMDDRegexpText = '({YY}{YSplit})({MM}{MSplit})({dd}{dBackSplit})'
const MMDDRegexpText = '({MM}{MSplit})({dd}{dBackSplit})'
const MMDDYYYYRegexpText = '({MM}{MSplit})({dd}{dSplit})({YYYY}{YBackSplit})'
const MMDDYYRegexpText = '({MM}{MSplit})({dd}{dSplit})({YYYY}{YBackSplit})'
const DDRegexpText = '({dd}{dFrontSplit})'

// 日期正则
let dateRegexp: RegExp = null
let YYYYMMDDRegexp: RegExp = null
let YYMMDDRegexp: RegExp = null
let MMDDRegexp: RegExp = null
let MMDDYYYYRegexp: RegExp = null
let MMDDYYRegexp: RegExp = null
let DDRegexp: RegExp = null

let HHMMRegexp: RegExp = null

function useFormatDateRegexp() {
  if (!dateRegexp) {
    YYYYMMDDRegexp = createRegexp(YYYYMMDDRegexpText, 'g', formatDateMap)
    YYMMDDRegexp = createRegexp(YYMMDDRegexpText, 'g', formatDateMap)
    MMDDRegexp = createRegexp(MMDDRegexpText, 'g', formatDateMap)
    MMDDYYYYRegexp = createRegexp(MMDDYYYYRegexpText, 'g', formatDateMap)
    MMDDYYRegexp = createRegexp(MMDDYYRegexpText, 'g', formatDateMap)
    DDRegexp = createRegexp(DDRegexpText, 'g', formatDateMap)

    dateRegexp = createOrRegexp([ // 顺序固定
      YYYYMMDDRegexpText,
      MMDDYYYYRegexpText,
      YYMMDDRegexpText,
      MMDDYYRegexpText,
      MMDDRegexpText,
      DDRegexpText,
    ],null,'g', formatDateMap)

    // 0. 1.
    HHMMRegexp = createRegexp('({hh}{hSplit})({mm}?{mSplit}?)', 'g', formatDateMap)
  }

  YYYYMMDDRegexp.lastIndex = 0
  YYMMDDRegexp.lastIndex = 0
  MMDDRegexp.lastIndex = 0
  MMDDYYYYRegexp.lastIndex = 0
  MMDDYYRegexp.lastIndex = 0
  DDRegexp.lastIndex = 0

  dateRegexp.lastIndex = 0

  HHMMRegexp.lastIndex = 0

  return {
    dateRegexp,
    YYYYMMDDRegexp,
    YYMMDDRegexp,
    MMDDRegexp,
    MMDDYYYYRegexp,
    MMDDYYRegexp,
    DDRegexp,

    HHMMRegexp,
  }
}

//////////////////////////
interface IDateTime {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  week?: number
}

function useCurrentDate(): IDateTime {
  const date = new Date()

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    week: date.getDay()
  }
}

function createDateTime(dateTime: IDateTime) {
  const date = new Date()

  if (dateTime.year >= 0) date.setFullYear(dateTime.year)
  if (dateTime.month >= 0) date.setMonth(dateTime.month - 1)
  if (dateTime.date >= 0) date.setDate(dateTime.date)

  if (dateTime.hour >= 0) date.setHours(dateTime.hour)
  if (dateTime.minute >= 0) date.setMinutes(dateTime.minute)

  date.setSeconds(0, 0)

  return date
}

function isEqualDate(date1: IDateTime, date2: IDateTime) {
  return date1.year === date2.year && date1.month === date2.month && date1.date === date2.date
}

///////////////////////
const dateSplitList = ['到', '至', '~', '-', '—', '——']
let dateSplitRegexp: RegExp = null

function useDateSplitRegexp() {
  if (!dateSplitRegexp) {
    dateSplitRegexp = createOrRegexp(dateSplitList)
  }
  dateSplitRegexp.lastIndex = 0

  return dateSplitRegexp
}

function useDateInformation() {
  return {
    isEqualDate,
    dateTimeOffsetMap,
    useTimeOffsetRegexp,
    useDateTimeOffset,
    useSpecialTimeRegexp,
    useSpecialTime,
    useFormatDateRegexp,
    createDateTime,
    useCurrentDate,
    useDateSplitRegexp,
  }
}

window['useDateInformation'] = useDateInformation

export default useDateInformation
