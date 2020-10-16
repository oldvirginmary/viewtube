import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from './components/NotFound.vue'
import Auth from './components/Auth.vue'
import Search from './components/Search.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Auth },
    { path: '/search', component: Search },
    { path: '*', component: NotFound },
  ]
})