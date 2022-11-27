import {Container} from "typedi";
// import LoginService from "@/service/login-service";
// import UserService from "@/service/user-service";
import ElectronService from "@/service/electron-service";
// import CustomerService from "@/service/customer-service";
// import ProgressService from "@/service/progress-service";
// import SettingService from "@/service/setting-service";
// import TodoService from "@/service/todo-service";

function useService() {
  // const loginService = Container.get(LoginService)
  // const userService = Container.get(UserService)
  const electronService = Container.get(ElectronService)
  // const customerService = Container.get(CustomerService)
  // const progressService = Container.get(ProgressService)
  // const settingService = Container.get(SettingService)
  // const todoService = Container.get(TodoService)

  return {
    // loginService,
    // userService,
    electronService,
    // customerService,
    // progressService,
    // settingService,
    // todoService,
  }
}

export default useService

window['useService'] = useService

Reflect.ownKeys(useService()).forEach(key => window[key] = useService()[key])

