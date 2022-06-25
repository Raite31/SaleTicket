<template>
    <div>
        login
        <button @click="handleLogin">登录</button>
    </div>
</template>
<script>
export default {
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '123456')
        // this.$router.back() // 返回上一页，需要存储
        // 1. 获取qurey字段
        console.log(this.$route.query.redirect)
        // 2. 跳转到当时想要跳的页面去
        this.$router.push(this.$route.query.redirect)
      }, 0)
    }
  }
}
</script>
