/* Polifils */
import "es6-promise/auto"

/* Vue */
import Vue from 'vue'
import store from './store.js'
import router from './router.js'

/* Ant design */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

/* Common styles */
import "./assets/styles/normalize.css"
import "./assets/styles/main.css"

/* Components */
import App from "./App.vue"


Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
