import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/credits',
    name: 'Credits',
    component: () => import('@/views/Credits.vue'),
  },
  {
    path: '/forecast/:location',
    name: 'Forecast',
    component: () => import(/* webpackPrefetch: true */ '@/views/Forecast.vue'),
    props: true,
  },
  {
    path: '/forecast/:location/:date',
    name: 'ForecastDetails',
    component: () => import(/* webpackPrefetch: true */ '@/views/ForecastDetails.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
