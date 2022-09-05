import Vue from 'vue' // ES6导入方式
import App from './App.vue' // 导入根组件app
import router from './router'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router, // 访问：this.$router === router
  store, // 访问：this.$store === store
  render: h => h(App) // vue支持的新写法；render是渲染，把 App 实例化，在挂载到 #app 上，然后 #app再到index.html中的 <div id = "app">
}).$mount('#app')

// const obj = {
//   name: 'kerwin',
//   age: 100
// }
// console.log(obj)
