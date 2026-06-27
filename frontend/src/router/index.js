import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import TestPage from '../views/TestPage.vue'
import ResultsPage from '../views/ResultsPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/mahsulot', component: ProductPage },
    { path: '/test', component: TestPage },
    { path: '/natija', component: ResultsPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
