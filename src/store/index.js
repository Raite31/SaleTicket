import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // 公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemaList: [],
    isTabbarShow: true
  },
  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      // console.log('getCinemaData-action')
      // 这里的http请求本质上就是个promix对象，所以可以用then函数设置异步请求完成时要做的东西
      return http({
        // 根据state中的cityId获取影院列表
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8055032`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        // console.log(res.data.data.cinemas)
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  // 统一管理；被Devtool监控看，跟踪
  // 是更改状态的唯一方法
  // 只支持同步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
      // console.log(cityName)
    },
    changeCityId (state, cityId) { // 改cityId，改影院的电影院数据
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }

  }
})

// vuex管理保存公共状态，（分散在各个组件内的状态，统一管理），状态刷新后会丢状态
// vuex持久化 -todo

/** vuex项目应用
   1. 非父子的通信
   2. 后端数据的缓存快照，减少重复数据（不常变的数据）请求，减轻服务器压力，提高用户体验（异步）
*/
