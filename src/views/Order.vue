<template>
  <div>order</div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E4%BD%9B%E5%B1%B1&ci=92&channelId=4').then((res) => {
      console.log(res.data)
    })
  }
}
</script>
