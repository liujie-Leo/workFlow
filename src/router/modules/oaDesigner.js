const router = [
  {
    path: '/oaDesigner',
    name: 'oaDesigner',
    component: () => import('@/views/oaDesigner/oaDesigner.vue'),
    meta: {
      authKey: '',
    },
  },
]
export default router
