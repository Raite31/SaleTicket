<template>
    <div class="header">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      // this.$router.go(-1)
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.4444rem;
    line-height: 2.4444rem;
    background-color: white;
    text-align: center;
    i{
        font-size: 30px;
        position: fixed;
        left: .5556rem;
        top: 0px;
        height: 2.4444rem;
        line-height: 2.4444rem;
    }
}
</style>
