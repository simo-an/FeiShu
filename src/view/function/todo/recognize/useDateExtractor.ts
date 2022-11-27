import useDateInformation from "./useDateInformation";
import useNumberExtractor from "./useNumberExtractor";
import useDateParser from "./useDateParser";
import useTimeParser from "./useTimeParser";
import useBaseTimeParser from "./useBaseTimeParser";

const {
  useSpecialTimeRegexp,
  useSpecialTime,
  createDateTime,
  isEqualDate,
  useCurrentDate,
  useDateSplitRegexp,
} = useDateInformation()
const {
  replaceHanziInt,
  replaceHanziInTextToNumber
} = useNumberExtractor()

let baseTimeMaskMap = null
let stdTimeMaskMap = null
let stdDateMaskMap = null

const maskRegexp = /(BASE|STD)_(TIME|DATE)_MASK_I+_/g

// 一点半 解析为 1:30
function parseSpecialTime(text: string) {
  let result = text
  const specialTimeRegexp = useSpecialTimeRegexp()

  const timeList = (result.match(specialTimeRegexp) || []).filter(time => !!time)

  timeList.forEach(time => {
    const [hour, minute] = time.replace('分', '').split('点')

    const hh = hour ? `${useSpecialTime(hour)|| replaceHanziInt(hour)}` : '00'
    const mm = minute ? `${useSpecialTime(minute)|| replaceHanziInt(minute)}` : '00'

    const timeText = `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`

    result = result.replace(time, timeText)
  })

  return result
}

// 获取解析的所有时间列表
function getDateTimeList(text: string) {

  console.warn(text)

  let result = text

  const dateTimeList: Array<Date> = []

  const timeList = result.match(maskRegexp) || []

  if (timeList.length === 0) {
    return dateTimeList
  }

  const textList = []

  timeList.forEach(time => {
    const [prev, next] = result.split(time)

    if (prev) {
      textList.push(prev)
    }
    textList.push(time)
    result = next
  })
  if (result) {
    textList.push(result)
  }

  const baseline = useCurrentDate()
  const dateTime = {
    year: -1, month: -1, date: -1,
    hour: -1, minute: -1
  }

  let hasBaseTime = false
  let hasSTDTime = false
  let hasSTDDate = false

  console.warn(textList)

  textList.forEach((text, index) => {
    if (baseTimeMaskMap.has(text)) {
      const {
        yearOffset, monthOffset, weekOffset, dayOffset,
        timeOffset, hourOffset, minuteOffset,
      } = baseTimeMaskMap.get(text).value

      hasBaseTime = true

      if (!hasSTDDate) {
        dateTime.year = yearOffset + baseline.year
        dateTime.month = monthOffset + baseline.month
        dateTime.date = dayOffset + baseline.date
      }
      if (!hasSTDTime) {
        if (isEqualDate(dateTime, baseline)) {
          dateTime.hour = hourOffset + baseline.hour
          dateTime.minute = minuteOffset + baseline.minute
        }

        if (weekOffset) {
          const baselineWeek = baseline.week || 7 // 0 -> 7

          dateTime.date = baseline.date + dayOffset + (weekOffset * 7 - baselineWeek)
        }
        if (timeOffset) {
          dateTime.hour = timeOffset
          dateTime.minute = 0
        }
      }

      return
    }
    if (stdTimeMaskMap.has(text)) {
      const stdTime = stdTimeMaskMap.get(text).value

      hasSTDTime = true

      if (hasBaseTime && dateTime.hour) {
        dateTime.hour = dateTime.hour > 12 && stdTime.hour < 12
          ? 12 + stdTime.hour
          : stdTime.hour
      } else {
        dateTime.hour = stdTime.hour
      }

      dateTime.minute = stdTime.minute

      return
    }
    if (stdDateMaskMap.has(text)) {
      const stdDate = stdDateMaskMap.get(text).value

      hasSTDDate = true

      dateTime.year = stdDate.year
      dateTime.month = stdDate.month
      dateTime.date = stdDate.day

      return
    }

    if (useDateSplitRegexp().test(text)) { // 包含分割词
      if (dateTime.year === -1) dateTime.year = baseline.year
      if (dateTime.month === -1) dateTime.month = baseline.month
      if (dateTime.date === -1) dateTime.date = baseline.date
      if (dateTime.hour === -1) dateTime.hour = baseline.hour
      if (dateTime.minute === -1) dateTime.minute = baseline.minute

      if (hasBaseTime || hasSTDTime || hasSTDDate) {
        dateTimeList.push(createDateTime(dateTime))
      }

      hasSTDTime = false
      hasSTDDate = false
    }
  })

  if (hasBaseTime || hasSTDTime || hasSTDDate) {
    dateTimeList.push(createDateTime(dateTime))
  }

  console.warn(dateTimeList)

  return dateTimeList
}

function extractDateTime(text: string) {
  let result = text

  const baseTimeParseResult = useBaseTimeParser(result)

  result = parseSpecialTime(baseTimeParseResult.result)
  result = replaceHanziInTextToNumber(result)

  const timeParseResult = useTimeParser(result)
  const dateParseResult = useDateParser(timeParseResult.result)

  baseTimeMaskMap = baseTimeParseResult.baseTimeMaskMap
  stdTimeMaskMap = timeParseResult.stdTimeMaskMap
  stdDateMaskMap = dateParseResult.stdDateMaskMap

  window['baseTimeMaskMap'] = baseTimeMaskMap
  window['stdTimeMaskMap'] = stdTimeMaskMap
  window['stdDateMaskMap'] = stdDateMaskMap

  window['baseTimeParseResult'] = baseTimeParseResult
  window['timeParseResult'] = timeParseResult
  window['dateParseResult'] = dateParseResult

  const dateTimeList = getDateTimeList(dateParseResult.result)

  return dateTimeList
}

export default extractDateTime
