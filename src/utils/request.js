/*
 * axios 实例封装
 * 通常一个实例对应一个代理
 * 如果有多个代理，可Copy该文件，修改 OPTION 对象，来对应多个Proxy代理
 *
 * @Author: Lee
 * @Date: 2018-03-03 11:25:19
 * @Last Modified by: Lee
 * @Last Modified time: 2019-08-13 16:20:48
 */

import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from '@/utils/nprogress'

/**
 * Request基本参数
 */
const OPTION = {
  // 接口基础路径和配置代理的路径
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间
  timeout: 30000,
  // 请求头
  // 请求头信息中不能出现中文
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // form data格式
    'Content-Type': 'application/json;charset=UTF-8' // json格式
  }
}

// Axios实例
const AXIOS_BASE = axios.create(OPTION)

// 请求拦截器
AXIOS_BASE.interceptors.request.use(
  (config) => {
    // 在发送请求之前处理
    // headers添加token
    if (store.getters.token) {
      config.headers[process.env.VUE_APP_HEADERS_TOKEN] = getToken()
    }
    return config
  },
  // 对请求错误处理
  (error) => Promise.reject(error)
)

// 响应拦截器
AXIOS_BASE.interceptors.response.use(
  // 对响应数据处理
  (response) => {
    const res = response.data
    if ([200, '200'].includes(res.code)) {
      // 接口状态为0，成功
      return res
    } else if ([401, '401'].includes(res.code)) {
      goLogin()
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  },
  (error) => {
    // 对响应错误处理
    if (error.message.includes('timeout')) {
      error.message = '请求超时'
    }

    if (error && error.response) {
      /* eslint-disable */
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未登录或登录超时，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错：${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 413:
          error.message = '解析失败';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          error.message = '请求错误';
      }
      /* eslint-enable */
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(`错误信息：${error.message}`); // eslint-disable-line
    }

    if (error.response.status === 401) {
      goLogin()
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 未登录提示
 */
function goLogin() {
  MessageBox.alert('您未登录或登录超时，请重新登录', '未登录', {
    confirmButtonText: '去登录',
    type: 'warning'
  }).then(() => {
    store.dispatch('user/logout').then(() => {
      location.reload()
    })
  })
}

/**
 * axios请求
 * @param {Object} object：options
 * @returns {Promise} Promise
 */
export default async function({
  baseURL = null,
  url,
  method = 'get',
  data = {},
  headers = {},
  loading = false
}) {
  loading === true && NProgress.start()
  method = method.toLowerCase() // 请求方法
  let params = {} // 与请求一起发送的 URL 参数

  // 请求参数
  if (['get', 'delete'].includes(method)) {
    params = data
    data = {}
  }

  // request 参数
  const option = {
    url,
    method,
    params,
    data,
    headers
  }

  // baseURL
  baseURL && (option.baseURL = baseURL)

  return new Promise((resolve, reject) => {
    AXIOS_BASE.request(option)
      .then(
        (response) => {
          loading === true && NProgress.done()
          resolve(response.data)
        },
        (error) => {
          loading === true && NProgress.done()
          reject(error)
        }
      )
      .catch((error) => {
        loading === true && NProgress.done()
        reject(error)
      })
  })
}
