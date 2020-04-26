import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/main.css'
import './assets/css/扩展.css'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueSocketIO from 'vue-socket.io'
import config from './api/default'
const  port = config.port

//全局引入ui库
Vue.use(MuseUI);

//引入socket.io
Vue.use(new VueSocketIO({
  debug: false,
  connection: port
  // vuex: {
  // },
  // options: { path: "/my-app/" } //Optional options
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Date.prototype.Format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
