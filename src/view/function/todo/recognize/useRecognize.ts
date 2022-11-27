interface IRecognizeResult {
  locationList: Array<string>
  timeList: Array<Date>
}

function useRecognize(text: string): IRecognizeResult {
  return { locationList: [], timeList: [] }
}

export default useRecognize
