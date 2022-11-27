import {ref} from "vue";
import getEqualWeekList, {
  IWeekDate,
  isEqualDay,
  WeekMS
} from "./algorithm/getEqualWeekList";
import isEqualWeek from './algorithm/isEqualWeek'
import * as http from "http";

class WeekTodoService {
  public selectedDate = ref(new Date())
  public selectedWeekList = ref<Array<IWeekDate>>([])

  constructor() {}

  /**
   * 初始化周视图
   */
  public initWeekDateList() {
    this.selectedDate.value = new Date()
    this.selectedDate.value.setHours(0, 0, 0, 0)

    this.updateWeekDateList()
  }

  /**
   * 更新周视图日期
   */
  public updateWeekDateList() {
    this.selectedWeekList.value = getEqualWeekList(this.selectedDate.value)
  }

  /**
   * 切换到上一周
   */
  public toPrevWeek() {
    const prevDate = new Date(this.selectedDate.value.getTime() - WeekMS)
    this.selectedDate.value = prevDate

    this.updateWeekDateList()
  }

  /**
   * 切换到下一周
   */
  public toNextWeek() {
    const nextDate = new Date(this.selectedDate.value.getTime() + WeekMS)
    this.selectedDate.value = nextDate

    this.updateWeekDateList()
  }

  /**
   * 跳转到当前周
   */
  public toCurrentWeek() {
    this.toCertainDate(new Date())
  }

  /**
   * 调整到指定日期所在周
   * @param date
   */
  public toCertainDate(date: Date) {
    if (isEqualDay(date, this.selectedDate.value)) {
      return
    }

    !isEqualWeek(date, this.selectedDate.value) && this.updateWeekDateList()

    this.selectedDate.value = date
    this.selectedDate.value.setHours(0, 0, 0, 0)
  }
}

const weekTodoService = new WeekTodoService

window['weekTodoService'] = weekTodoService

export default weekTodoService