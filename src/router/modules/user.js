const router = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/userLogin.vue'),
    meta: {
      title: '登录',
      isWhite: true,
    },
  },
]
export default router
