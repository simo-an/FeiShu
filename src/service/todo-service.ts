import {ref} from "vue";
import {Service} from "typedi";
import TodoEntity from "@/backend/entity/TodoEntity";
import useDao from "@/backend/dao/use-dao";
import {ETodoViewMode} from "@/type/todo.type";
import BaseService from "@/service/BaseService";

@Service()
class TodoService extends BaseService {
  public todoViewMode = ref<ETodoViewMode>(ETodoViewMode.WEEK)

  public todoList: Array<TodoEntity> = []


  public async initTodoList() {
    const {todoDao} = useDao()

    return this.todoList = await todoDao.getTodoList()
  }

  public getTimeRangeTodoList(startTime: number, endTime: number) {
    return this.initTodoList()
  }

  public switchTodoViewMode(mode: ETodoViewMode) {
    this.todoViewMode.value = mode
    console.warn('switchTodoViewMode', this.todoViewMode.value)
  }

  public getTodoViaId(id: number) {
    return this.todoList.find(todo => todo.id === id)
  }

  public addTodo(todo: TodoEntity) {

  }

  public deleteTodo(todoId: number) {

  }

  public updateTodo(todo: TodoEntity) {

  }

  public finishTodo(todo: TodoEntity) {

  }

  public release() {

  }
}

export default TodoService