import Vue from 'vue'
import App from './App.vue'
import moment from "moment";
import { BootstrapVue, BIcon, BIconGeoAltFill } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'
import './assets/main.css'

Vue.use(moment)
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconGeoAltFill', BIconGeoAltFill)
Vue.use(ToggleButton)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')



