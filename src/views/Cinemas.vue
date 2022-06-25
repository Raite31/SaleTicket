<template>
  <div>
    <van-nav-bar
      title="影院"
      ref="navbar"
      @click-left="handleLeft"
      @click-right="handleRight"
    >
      <template #left>
        {{ cityName }}
        <van-icon name="arrow-down" />
      </template>
      <template #right>
        <van-icon name="search" size="28" color="black" />
      </template>
    </van-nav-bar>

    <div
      class="box"
      :style="{
        height: height,
      }"
    >
      <ul>
        <li v-for="data in cinemaList" :key="data.cinemaId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_text">{{ data.address }}</div>
          </div>
          <div class="right cinema_name">
            <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { mapState, mapActions, mapMutations } from 'vuex'
// 就是把vuex中的三大件事放到了vue的实例上，这样就可以在组件中使用了。
// console.log(mapState['cinemaList']); // 帮助理解mapState
export default {
  data () {
    return {
      cinemasList: [],
      height: '0px'
    }
  },
  computed: {
    // 相当于把函数返回的值赋值给变量，和函数那些写法是相同结果的
    // 括号里面这几个就是vuex的index.js里的对应的东西
    ...mapState(['cinemaList', 'cityId', 'cityName'])
  },
  mounted () {
    // console.log(this.$refs.navbar.$el.offsetHeight)
    // 动态计算滚动高度
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navbar.$el.offsetHeight -
      document.querySelector('footer').offsetHeight +
      'px'
    // store异步分发
    // 判断cinema页面的数据是否存在 若为空就发送请求，否则缓存
    if (this.cinemaList.length === 0) {
      // http返回来的数据，实质上试试proxy对象，可以用then确定它结束的时候回调办事
      // this.$store.dispatch('getCinemas', this.cityId).then(res) =>{
      // 有了vuex的map映射之后，直接就写成这样就行了
      this.getCinemaData(this.cityId).then((res) => {
        // console.log('数据完事了')
        this.$nextTick(() => {
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
      // 这里是异步，不知道什么时候结束，所以BetterScroll不能放在这里
    } else {
      // console.log('缓存')
      this.$nextTick(() => {
        // console.log(document.getElementsByTagName('li').length)
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
      // 缓存了之后会导致切换城市时切换不了对应的影院
    }
    // http({
    //   // 根据state中的cityId获取影院列表
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=8055032`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   // console.log(res.data.data.cinemas)
    //   this.cinemasList = res.data.data.cinemas;
    //   // console.log(document.getElementsByTagName('li').length)
    //   // new BetterScroll('.box')
    //   // 等数据加载完
    // this.$nextTick(() => {
    //   // console.log(document.getElementsByTagName('li').length)
    //   new BetterScroll(".box", {
    //     scrollbar: {
    //       fade: true,
    //     },
    //   });
    // });
    // });
  },
  methods: {
    ...mapActions(['getCinemaData']),
    ...mapMutations(['clearCinema']),
    handleLeft () {
      // console.log('left')
      this.$router.push('/city')
      // 清空cinemalist的缓存
      // this.$store.commit("clearCinema");
      this.clearCinema()
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  padding: 0.8333rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 11.7778rem;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: #797d82;
    font-size: 12px;
    margin: 5px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.box {
  // 修正滚动条位置
  // height: 38.8889rem; // 直接用rem会有点问题，因为他是和宽度等比缩放

  overflow: hidden;
  position: relative;
}
</style>
