<template>
  <div class="city">
    <van-index-bar :index-list="computedList" @select="handleChange">
      <!-- for循环嵌套遍历 -->
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="handleClick(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'
// 抽出去做成一个公共的东西
// var obj = {
//   created() {
//     this.$store.commit("hide");
//     // console.log('创建完成')
//   },
//   destroyed() {
//     this.$store.commit("show");
//   },
// };
export default {
  // 能混入一些公共的方法
  // 比...那个写法智能很多，有就合并，没就创建
  mixins: [obj],
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      // this.cityList这个对象通过map方法映射成type类型这个值
      return this.cityList.map((item) => item.type)
    }
  },
  destroyed () {
    // 放到minxin里面的钩子函数，在页面销毁的时候调用
    // this.$store.commit('show')
  },
  mounted () {
    // this.$store.commit('hide')
    http({
      url: '/gateway?k=9142046',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      // console.log(res.data.data.cities);
      // 1. 把一堆城市数据 => A ，B进行分组
      this.cityList = this.renderCity(res.data.data.cities)
      // 2. 利用转换后的数据，结合组件库进行渲染页面
    })
  },
  // 城市的值的vuex处理，不同页面的共享
  methods: {
    handleClick (item) {
      // console.log(item.name, item.cityId);
      // 传统的多页面方案
      // location.href = "/cinemas?cityname=" + item.name;
      // cookie,localStorage

      // 单页面方案
      // 1. 中间人模式
      // 2. bus事件总线 $on, $emit
      // 以上这些都不是最好的方案，在管理多状态的时候，会很乱

      // vuex- 状态管理模式  (眼镜)
      // console.log(this.$store.state);
      // this.$store.state.cityName = item.name;  // 爽写法，但不安全，无法溯源
      this.$store.commit('changeCityName', item.name) // 把函数和数据提交到Mutations，然后再Mutations里改数据，从而达到Mutations记录的功能
      this.$store.commit('changeCityId', item.cityId) // 把函数和数据提交到Mutations，然后再Mutations里改数据，从而达到Mutations记录的功能
      this.$router.back()
    },
    handleChange (data) {
      // console.log(data);
      Toast(data)
    },
    renderCity (list) {
      // console.log(list);
      const letterList = []
      const cityList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        const newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // console.log(newList);

        newList.length > 0 &&
          cityList.push({
            type: letter,
            list: newList
          })
      })
      console.log(cityList)
      return cityList
    }
  }
}
</script>
<style lang="scss">
.van-toast--html,
.van-toast--text {
  min-width: 30px;
}
</style>
