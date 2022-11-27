import {Service} from "typedi";
import {useDataSource} from "@/backend/create-datasource";
import TodoEntity from "@/backend/entity/TodoEntity";

@Service()
class TodoDao {
  private todoRepository = useDataSource().getRepository(TodoEntity)

  public getTodoList(): Promise<TodoEntity[]> {
    return this.todoRepository.find()
  }

  public addTodo(todo: TodoEntity): Promise<TodoEntity> {
    return this.todoRepository.save(todo)
  }

  public updateTodo(todo: TodoEntity): Promise<TodoEntity> {
    return this.todoRepository.save(todo)
  }

  public deleteTodo(id: number): Promise<boolean> {
    return this.todoRepository.delete(id).then(() => true)
  }
}

export default TodoDao