import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from './components/NotFound.vue'
import Auth from './components/Auth.vue'
import Search from './components/Search.vue'
import Favorites from './components/Favorites.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '*', 
      component: NotFound,
    },
    { 
      path: '/', 
      component: Auth,
    },
    { 
      path: '/search', 
      component: Search,
    },
    { 
      path: '/favorites', 
      component: Favorites,
    },
  ]
})