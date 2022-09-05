// 2- 对于数据请求的封装
// 好像测试接口的时候
import axios from 'axios'
import { Toast } from 'vant'

const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 1000,
  headers: {
    'X-Client-Info':
      '{"a":"3000","ch":"1002","v":"5.2.0","e":"16547926271098188777848833","bc":"500100"}'
  }
})

// 在发请求前拦截 -- showLoading
http.interceptors.request.use(
  function (config) {
    // console.log(config)
    Toast.loading({
      message: '加载中...',
      forbidClick: true, // 禁止点击关闭
      duration: 0
    })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 在成功后拦截 -- hideLoading
http.interceptors.response.use(
  function (response) {
    Toast.clear()
    return {
      ...response,
      aaa: 'Lee'
    }
  },
  function (error) {
    return Promise.reject(error)
    // eslint-disable-next-line no-unreachable
    Toast.clear()
  }
)
export default http
