module.exports = {
  outputPath: 'output',

  // 扩展 babel-loader 的 plugins
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],

  env: {
    production: {
      publicPath: 'https://www.caijinfeng.com/temp/alipay-qrcode/output/'
    }
  }
}

