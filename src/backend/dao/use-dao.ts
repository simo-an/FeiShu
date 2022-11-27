import {Container} from "typedi";
import UserDao from "@/backend/dao/user-dao";
import CustomerDao from "@/backend/dao/customer-dao";
import ProgressDao from "@/backend/dao/progress-dao";
import EmployeeDao from "@/backend/dao/employee-dao";
import TodoDao from "@/backend/dao/todo-dao";

function useDao() {
  const userDao = Container.get(UserDao)
  const customerDao = Container.get(CustomerDao)
  const progressDao = Container.get(ProgressDao)
  const employeeDao = Container.get(EmployeeDao)
  const todoDao = Container.get(TodoDao)


  return {
    userDao,
    customerDao,
    progressDao,
    employeeDao,
    todoDao
  }
}

window['useDao'] = useDao

export default useDao