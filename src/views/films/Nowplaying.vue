<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        <div>
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div :class="data.grade ? '' : 'hidden'">
              观众评分：<span style="color: red">{{ data.grade }}</span>
            </div>
            <!-- 拿到actors这个列表，传递给filter -->
            <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
// import axios from 'axios'
import Vue from 'vue'
import http from '@/util/http'
// import http from '@/util/http' // 导入http工具类
// 然后再filter中，获得数据，对数据进行处理
Vue.filter('actorsFilter', (data) => {
  // map映射
  // console.log(data.map(item => item.name).join('/'))
  // 防止报错，如果没有数据，就返回相应字符串
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join('/')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5950229`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      // console.log("到底了");
      // 总长度匹配，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }

      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5950229`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        // console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films] // 展开运算符

        // loading主动设置成false
        this.loading = false
      })
    },
    handleChangePage (id) {
      // console.log(id)
      // 编程式导航
      //   location.href = '#/detail'
      // 这样写就写死#模式

      // 标准的router的编程式导航写法
      // 这里带没带#都行（就不用管是hash模式还是history模式）
      // 1-通过路径跳转
      // this.$router.push(`/detail/${id}`)

      // 命名路由
      // 2-通过命名路由跳转
      this.$router.push({
        name: 'lee',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-list {
  .van-cell {
    overflow: hidden;
    padding: 0.8333rem;
    img {
      width: 3.6667rem;
      float: left;
    }
    .title {
      font-size: 16px;
    }
    .content {
      font-size: 13px;
      color: gray;
      .actors {
        // 控制演员名字长度过长后，显示省略号
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;

        width: 11.1111rem;
      }
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>
