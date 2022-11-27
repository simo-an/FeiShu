import useNumberExtractor from "./useNumberExtractor";
import useDateInformation from "./useDateInformation";
import useRegexp from "./useRegexp";

const timeOffsetList = [
  'yearOffset', 'monthOffset', 'weekOffset',
  'dayOffset', 'hourOffset', 'minuteOffset'
] as const
const timeNameList = ['year', 'month', 'week', 'day', 'time'] as const

type TDateTimeOffset = (typeof timeOffsetList)[number] | (typeof timeNameList)[number]

type PRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type IDateTimeOffsetText = PRecord<TDateTimeOffset, string>
interface IDateTimeOffset {
  yearOffset: number
  monthOffset: number
  weekOffset: number
  dayOffset: number
  timeOffset: number
  hourOffset: number
  minuteOffset: number
}

interface IBaseTimeMask { mask: string; text: string; value: IDateTimeOffset }

const {
  replaceHanziInTextToNumber
} = useNumberExtractor()
const {
  useCurrentDate,
  useDateTimeOffset,
  useTimeOffsetRegexp,
} = useDateInformation()

const {
  useTaggedRegexp, useNumberRegexp,
} = useRegexp()

const baseTimeMaskMap = new Map<`BASE_TIME_MASK_${string}_`, IBaseTimeMask>()

let INDEX = 0
function getIndexI(): string {
  let result = 'I'

  for(let i=0; i<INDEX; i++) {
    result = `${result}I`
  }

  INDEX ++

  return result
}

function getDateTimeOffset(offsetText: IDateTimeOffsetText): IDateTimeOffset {
  const offset: IDateTimeOffset = { // 与当前时间的偏差
    yearOffset: 0,
    monthOffset: 0,
    weekOffset: 0,
    dayOffset: 0,
    timeOffset: 0,
    hourOffset: 0,
    minuteOffset: 0,
  }

  Object.keys(offsetText).forEach((key: TDateTimeOffset) => {
    const text = offsetText[key]

    const value = replaceHanziInTextToNumber(text)
    const numList = useNumberRegexp(value)

    if (numList.length > 0 && value.includes('前')) {
      numList[0] = -numList[0]
    }

    if (key === 'week' || key === 'weekOffset') {
      if (key === 'weekOffset' && numList.length > 0) offset.weekOffset += numList[0]
      if (key === 'week' && numList.length === 0) offset.weekOffset += useDateTimeOffset(key, text)

      if (key === 'week' && numList.length > 0) {
        let week = value

        numList.forEach(num => (week = week.replace(num.toString(), '')))

        offset.dayOffset += numList[0]
        offset.weekOffset += useDateTimeOffset(key, week)

        if (offset.weekOffset === 0) { // 本周时
          offset.dayOffset = offset.dayOffset - (useCurrentDate().week || 7)
        }

        offsetText[key] = week
      }
    }

    if (key === 'year' || key === 'yearOffset') {
      if (key === 'year') offset.yearOffset += useDateTimeOffset(key, text)
      if (key === 'yearOffset' && numList.length > 0) offset.yearOffset += numList[0]
    }

    if (key === 'month' || key === 'monthOffset') {
      if (key === 'month') offset.monthOffset += useDateTimeOffset(key, text)
      if (key === 'monthOffset' && numList.length > 0) offset.monthOffset += numList[0]
    }

    if (key === 'day' || key === 'dayOffset') {
      if (key === 'day') offset.dayOffset += useDateTimeOffset(key, text)
      if (key === 'dayOffset' && numList.length > 0) offset.dayOffset += numList[0]
    }

    if (key === 'time') {
      offset.timeOffset = useDateTimeOffset(key, text)
    }

    if (key === 'hourOffset' || key === 'minuteOffset') {
      if (numList.length > 0) offset[key] = numList[0]
    }
  })

  return offset
}

function useBaseTimeParser(text: string) {
  let result = text

  const regexp = useTimeOffsetRegexp()
  const regexpMap = {
    yearOffset: regexp.yearOffsetRegexp,
    monthOffset: regexp.monthOffsetRegexp,
    weekOffset: regexp.weekOffsetRegexp,
    dayOffset: regexp.dayOffsetRegexp,
    hourOffset: regexp.hourOffsetRegexp,
    minuteOffset: regexp.minuteOffsetRegexp,
    year: regexp.yearRegexp,
    month: regexp.monthRegexp,
    week: regexp.weekRegexp,
    day: regexp.dayRegexp,
    time: regexp.timeRegexp,
  }
  const timeList = (result.match(regexp.offsetRegexp) ||[]).filter(time => !!time)

  baseTimeMaskMap.clear()

  timeList.forEach((time) => {
    const offset = useTaggedRegexp(time, regexpMap)

    Object.keys(offset).forEach((key: TDateTimeOffset) => {
      if (key === 'week') {
        offset[key] = offset[key].replace(/[天日末]/g, '七')
      }

      offset[key] = offset[key].replace('的', '')
    })

    const mask = `BASE_TIME_MASK_${getIndexI()}_` as const
    baseTimeMaskMap.set(mask, {
      mask,
      text: time,
      value: getDateTimeOffset(offset)
    })
    result = result.replace(time, mask)
  })

  INDEX = 0

  return {
    result,
    baseTimeMaskMap
  }
}

export default useBaseTimeParser
