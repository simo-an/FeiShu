interface ITime {
  hour: number
  minute: number
}

interface ISTDTimeMask { mask: string; text: string; value: ITime }

import useDateInformation from "./useDateInformation";

let INDEX = 0
function getIndexI(): string {
  let result = 'I'

  for(let i=0; i<INDEX; i++) {
    result = `${result}I`
  }

  INDEX ++

  return result
}

const {
  useFormatDateRegexp
} = useDateInformation()

const stdTimeMaskMap = new Map<`STD_TIME_MASK_${string}_`, ISTDTimeMask>()

function useTimeParser(text: string) {
  let result = text

  const {HHMMRegexp} = useFormatDateRegexp()
  const timeList = (result.match(HHMMRegexp) || []).filter(time => !!time)

  stdTimeMaskMap.clear()

  timeList.forEach((time) => {
    const [, ,hour, ,minute] = HHMMRegexp.exec(time)

    const mask = `STD_TIME_MASK_${getIndexI()}_` as const
    stdTimeMaskMap.set(mask, {
      mask,
      text: time,
      value: {
        hour: parseFloat(hour || '0'),
        minute: parseFloat(minute || '0'),
      }
    })
    result = result.replace(time, mask)

    HHMMRegexp.lastIndex = 0
  })

  INDEX = 0

  return {
    result,
    stdTimeMaskMap
  }

}

export default useTimeParser
