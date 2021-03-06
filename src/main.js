// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'normalize.css'
import Icon from 'vue-awesome/components/Icon'
import VueFormGenerator from 'vue-form-generator'
import "vue-form-generator/dist/vfg.css";
import axios from 'axios'

// import qs from 'qs'

// Vue.prototype.Qs = qs

Vue.prototype.$http = axios
Vue.use(VueFormGenerator)
window.VueFormGenerator = VueFormGenerator
Vue.component('vue-form-generator', VueFormGenerator)
Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
