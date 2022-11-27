/**
 * 识别时间信息
 * @param text 原始文本
 * @return 文本中包含的时间信息列表
 * 性能 22317 字符 无缓存  有缓存
 */
import extractDateTime from "./useDateExtractor";

function recognizeTime(text: string): Array<Date> {
  return extractDateTime(text)
}

export default recognizeTime
