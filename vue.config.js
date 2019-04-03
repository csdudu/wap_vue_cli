const path = require('path');
const _ = require('lodash');
const webpack = require('webpack')

const appData = require('./src/api/api.json');

const cdn = {
  // 开发环境
  dev: {
    css: [
      
    ],
    js: [
      '/js/vue.js',
      '/js/vue-router.min.js',
      '/js/AXIOS.min.js',
      '/js/lodash.min.js',
      '/js/element.min.js',
      '/js/echarts.min.js'
    ]
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
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
      'axios': 'axios',
      'lodash': '_',
      'echarts': 'echarts',
      'element-ui': 'ELEMENT'
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

      app.get('/api_site_info', function (req, res) {
        res.json(appData["api_site_info"])
      });

      //启停-文字
      app.get('/api_qtrz_txt', function (req, res) {
        res.json(appData["api_qtrz_txt"])
      });

      //启停-柱状图
      app.get('/api_qtrz_chart', function (req, res) {
        res.json(appData["api_qtrz_chart"])
      });

      app.get('/api_yxtj_chart', function (req, res) {
        res.json(appData["api_yxtj_chart"])
      });

      app.get('/api_videos', function (req, res) {
        res.json(appData["api_videos"])
      });

      app.get('/api_tab_info', function (req, res) {
        res.json(appData["api_tab_info"])
      });*/
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
