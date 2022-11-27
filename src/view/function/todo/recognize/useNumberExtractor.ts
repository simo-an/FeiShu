import {createOrRegexp, createRegexp} from "./createRegexp";

const hanziNumberMap = {
  '一': 1, '二': 2, '三': 3,
  '四': 4, '五': 5, '六': 6,
  '七': 7, '八': 8, '九': 9,
  '零': 0, '两': 2, '半': 0.5
} as const
const numberHanziMap = {
  1: '一', 2: '二', 3: '三',
  4: '四', 5: '五', 6: '六',
  7: '七', 8: '八', 9: '九',
} as const

const hanziUnitMap = {
  '个': 1, '十': 10, '百': 100, '千': 1000
} as const

const hanziNumberList = Object.keys(hanziNumberMap)
const hanziUnitList = Object.keys(hanziUnitMap)

const hanziNumberRegexp = createOrRegexp(hanziNumberList)
const hanziUnitRegexp = createOrRegexp(hanziUnitList)
const hanziIntRegexp = createOrRegexp(hanziNumberList.concat(hanziUnitList), '+')
const hanziDecimalRegexp = createRegexp('{int}点{decimal}', 'g', {
  int: `(${hanziNumberList.concat(hanziUnitList).join('|')})+`,
  decimal: `(${hanziNumberList.join('|')})+`,
})
const mixedHanziRegexp = createRegexp('{frontNumber}{hanziUnit}{backNumber}', 'g', {
  frontNumber: '(\\d+(.\\d+)?)',
  hanziUnit: `(${hanziUnitList.join('|')})`,
  backNumber: '(\\d+)?'
})
/**
 * 将带单位字符串数字转化为阿拉伯数字 支持到千
 * @param text 一千五百零二
 * @return 1502
 */
function hanziIntWithUnitToNumber(text: string): number {
  let sum = 0

  if (text) {
    const kIndex = text.indexOf('千')
    let hIndex = text.indexOf('百')
    let tIndex = text.indexOf('十')
    let sIndex = text.indexOf('个')

    // 五十二千零二十二 -> 2112
    if (hIndex > 0 && hIndex < kIndex) {
      hIndex = text.lastIndexOf('百')
    }
    if (tIndex > 0 && (tIndex < hIndex || tIndex < kIndex)) {
      tIndex = text.lastIndexOf('十')
    }
    if (sIndex > 0 && (sIndex < tIndex || sIndex < hIndex || sIndex < kIndex)) {
      sIndex = text.lastIndexOf('个')
    }

    if (kIndex > 0) {
      sum += hanziNumberMap[text[kIndex-1]] * 1000
    }
    if (hIndex > 0 && hIndex > kIndex) {
      sum += hanziNumberMap[text[hIndex-1]] * 100
    }
    if (tIndex >= 0 && tIndex > hIndex) {
      sum += (tIndex === 0 ? 1 : hanziNumberMap[text[tIndex-1]]) * 10
    }
    if (sIndex > 0 && sIndex > tIndex && !hanziUnitList.includes(text[sIndex-1])) {
      sum += hanziNumberMap[text[sIndex-1]] * 1
    }
    if (hanziNumberList.includes(text[text.length - 1])) {
      sum += hanziNumberMap[text[text.length - 1]]
    }
  }

  return sum
}

function numberToHanziInt(int: number): string {
  let num = int
  let result = ''
  let index = 0

  while (num) {
    result = `${numberHanziMap[num%10]}${index === 0 ? '' : hanziUnitList[index]}` + result
    num = Math.floor(num / 10)
    index ++
  }

  return result
}

/**
 * 不带单位的汉字转数字
 * @param text 二零二二
 * @return 2022
 */
function hanziIntWithoutUnitToNumber(text: string): number {
  let sum = 0

  for (let i=0; i<text.length; i++) {
    sum = (sum * 10 + hanziNumberMap[text[i]])
  }

  return sum
}

/**
 * 将整数汉字数字转化为数字（区分有无单位）
 * @param text  一千五百零二 或 二零二二
 */
function hanziIntToNumber(text: string): number {
  if (hanziUnitRegexp.test(text)) {
    hanziUnitRegexp.lastIndex = 0

    return hanziIntWithUnitToNumber(text)
  }

  return hanziIntWithoutUnitToNumber(text)
}

/**
 * 将汉字小数转为数字
 * @param text 二十点二
 * @return 20.2
 */
function hanziDecimalToNumber(text: string): number {
  if (!text.includes('点')) {
    return hanziIntToNumber(text)
  }
  const [intText, decimalText] = text.split('点')
  const int = hanziIntToNumber(intText)
  const decimal = hanziIntToNumber(decimalText)

  return parseFloat(`${int}.${decimal}`)
}

/**
 * 使用阿拉伯数字替换字符串里面的中文数组
 * @param text 今天是二零二二年的第一天
 * @return 今天是2022年的第1天
 */
function replaceHanziInt(text: string): string {
  const hanziIntList = text.match(hanziIntRegexp) || []

  let result = text

  hanziIntList
    .filter(hanziInt => !hanziUnitList.includes(hanziInt))
    .forEach(hanziInt => {
    result = result.replace(hanziInt, hanziIntToNumber(hanziInt).toString())
  })

  return result
}

/**
 * 使用阿拉伯小数替换字符串里面的中文数组
 * @param text 答案是十二点五
 * @return 答案是12.5
 */
function replaceHanziDecimal(text: string): string {
  const hanziDecimalList = text.match(hanziDecimalRegexp) || []

  let result = text

  hanziDecimalList.forEach(hanziDecimal => {
    result = result.replace(hanziDecimal, hanziDecimalToNumber(hanziDecimal).toString())
  })

  return result
}

/**
 * 将阿拉伯数组与汉字混合文本替换成汉字数字
 * @param text 今年是2千零二年
 * @return 今年是两千零二年
 */
function replaceMixed(text: string): string {
  const mixedList = text.match(mixedHanziRegexp) || []

  let result = text

  mixedList.forEach(mixed => {
    mixed.match(/\d+/g).forEach(num => {
      result = result.replace(num, numberToHanziInt(parseInt(num)))
    })
  })

  return result
}

/**
 * 将文本中的中文字符串替换成阿拉伯数组
 * @param text 我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度
 * @return 我想订明天中午12点的餐馆，3人，走路1000多米能到，17.5万元以内，预留手机号为18619994211，明天23摄氏度
 */
function replaceHanziInTextToNumber(text: string): string {
  let result = text

  result = replaceHanziDecimal(result)  // 十七点五万元 -> 17.5万元
  result = replaceMixed(result)         // 1千多米 -> 1000多米
  result = replaceHanziInt(result)      // 三个人 -> 3个人

  return result
}

function useNumberExtractor() {
  return {
    replaceHanziInt,
    replaceHanziDecimal,
    replaceMixed,
    replaceHanziInTextToNumber
  }
}

export default useNumberExtractor



























