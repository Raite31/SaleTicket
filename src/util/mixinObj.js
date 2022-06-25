const obj = {
  created () {
    this.$store.commit('hide')
    // console.log('创建完成')
  },
  destroyed () {
    this.$store.commit('show')
  },
  methods: {
    a () {
      console.log('aaaaaaaaa')
    }
  }
}
export default obj
