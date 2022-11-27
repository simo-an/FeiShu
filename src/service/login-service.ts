import {reactive, ref} from "vue";
import sleep from "@/utils/sleep";
import {
  clearToken,
  getLoginInfo,
  getToken,
  setLoginInfo,
  setToken, setUserInfo
} from "@/utils/local-storage";
import {loginDispatcher} from "@/backend/web";
import {Service} from "typedi";
import useService from "@/service/useService";

@Service()
class LoginService {
  public username: string = ''
  public password: string = ''
  public token = ref('')

  get isLogged() { return !!this.token.value }

  constructor() {
    const loginInfo = getLoginInfo()
    if (loginInfo) {
      this.username = loginInfo.username
      this.password = loginInfo.password
    }
    this.token.value = getToken()
  }

  public async login(username: string, password: string): Promise<void> {
    await sleep(300)

    const userInfo = await loginDispatcher.login(username, password)

    useService().userService.userInfo = userInfo

    this.username = username
    this.password = password
    this.token.value = `${username}-${password}`

    setLoginInfo({username, password})
    setUserInfo(userInfo)
    setToken(this.token.value)
  }

  public async logout() {
    this.token.value = ''

    clearToken()
  }
}

export default LoginService
