import moment from 'moment'
import rlink from '../components/rlink.vue';
import du_toast from '../components/du_toast.vue';
import du_pop from '../components/du_pop.vue';
import test from '../components/test';
import api_server from './request.js';
// import DATA from '/data/data.js';


Vue.component('rlink', rlink);
Vue.component('du_toast', du_toast);
Vue.component('du_pop', du_pop);

Vue.mixin({
  data: function() {
    return {
      main_tit: this.$main_tit,
      main_data: [],
      
    }
  },
  methods: {
    toast(str) {
      this.$refs.du_toast.show(str);
    },
  },
  computed: {
    is_long_scr: function () {
      var ratio = (document.body.clientHeight / document.body.clientWidth).toFixed(2);
      console.log(ratio,"是否长屏:",ratio>1.6 ? true:false);
      return ratio > 1.6 ? true : false
    }
  }
})

// 登录判断
// export const data = DATA;

export const common = {
  install: function (Vue, options) {

    Vue.prototype.$get = function(url,para) {
      return new Promise(function (resolve, reject) {
        api_server({
            method: 'get',
            url: url,
            params: para
          })
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          reject(err);
        });
      })
    };

    Vue.prototype.$post = function(url,para) {
      return new Promise(function (resolve, reject) {
        api_server({
            method: 'post',
            url: url,
            data: para
          })
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          reject(err);
        });
      })
    };

    // 所有的枚举， 这种方式同样可以替代过滤器
    Vue.prototype.$main_tit = "浦市古镇";
    Vue.prototype.$today = moment().format("YYYY-MM-DD");
  }
}

// export default common
