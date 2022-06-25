<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>
<script>
export default {
  // 路由生命周期
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被confirm前调用
    // 不能！获取组件实例'this'
    // 因为当守卫执行前，组件实例还没有被创建
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        // 可以用于记录是从哪来
        query: { redirect: to.fullPath }
      })
    }
  }
}
</script>
