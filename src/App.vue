<template>
  <div>
      <tabber ref="mytabber" v-show="$store.state.isTabbarShow"></tabber>

      <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import tabber from '@/components/Tabber'
Vue.use(Vant) // 全局注册组件，所以组件库里的组件拿来就能用了
export default {
  data () {
    return {

    }
  },
  components: {
    tabber
  }
}
</script>
<style lang="scss">
  // 这个class名是上面使用router-link，在网页选中时自动添加的，可自定义
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
  }
  ul{
    list-style: none;
  }
  section{
    padding-bottom: 2.7222rem;
  }

</style>
