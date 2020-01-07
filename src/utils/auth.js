import Cookies from 'js-cookie'

const TokenKey = 'VUE_ADMIN_TOKEN'
const UserNameKey = 'VUE_ADMIN_USERNAME'

/**
 * token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token = '') {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * userName 用户名
 */
export function getUserName() {
  return Cookies.get(UserNameKey)
}
export function setUserName(userName = '') {
  return Cookies.set(UserNameKey, userName)
}
export function removeUserName() {
  return Cookies.remove(UserNameKey)
}

/**
 * 获取 http 中 header
 * 用于需要自定义 header 的组件中，如：Upload
 */
export function getHttpHeaders() {
  return {
    [process.env.VUE_APP_HEADERS_TOKEN]: getToken()
  }
}
