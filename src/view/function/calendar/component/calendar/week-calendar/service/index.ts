import {
  getEqualWeekList,
  getNextWeekDate,
  getPrevWeekDate,
  isEqualDay,
  isEqualWeek
} from "../../utils/date";
import {IWeekItem} from "../../type";
import {IEventInfo} from "../../type";
import {ref} from "vue";
import {Service} from "typedi";
import BaseService from "@/service/BaseService";

@Service()
class WeekCalendarService extends BaseService {
  public selectedDate = ref<Date>(new Date())
  public selectedWeekList = ref<Array<IWeekItem>>([])
  // 事件列表
  public weekEventList = ref<Array<IEventInfo>>([])

  constructor() {
    super()
    this.initWeekDateList()
  }

  public initWeekDateList() {
    this.updateWeekDateList()
  }

  public updateWeekDateList() {
    this.selectedWeekList.value = getEqualWeekList(this.selectedDate.value)
  }

  public toPrevWeek() {
    this.toCertainDate(getPrevWeekDate(this.selectedDate.value))
    this.updateWeekDateList()
  }

  public toNextWeek() {
    this.toCertainDate(getNextWeekDate(this.selectedDate.value))
    this.updateWeekDateList()
  }

  public toCurrentWeek() {
    this.toCertainDate(new Date())
    this.updateWeekDateList()
  }

  public toCertainDate(date: Date) {
    if (isEqualDay(date, this.selectedDate.value)) {
      return
    }

    const needUpdate = !isEqualWeek(this.selectedDate.value, date)

    this.selectedDate.value = date
    this.selectedDate.value.setHours(0, 0, 0, 0)

    if (needUpdate) {
      this.updateWeekDateList()
    }
  }

  public release() {
    this.weekEventList.value.length = 0
  }
}

export default WeekCalendarService