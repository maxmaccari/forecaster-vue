import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/credits',
    name: 'Credits',
    component: () => import('@/views/CreditsPage.vue'),
  },
  {
    path: '/forecast/:location',
    name: 'Forecast',
    component: () => import('@/views/ForecastPage.vue'),
    props: true,
  },
  {
    path: '/forecast/:location/:date',
    name: 'ForecastDetails',
    component: () => import('@/views/ForecastDetailsPage.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
