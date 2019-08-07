const path = require("path");

module.exports = {
  outputPath: 'preview',

  // 别名
  alias: {
    "~": path.join(__dirname, "./src")
  },

  // 扩展 babel-loader 的 plugins
  extraBabelPlugins: [
    ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
  ],

  // 定义编译时变量替换
  define: {
    // api 地址
    API_URL: "",
    DEV: true
  },

  // 不同环境配置
  env: {
    // 生产环境
    production: {
      publicPath: 'https://www.caijinfeng.com/temp/video-test/preview/',
      outputFilename: 'assets/js/[name].[hash].js',
      outputChunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
      css: {
        filename: 'assets/css/[name].[contenthash:8].css',
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
      },
      image: {
        name: 'assets/img/[name].[hash:8].[ext]', // 文件名
        limit: 1024*8
      },
      define: {
        API_URL: ""
      }
    }
  }
};
