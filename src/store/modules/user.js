import { defineStore } from 'pinia'
import { generatorMenu, generatorRoute } from 'utils/permission'

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {},
    menu: [
      {
        title: '用户',
        authKey: '100',
        icon: 'icon-code',
        path: '/user',
        show: true,
        meta: {},
        child: [
          {
            title: '用户列表',
            authKey: '101',
            icon: 'icon-code',
            path: '/user/userList',
            meta: {},
            show: true,
            child: [],
          },
        ],
      },
      {
        title: 'OA审批',
        authKey: '200',
        show: true,
        icon: 'icon-chaosong',
        path: '/oaAudit',
        meta: {},
        child: [
          {
            title: 'OA审批-1',
            authKey: '201',
            show: true,
            icon: 'icon-chaosong',
            path: '/oaAudit-1',
            meta: {},
            child: [],
          },
          {
            title: 'OA审批-2',
            authKey: '202',
            show: true,
            path: '/oaAudit-2',
            meta: {},
            icon: 'icon-chaosong',
            child: [],
          },
        ],
      },
      {
        title: '设置',
        path: '/setting',
        authKey: '300',
        icon: 'icon-jiagou',
        show: true,
        child: [],
      },
    ],
    token: '',
  }),
  getters: {},
  actions: {
    setUser(value) {
      this.userInfo = value
    },
    login(userInfo) {
      return new Promise((resolve, reject) => {
        this.userInfo = userInfo

        // 动态生成菜单
        const menu = generatorMenu(userInfo.authKey)
        this.menu = menu

        // 动态生成路由
        const route = generatorRoute(userInfo.authKey)
        resolve(true)
      })
    },
  },
})

export default useUserStore
