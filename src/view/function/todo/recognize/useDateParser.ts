interface IDate {
  year: number
  month: number
  day: number
}

interface IFormatDateMap {
  YYYYMMDD: Array<string>
  YYMMDD: Array<string>
  MMDD: Array<string>
  MMDDYYYY: Array<string>
  MMDDYY: Array<string>
  DD: Array<string>
}

interface ISTDDateMask { mask: string; text: string; value: IDate }

import useDateInformation from "./useDateInformation";

const {
  useCurrentDate,
  useFormatDateRegexp,
} = useDateInformation()

const stdDateMaskMap = new Map<`STD_DATE_MASK_${string}_`, ISTDDateMask>()

let INDEX = 0
function getIndexI(): string {
  let result = 'I'

  for(let i=0; i<INDEX; i++) {
    result = `${result}I`
  }

  INDEX ++

  return result
}

function getDateMap(text: string): IFormatDateMap {
  const dateMap = {
    YYYYMMDD: [], YYMMDD: [],
    MMDD: [], MMDDYYYY: [], MMDDYY: [],
    DD: []
  }

  const dateList = text.match(useFormatDateRegexp().dateRegexp) || []

  dateList.forEach((dateText) => { // 下面解析顺序是固定的
    const {
      YYYYMMDDRegexp, YYMMDDRegexp,
      MMDDRegexp, MMDDYYYYRegexp, MMDDYYRegexp,
      DDRegexp
    } = useFormatDateRegexp()

    if (YYYYMMDDRegexp.test(dateText)) return dateMap.YYYYMMDD.push(dateText)
    if (MMDDYYYYRegexp.test(dateText)) return dateMap.MMDDYYYY.push(dateText)
    if (YYMMDDRegexp.test(dateText)) return dateMap.YYMMDD.push(dateText)
    if (MMDDYYRegexp.test(dateText)) return dateMap.MMDDYY.push(dateText)
    if (MMDDRegexp.test(dateText)) return dateMap.MMDD.push(dateText)
    if (DDRegexp.test(dateText)) return dateMap.DD.push(dateText)
  })

  return dateMap
}

function getYearMonthDate(v1: number, v2?: number, v3?: number) {
  const baseline = useCurrentDate()

  if (!v2 && !v3) { // 04
    return {year: baseline.year, month: baseline.month, day: v1}
  }
  if (!v3) { // 12 04
    return {year: baseline.year, month: v1, day: v2}
  }
  if (v1 > 2000) { // 2022 12 04
    return {year: v1, month: v2, day: v3}
  }
  if (v3 > 2000) { // 12 04 2022
    return {year: v3, month: v1, day: v2}
  }

  const date1 = { year: v1 + 2000, month: v2, day: v3, date: -1 }
  const date2 = { year: v3 + 2000, month: v1, day: v2, date: -1 }

  if (v1 > 12) return date1 // 22 12 04
  if (v2 > 12) return date2 // 12 24 22

  date1.date = new Date(v1 + 2000, v2, v3).getTime()
  date2.date = new Date(v3 + 2000, v1, v2).getTime()

  const maxDate = date1.date >= date2.date ? date1 : date2
  const minDate = date1.date < date2.date ? date1 : date2

  if (minDate.date > Date.now()) {
    return minDate
  }
  if (maxDate.date < Date.now()) {
    return maxDate
  }

  return maxDate
}

function useDateParser(text) {
  let result = text

  const dateTextMap = getDateMap(text)

  const {
    YYYYMMDDRegexp, YYMMDDRegexp,
    MMDDRegexp, MMDDYYYYRegexp, MMDDYYRegexp,
    DDRegexp
  } = useFormatDateRegexp()

  const formatRegexpMap = {
    YYYYMMDD: YYYYMMDDRegexp,
    YYMMDD: YYMMDDRegexp,
    MMDD: MMDDRegexp,
    MMDDYYYY: MMDDYYYYRegexp,
    MMDDYY: MMDDYYRegexp,
    DD: DDRegexp
  }

  Object.entries(dateTextMap).forEach(([format, dateTextList]) => {
    const formatRegexp: RegExp = formatRegexpMap[format]

    if (!formatRegexp) {
      return
    }

    dateTextList.forEach(dateText => {
      const [, , v1, , v2, , v3] = formatRegexp.exec(dateText)
      const mask = `STD_DATE_MASK_${getIndexI()}_` as const
      const date = getYearMonthDate(
        parseFloat(v1 || '0'),
        parseFloat(v2 || '0'),
        parseFloat(v3 || '0')
      )

      stdDateMaskMap.set(mask, {
        mask,
        text: dateText,
        value: { year: date.year, month: date.month, day: date.day }
      })
      result = result.replace(dateText, mask)

      formatRegexp.lastIndex = 0
    })
  })

  INDEX = 0

  return {
    result,
    stdDateMaskMap
  }
}


export default useDateParser
