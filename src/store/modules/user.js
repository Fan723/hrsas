import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'
import { getUserDetailById, getUserInfo, login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      state.token = '' // 删除vuex的token
      removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = { ...userInfo }
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const res = await login(data)
      // console.log(res)
      context.commit('SET_TOKEN', res)
      // 写入时间戳
      setTimeStamp // 将当前的最新时间写入缓存
    },
    // 获取用户的资料
    async getUserInfo(context) {
      const result = await getUserInfo() // result就是用户的基本资料
      const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
      const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
      // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
      context.commit('SET_USER_INFO', baseResult) // 提交mutations
      // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
      return baseResult
    },
    // TODO 登出功能我还不会
    // 登出的action
    logout(context) {
      // 删除token
      context.commit('REMOVE_TOKEN') // 不仅仅删除了vuex中的 还删除了缓存中的
      // 删除用户资料
      context.commit('REMOVE_USERINFO') // 删除用户信息
    }
  }
}
