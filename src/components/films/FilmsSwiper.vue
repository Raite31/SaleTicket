<template>
  <div class="swiper-container kerwin">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default {
  props: {
    loop: {
      type: Boolean, // 默认值是boolean类型
      default: true // 默认是true
    }
  },
  mounted () {
    // console.log("mounted")
    new Swiper('.kerwin', {
      // direction:"vertical", //垂直
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      loop: this.loop, // 这里靠的是上面props接收的值，就可以改变是否循环
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
