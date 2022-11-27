import recognizeLocation from "./recognizeLocation";
import recognizeTime from "./recognizeTime";

interface IRecognizeResult {
  locationList: Array<string>
  timeList: Array<Date>
}

function formatText(text: string, replace: string = ''): string {
  return text.replace(/[\s\r\n]/g, replace)
}

function useRecognize(text: string): IRecognizeResult {

  const formatted = formatText(text)

  console.time('recognizeLocation')
  const locationList = recognizeLocation(formatted)
  console.timeEnd('recognizeLocation')


  // 2022-02-02 14:40
  // 11.
  console.time('recognizeTime')
  const timeList = recognizeTime(formatText(text, ' '))
  console.timeEnd('recognizeTime')

  return { locationList, timeList }
}

export default useRecognize
