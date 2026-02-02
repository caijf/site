module.exports = {
  outputPath: "output",

  // 扩展 babel-loader 的 plugins
  extraBabelPlugins: [["import", { libraryName: "antd", style: true }]],

  env: {
    production: {
      publicPath: "https://www.caijf.top/temp/alipay-qrcode/output/",
    },
  },
};
