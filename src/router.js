import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

Vue.use(Router);
const arr_rt = {
  "development": [
    {path: '/', redirect: '/home' },
    {path: '/home', name: 'home', component: home },
    {path: '/list', name: 'list', component: () => import('./views/list.vue') }
  ],
  "dudu":[
    {path: '/', redirect: '/list' },
    {path: '/home', name: 'home', component: home },
    {path: '/list', name: 'list', component: () => import('./views/list.vue') }
  ]
}
//根据当前VUE_APP_MODE来选择要加载的路由组，默认是development
let current_rt = arr_rt[process.env.VUE_APP_MODE||"development"];
// console.log("当前VUE_APP_MODE：",process.env.VUE_APP_MODE, "----", current_rt);

export default new Router({
  routes: current_rt
})
