import {ref} from "vue";
import {ICalendarDate} from "calendar";
import getMonthDateList, {
  getPrevMonthDate,
  getNextMonthDate,
  isEqualMonth
} from './getMonthDateList'

class CalendarService {
  public selectedDate = ref(new Date())
  public monthDateList = ref<ICalendarDate[]>([])

  public initMonthDateList() {
    this.updateMonthDateList()
  }

  public updateMonthDateList() {
    this.monthDateList.value = getMonthDateList(this.selectedDate.value)
  }

  public toNextMonth() {
    this.selectedDate.value = getNextMonthDate(this.selectedDate.value)

    this.updateMonthDateList()
  }
  public toPrevMonth() {
    this.selectedDate.value = getPrevMonthDate(this.selectedDate.value)

    this.updateMonthDateList()
  }

  public goBackToday() {
    this.toCertainDate(new Date())
  }

  public toCertainDate(date: Date) {
    if (!isEqualMonth(this.selectedDate.value, date)) {
      this.selectedDate.value = date
      this.updateMonthDateList()
    }

    this.selectedDate.value = date
  }
}

const calendarService = new CalendarService()

export default calendarService