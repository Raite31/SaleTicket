<template>
    <div>
        <!-- 这里的key值用于防止它渲染过早 -->
        <film-swiper :key="datalist.length">
            <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
              <img :src="data.imgUrl"/>
            </film-swiper-item>
        </film-swiper>
        <film-header class="sticky"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
// webpack
import filmSwiper from '@/components/films/FilmsSwiper'
import filmSwiperItem from '@/components/films/FilmsSwiperItem'
import filmHeader from '@/components/films/FilmsHeader'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    // this.datalist = ['1','2','3','4','5','6','7','8','9','10']
    axios.get('/banner.json').then(res => {
      console.log(res.data)
      this.datalist = res.data.banner
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>
<style lang="scss" scoped>
  .filmswiperitem{
    img{
      width: 100%;
      height: 100%;
    }
  }
  .sticky{
    position: sticky;
    top: 0px;
    background: #fff;
    z-index: 100;
  }
</style>
