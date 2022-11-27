function useTaggedRegexp<T extends string>(
  text: string, regexpMap: Record<T, RegExp>
): Record<T, string> {
  const result: Record<string, string> = {}

  Object.keys(regexpMap).forEach(tag => {
    const matchedList = text.match(regexpMap[tag]) || []

    matchedList.forEach(matched => result[tag] = matched)
  })

  return result
}

function useNumberRegexp(text: string): Array<number> {
  const regexp = new RegExp('\\d+', 'g')
  const result = text.match(regexp) || []

  return result.map(result => parseFloat(result))
}


function useRegexp() {
  return {
    useTaggedRegexp,
    useNumberRegexp,
  }
}

export default useRegexp
