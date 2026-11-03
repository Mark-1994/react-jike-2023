// 扩展webpack配置
const path = require('path')

module.exports = {
  webpack: {
    // 配置别名
    alias: {
      // @ 表示 src 目录
      '@': path.resolve(__dirname, 'src')
    }
  }
}
