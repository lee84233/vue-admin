import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken, getUserName, setUserName, removeUserName } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    name: getUserName(),
    avatar: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    LOGOUT: (state) => {
      state.token = ''
      state.name = ''
      state.avatar = ''

      removeToken()
      removeUserName()
    }
  },
  actions: {
    // 登录
    login({ commit }, userInfo) {
      /**
       * ！！！仅供 无登录接口时 测试使用
       * ！！！登录接口正常，请使用下面注释的代码
       */
      return new Promise(resolve => {
        const token = 'test token'
        const userName = '测试用户'
        commit('SET_TOKEN', token)
        commit('SET_NAME', userName)
        setToken(token)
        setUserName(userName)
        resolve()
      })

      /**
       * 登录接口，缓存 token 和 userName
       * 登录接口正常，请使用该方法
       */
      // return new Promise((resolve, reject) => {
      //   login(userInfo).then(data => {
      //     commit('SET_TOKEN', data.token)
      //     commit('SET_NAME', data.userName)
      //     setToken(data.token)
      //     setUserName(data.userName)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 退出
    logout({ commit, state }) {
      // 请求 logout 接口
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('LOGOUT')
          resetRouter()
          resolve()
        }).catch(error => {
          /**
           * 退出接口异常时
           * 前端强制：清除数据，退出系统
           */
          commit('LOGOUT')
          resetRouter()
          reject(error)
        })
      })
    }
  }
}
