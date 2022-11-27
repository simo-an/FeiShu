import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home/feishu' },
  {
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    children: [
      { path: '/home/feishu', component: () => import('@/view/feishu/index.vue') },
      { path: '*', component: () => import('@/view/feishu/index.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router