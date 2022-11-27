import {Container} from "typedi";
import MiniCalendar from './mini-calendar/calendar.vue';
import WeekCalendar from './week-calendar/calendar.vue';
import MonthCalendar from './month-calendar/calendar.vue';
import EventService from './service/event-service';
import MiniCalendarService from "./mini-calendar/service";
import WeekCalendarService from "./week-calendar/service";
import MonthCalendarService from "./month-calendar/service";

export function useCalendarComponent() {
  return {
    MiniCalendar,
    MonthCalendar,
    WeekCalendar
  }
}

export function useCalendarService() {
  const mini = Container.get(MiniCalendarService)
  const month = Container.get(MonthCalendarService)
  const week = Container.get(WeekCalendarService)
  const event = Container.get(EventService)

  return {
    miniCalendarService: mini,
    weekCalendarService: week,
    monthCalendarService: month,
    eventService: event,
  }
}

window['calendarService'] = useCalendarService()