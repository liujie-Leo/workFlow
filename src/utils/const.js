export const userList = [
  {
    name: '管理员',
    authKey: ['100', '101', '200', '201', '202', '300'],
  },
  {
    name: '普通用户',
    authKey: ['100'],
  },
]

export const menuList = [
  {
    title: '用户',
    authKey: '100',
    icon: 'icon-code',
    path: '/user',
    show: false,
    meta: {},
    child: [
      {
        title: '用户列表',
        authKey: '101',
        icon: 'icon-code',
        path: '/user/userList',
        meta: {},
        show: false,
        child: [],
      },
    ],
  },
  {
    title: 'OA审批',
    authKey: '200',
    show: false,
    icon: 'icon-chaosong',
    path: '/oaAudit',
    meta: {},
    child: [
      {
        title: 'OA审批-1',
        authKey: '201',
        show: false,
        icon: 'icon-chaosong',
        path: '/oaAudit-1',
        meta: {},
        child: [],
      },
      {
        title: 'OA审批-2',
        authKey: '202',
        show: false,
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
    show: false,
    child: [],
  },
]
