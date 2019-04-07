const path = require('path');
const _ = require('lodash');
const webpack = require('webpack')

// const appData = require('./src/api/api.json');

const cdn = {
  // 开发环境
  dev: {
    css: [
      '/css/swiper.min.css',
      '/css/animate.min.css',
    ],
    js: [
      '/js/vue.js',
      '/js/vue-router.min.js',
      '/js/AXIOS.min.js',
      '/js/lodash.min.js',
      '/js/ydui.flexible.js',
      '/js/swiper.min.js',
      '/js/swiper.animate1.0.3.min.js',
      'http://api.map.baidu.com/api?v=2.0&ak=eg39Pnyac2tiDPymRDL5aHGmGXG2sAxk',
    ]
  },
  // 生产环境
  build: {
    css: [
      '/css/swiper.min.css',
      '/css/animate.min.css',
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.min.js',
      'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
      'js/ydui.flexible.js',
      'js/swiper.min.js',
      'js/swiper.animate1.0.3.min.js',
      'http://api.map.baidu.com/api?v=2.0&ak=eg39Pnyac2tiDPymRDL5aHGmGXG2sAxk',
    ]
  }
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  assetsDir: '',
  baseUrl: './',    //重要设置！可以让资源路径以“相对路径”放置，类似http://258754.cn/2019/bfhb/index.html为首页访问时，保证资源路径正确。

  configureWebpack: config => {
    const myConfig = {}

    
    myConfig.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'swiper': 'Swiper',
      'moment': 'moment',
      'axios': 'axios',
      'lodash': '_'
    }
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      

      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      /*productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )*/
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      /*myConfig.devServer = {
        disableHostCheck: true
      }*/
    }
    return myConfig
  },

  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const argv = process.argv

      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`  //取得命令行之后的"pro"
      args[0]['process.env'].BASE_API = '"http://editor-api.eloco.cn"'
      
      
      return args
    })

    config.resolve.alias
      .set('@', resolve('src')) 
      .set('@u', resolve('src/utils')) 
      .set('@css', resolve('src/assets/scss')) 
      .set('@img', resolve('src/assets/images')) 

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    console.log("-----------------------");
    /*moment仅包含特定语言包的moment文件*/
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])

  },

  devServer: {
    before(app) {
      /*app.get('/dd1', function (req, res) {
        const rand = _.random(1,6);
        console.log("devServer >>>>>>>>>",rand);
        res.json(appData["dd"+rand])
      });
*/
    }
  }
}
