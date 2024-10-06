import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import Settings from '../views/Settings.vue'
import Blog from '../views/Blog.vue'
import Photography from '../views/Photography.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/blog',
      component: Blog
    },
    {
      path: '/photography',
      component: Photography
    }
  ]
})

export default router;