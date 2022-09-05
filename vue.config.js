// 配置文件，覆盖
module.exports = {
  lintOnSave: false, // 关闭代码格式检测

  // 配置反向代理
  devServer: { // devServer是固定写法
    proxy: {
      '/ajax': {
        target: 'https://i.maoyan.com/',
        changeOrigin: true
      },
      '/api': {
        target: 'https://i.maoyan.com/',
        changeOrigin: true
      }
      // 这是当遇到有相同开头的网址的时候，就自己加一点，然后再通过自己加的这个作识别
      // '/kerwin':{
      //   target: 'https://i.maoyan.com/',
      //   changeOrigin: true,
      //   pathRewrite: { // 这里是去掉自己加的那部分
      //     '/kerwin': ''
      //   }
    }
  }
}
