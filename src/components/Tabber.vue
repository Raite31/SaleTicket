<template>
  <footer>
    <!-- 重定向 -->
    <ul>
      <!-- 声明式导航 -->
      <!-- <li>
        <router-link to="/films" active-class="leeActvie">电影</router-link>
      </li>
      <li>
        <router-link to="/cinemas" active-class="leeActvie">影院</router-link>
      </li>
      <li>
        <router-link to="/center" active-class="leeActvie">我的</router-link>
      </li> -->

      <!-- 声明式导航 文档的固定写法 -->
      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'leeActive' : ''">
          <i class="iconfont icon-all"></i><span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'leeActive' : ''">
          <i class="iconfont icon-comments"></i><span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'leeActive' : ''">
          <i class="iconfont icon-account"></i><span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import '../assets/iconfont/iconfont.css'
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
footer {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.7222rem;
  background-color: white;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 1.3889rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      i {
        font-size: 20px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
.leeActive {
  color: red;
}
</style>
