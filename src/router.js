import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '*', component: page404},
    {path: '/', redirect: '/home' },
    {path: '/home', name: 'home', component: home },
    {path: '/list', name: 'list', component: () => import('./views/list.vue') }
  ]
})
