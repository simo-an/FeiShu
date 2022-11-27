import {IEventInfo} from '../../../type'
import {getHorizontalDisplayEventList, IViewDateEvent} from '../../../utils'

/**
 * 获取页面展示事件列表
 * @param weekEventList 按开始时间排序的事件列表
 * @param itemWidth 事件显示宽度
 * @param itemHeight 事件区域高度
 * @param currentDate 当前时间
 */
export function getDisplayEventList(
  weekEventList: Array<IEventInfo>,
  itemWidth: number,
  itemHeight: number,
  currentDate: Date
): Array<IViewDateEvent> {
  return getHorizontalDisplayEventList(
    weekEventList,
    itemWidth, itemHeight - 40,
    currentDate
  )
}
