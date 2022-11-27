
import {IEventInfo} from "@/view/function/calendar/component/calendar/type";
import TodoEntity from "@/backend/entity/TodoEntity";

let todoEventLength = 0

function toEvent(todo: TodoEntity): IEventInfo {
  const todoEvent = {
    id: todo.id,
    eventId: ++ todoEventLength,
    subject: todo.subject,
    startTime: todo.startTime,
    endTime: todo.endTime,
    isFullDay: todo.isFullDay,
    isUrgent: todo.isUrgent,
    isFinished: todo.isFinished,
    isOvertime: todo.endTime && (todo.endTime.getTime() < Date.now()),
    isNotReceived: false,
  }

  return todoEvent
}

/**
 * 将待办列表转化为显示在日历上的事件列表
 * 注意：考虑重复待办情况
 * @param todoList
 * @param endTime
 */
export function toEventList(todoList: Array<TodoEntity>): Array<IEventInfo> {
  const todoEventList: Array<IEventInfo> = []

  todoList.forEach(todo => {
    todoEventList.push(toEvent(todo))
  })

  return todoEventList
}
