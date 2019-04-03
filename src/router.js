import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '*', component: page404},
    {path: '/', redirect: '/home' },
    {path: '/home', name: 'home', component: home },
    {path: '/login', name: 'login', component: () => import('./views/login.vue') },
    {
    	path: '/test2',
    	name: 'test2',
    	meta: { 
	        requiresAuth: true 
	    },
    	component: () => import('./views/test2.vue') 
    }
  ]
})
