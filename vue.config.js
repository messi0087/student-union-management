module.exports = {
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/static/mock'
        }
      }
    }
  },
  // 配置图标
  pwa: {
    iconPaths: {
      favicon32: './public/head.png',
      favicon16: './public/head.png',
      appleTouchIcon: './public/head.png',
      maskIcon: './public/head.png',
      msTileImage: './public/head.png'
    }
  }
}
