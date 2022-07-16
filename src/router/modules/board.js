const router = [
  {
    path: '/',
    name: 'LayContainer',
    component: () => import('@/layout/layContainer.vue'),
    meta: {
      title: '工作流系统',
      authKey: '100',
    },
  },
]
export default router
