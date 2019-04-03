import moment from 'moment'
import du_rect from '../components/du_rect';
import du_date_picker from '../components/du_date_picker';
import du_anim_bar from '../components/du_anim_bar';
import rlink from '../base/base_rlink.vue';
import test from '../components/test';
import api_server from './request.js';

Vue.component('du_rect', du_rect);
Vue.component('du_date_picker', du_date_picker);
Vue.component('du_anim_bar', du_anim_bar);
Vue.component('rlink', rlink);
Vue.component('test', test);

Vue.mixin({
  data: function() {
    return {
      main_tit: this.$main_tit
    }
  },
  methods: {
    
    
  }
})

// 登录判断
export const auth = {
  loggedIn(){
    
    
    return false;
  }
}

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
    Vue.prototype.$main_tit = "博方环保智能云控平台";
    Vue.prototype.$today = moment().format("YYYY-MM-DD");
    Vue.prototype.$industryId = "5";
    Vue.prototype.$placeIdQUERY = "23";
    Vue.prototype.$interval = 6000;
    // Vue.prototype.$token = "vukIYOFoWurjnylmEpJv";
  }
}

// export default common
