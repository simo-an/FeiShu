import {IDateItem} from '../../type'
import {
  getDisplayDateList,
  getNextMonthDate,
  getPrevMonthDate, isEqualDay,
  isEqualMonth
} from '../../utils/date'
import {ref} from "vue";
import {Service} from "typedi";
import BaseService from "@/service/BaseService";

@Service()
class MonthCalendarService extends BaseService {
  // 当前选中的月份
  public selectedDate = ref<Date>(new Date())
  public monthDateList = ref<Array<IDateItem>>([])
  // 是否标记与当前在同一周的日期
  public isEqualWeekMarked = ref(false)

  get dayList(): Array<number> {
    return this.monthDateList.value.map(date => date.day)
  }

  constructor() {
    super()
    this.initMonthDateList()
  }

  public initMonthDateList() {
    this.updateMonthDateList()
  }

  public updateMonthDateList() {
    this.monthDateList.value = getDisplayDateList(this.selectedDate.value)
  }

  public toNextMonth() {
    this.selectedDate.value = getNextMonthDate(this.selectedDate.value)
    this.updateMonthDateList()
  }

  public toPrevMonth() {
    this.selectedDate.value = getPrevMonthDate(this.selectedDate.value)
    this.updateMonthDateList()
  }

  public toCertainDate(date: Date) { // 跳到指定的一天
    if (isEqualDay(this.selectedDate.value, date)) {
      return
    }
    if (isEqualMonth(this.selectedDate.value, date)) {
      return this.selectedDate.value = date
    }

    this.selectedDate.value = date
    this.updateMonthDateList()
  }

  public toCurrentMonth() {
    this.selectedDate.value = new Date()
    this.updateMonthDateList()
  }

  public markEqualWeek() {
    this.isEqualWeekMarked.value = true
  }
  public unmarkEqualWeek() {
    this.isEqualWeekMarked.value = false
  }

  public release() {}
}


export default MonthCalendarService