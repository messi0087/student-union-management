import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // 仅点击浏览器前进后退按钮时.
    return savedPosition
  }
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }
  position.x = 0
  position.y = 0
  return position
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.title)) {
    document.title = to.meta.title
    next()
  }
})
export default router
