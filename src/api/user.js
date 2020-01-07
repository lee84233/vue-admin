import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    loading: true
  })
}

// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    loading: true
  })
}
