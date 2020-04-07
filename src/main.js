import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.css'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

//全局引入ui库
Vue.use(MuseUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
