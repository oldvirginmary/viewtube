/* Polifils */
import "es6-promise/auto"

/* Vue */
import Vue from 'vue'

/* Store */
import Store from './store.js'

/* Ant design */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

/* Common styles */
import "./assets/styles/normalize.css"
import "./assets/styles/main.css"

/* Components */
import App from "./App.vue"


Vue.config.productionTip = false

Vue.use(Antd);

new Vue({
  store: Store,
  render: h => h(App),
}).$mount('#app')
