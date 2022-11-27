import UserEntity from "@/backend/entity/UserEntity";

export interface ILoginInfo {
  username: string
  password: string
  token?: string
}

function getObject(key: string) {
  return JSON.parse(localStorage.getItem(key))
}
function setObject(key: string, value: object) {
  return localStorage.setItem(key, JSON.stringify(value))
}

// 登录相关
export function setLoginInfo(loginInfo: ILoginInfo) {
  return setObject('LoginInfo', loginInfo)
}
export function getLoginInfo(): ILoginInfo {
  return getObject('LoginInfo')
}

// Token 相关
export function setToken(token: string) {
  localStorage.setItem('Token', token)
}
export function getToken() {
  return localStorage.getItem('Token')
}
export function clearToken() {
  setToken('')
}

// 用户信息
export function setUserInfo(userInfo: UserEntity) {
  return setObject('UserInfo', userInfo)
}

export function getUserInfo(): UserEntity {
  return getObject('UserInfo')
}