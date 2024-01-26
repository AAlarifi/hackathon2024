import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DarkMode from '../views/DarkMode.vue'
import about from '../views/AboutView.vue'
// import translate from '../views/translatePage.vue'

const routes =  [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/darkmode',
      component: DarkMode
    },
    {
      path: '/about',
      component: about
    },
    // {
    //   path: '/translate',
    //   component: translate
    // },
  ]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
