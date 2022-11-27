import {IEventInfo} from '../type'
import {getSaturday, getSunday, isEqualDay} from "../utils/date";
import {DayInterval} from "../utils/const";
import {Service} from "typedi";
import {ref} from "vue";
import BaseService from "@/service/BaseService";

@Service()
class EventService extends BaseService {
  private eventList = ref<Array<IEventInfo>>([])
  public eventMap = ref<Record<string, Array<IEventInfo>>>({}) // string 几月几日

  public isFinishedEventHidden = ref(false)
  public isUnFinishedEventHidden = ref(false)

  public get displayEventList(): Array<IEventInfo> {
    return this.eventList.value.filter(event => this.isDisplayEvent(event))
  }

  public isDisplayEvent(event: IEventInfo): boolean {
    if (event.isFinished && this.isFinishedEventHidden.value) {
      return false
    }
    if (!event.isFinished && this.isUnFinishedEventHidden.value) {
      return false
    }

    return true
  }

  public replaceEvent(eventList: Array<IEventInfo>) {
    this.eventList.value.length = 0
    this.eventList.value.push(...eventList)
    this.eventList.value.sort((e1, e2) => {
      return e1.startTime.getTime() - e2.startTime.getTime()
    }) // 事件按照开始时间排序

    this.eventMap.value = {}
    this.eventList.value.forEach(event => {
      const {startTime, endTime} = event

      let current = startTime

      while (true) {
        const timeText = `${current.getMonth() + 1}/${current.getDate()}`
        const dateEventList = this.eventMap[timeText] || []

        if (dateEventList.length === 0) {
          this.eventMap.value[timeText] = dateEventList
        }
        dateEventList.push(event)

        if ((current > endTime) || isEqualDay(current, endTime)) {
          break
        }
        current = new Date(current.getTime() + DayInterval)
      }
    })
  }

  public getWeekEventList(date: Date) {
    const sunday = getSunday(date)
    const saturday = getSaturday(date, true)

    return this.displayEventList.filter(event => {
      const {startTime, endTime} = event

      return !(endTime < sunday || startTime > saturday)
    })
  }

  public getDateEventList(date: Date): Array<IEventInfo> {
    const dateEventList = this.eventMap.value[`${date.getMonth() + 1}/${date.getDate()}`] || []

    return dateEventList.filter(event => this.isDisplayEvent(event))
  }

  public hideFinishedEvent(hidden: boolean) {
    this.isFinishedEventHidden.value = hidden
  }
  public hideUnFinishedEvent(hidden: boolean) {
    this.isUnFinishedEventHidden.value = hidden
  }
}

export default EventService
