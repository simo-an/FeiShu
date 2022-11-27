import useDao from "../dao/use-dao";
import {toBase64} from "@/backend/utils/base64";
import UserEntity from "@/backend/entity/UserEntity";

class LoginDispatcher {
  static DISPATCHER: LoginDispatcher = new LoginDispatcher()

  public async login(username: string, password: string): Promise<UserEntity> {
    const {userDao} = useDao()

    const user = await userDao.getUserViaUserName(username)

    if (!user) {
      throw new Error('用户不存在')
    }
    if (user.password !== toBase64(password)) {
      throw new Error('登录密码错误')
    }

    return user
  }
}

export default LoginDispatcher