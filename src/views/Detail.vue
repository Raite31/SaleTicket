<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="10">
      {{ filmInfo.name }}
    </detail-header>
    <!-- <img :src="filmInfo.poster"/>  -->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dataFilter }}上映
        </div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="line-height: 15px"
          :class="isHidden ? 'hidden' : ''"
        >
          {{ filmInfo.synopsis }}
        </div>
        <!-- 动态class和动态class能共存 -->
        <div style="text-align: center">
          <i
            class="iconfont"
            @click="isHidden = !isHidden"
            :class="isHidden ? 'icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>
      <!-- 演职人员 -->
      <div>
        <div>演职人员</div>
        <detail-swiper :preview="3.5" name="actor">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.actors"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
            ></div>
            <div style="text-align: center; font-size: 12px">
              {{ data.name }}
            </div>
            <div style="text-align: center; font-size: 13px">
              {{ data.role }}
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
      <!-- 剧照 -->
      <div>
        <div>剧照</div>
        <detail-swiper :preview="2" name="photo">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.photos"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handlePreview(index)"
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/util/http'
import obj from '@/util/mixinObj'
import moment from 'moment'
import Vue from 'vue'
import detailHeader from '@/components/detail/DetailHeader'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperitem.vue'
import { ImagePreview } from 'vant'

moment.locale('zh-cn') // 设置成中文
console.log()
// import axios from 'axios'
// import http from '@/util/http'

// 过滤器知识点
Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
// 指令知识点
Vue.directive('scroll', {
  // 指令的回调函数
  inserted (el, binding) {
    // console.log(el)
    el.style.display = 'none'
    window.onscroll = () => {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true,
      duration: 0
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  mounted () {
    // 该语法糖拿到当前匹配的路由
    // console.log("detail created", this.$route.params.id);
    // axios利用id发请求到详情接口，获取详情数据，布局页面
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=5517812`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res.data)
      this.filmInfo = res.data.data.film
    })

    window.onscroll = () => {
      console.log('scroll')
      if (document.documentElement.scrollTop > 10) {
        console.log('显示')
      } else {
        console.log('隐藏')
      }
    }
  },
  destroyed () {
    window.onscroll = null
  }
}
</script>
<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 18.8889rem;
  background-size: cover;
  background-position: center;
}
.content {
  padding: 0.8333rem;
  .detail-text {
    color: #797d82;
    font-size: 13px;
    margin-top: 0.2222rem;
  }
}
.hidden {
  overflow: hidden;
  height: 30px;
}
.avatar {
  width: 100%;
  height: 4.7222rem;
  background-position: center;
  background-size: cover;
}
</style>
