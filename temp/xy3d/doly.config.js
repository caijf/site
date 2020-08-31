const path = require("path");
const pkg = require("./package.json");

module.exports = {
  entry: {
    [pkg.name]: ["./src/utils/polyfill", "./src/app.js"]
  },
  html: {
    template: "src/document.ejs",
    filename: "index.html"
  },

  // 优化，可参考：https://webpack.docschina.org/plugins/split-chunks-plugin/
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          priority: -10,
          enforce: true
        }
      }
    }
  },

  externals: {
    tiku: "window.tiku"
  },

  // 别名
  alias: {
    "~": path.join(__dirname, "./src")
  },

  // 构建完成后生成zip包路径
  // zip: `_build/${pkg.name}-${pkg.version}.zip`,

  // 定义编译时变量替换
  define: {
    // api 地址
    API_URL: "",
    DEV: true
  },

  // 配置 antd 主题
  // theme: {
  //   "primary-color": "red"
  // },

  devServer: {
    // 用于本地开发调试低端设备，关闭HotModuleRepleace
    // hot: false
    port: 5001
  },

  // 扩展babel plugin
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true // `style: true` 会加载 less 文件
      }
    ],
    [
      "import",
      {
        libraryName: "rc-hooks",
        camel2DashComponentName: false
      },
      "rc-hooks"
    ],
    [
      "import",
      {
        libraryName: "util-helpers",
        camel2DashComponentName: false
      },
      "util-helpers"
    ]
  ],

  // 不同环境配置
  env: {
    // 生产环境
    production: {
      publicPath: "https://www.caijinfeng.com/temp/xy3d/site/", // 静态资源基础域名路径，如 https://img.99bill.com/
      outputPath: "site",
      html: {
        template: "src/document.ejs",
        filename: "index.html", // 构建后的html路径，如 seashell/webapp/x-project/agent/index.html
        minify: {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      },
      outputFilename: "j/[name].[chunkhash:8].js", // js入口构建后路径
      outputChunkFilename: "j/[name].[chunkhash:8].chunk.js", // js块构建后路径
      css: {
        filename: "c/[name].[contenthash:8].css", // css文件构建后路径
        chunkFilename: "c/[name].[contenthash:8].chunk.css" // css块构建后路径
      },
      image: {
        name: "i/[name].[hash:8].[ext]", // 图片构建后路径
        limit: 1024 * 8 // 小于该大小的图片转为base64
      },
      define: {
        API_URL: "", // 生产环境的api地址
        DEV: false
      }
    }
  }
};
