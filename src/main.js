import Vue from 'vue'
// import './cube-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import _ from "lodash";
// import './assets/js/ydui.flexible1.1.3.js';
import echarts from 'echarts';
import {common,auth} from '@/utils/common' // 全局方法
import filters from '@/utils/filters' // 全局过滤器

import rlink from '@/base/base_rlink';
import '@css/common.scss';

Vue.use(common); //注册全局方法
Vue.prototype.$echarts = echarts;  //单独注册echarts全局方法，以供Chart.vue使用
// 注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
    //matched的数组中包含$route对象的检查元字段
    //arr.some() 表示判断该数组是否有元素符合相应的条件, 返回布尔值
    let someRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (someRequiresAuth) {
        //判断当前是否有登录的权限


        if (!auth.loggedIn()) {
	        console.log('未登录===',to.fullPath);
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
	        console.log('已登录===');
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})