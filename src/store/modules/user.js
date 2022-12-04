import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      state.token = '' // 删除vuex的token
      removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    }
  },
  actions: {
    async login(context, data) {
      const res = await login(data)
      console.log(res)
      context.commit('SET_TOKEN', res)
    }
  }
}
