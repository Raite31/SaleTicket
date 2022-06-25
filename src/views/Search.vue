<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- {{value}} -->
    <ul v-if="value">
      <li v-for="data in computedList" :key="data.cinemaId">
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
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    computedList () {
      // 筛选作用
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    onSearch () {},
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    if (this.$store.state.cinemaList.length === 0) {
      // http返回来的数据，实质上试试proxy对象，可以用then确定它结束的时候回调办事
      this.$store.dispatch('getCinemaData', this.$store.state.cityId)
    } else {
      console.log('缓存')
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
