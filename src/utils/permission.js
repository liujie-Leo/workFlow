import { menuList } from 'utils/const'
import useUserStore from 'store/modules/user'

// 生成菜单
export const generatorMenu = (menuAuthkey = []) => {
  // 根据authKey获取对应菜单
  const getMenu = (menu = []) => {
    for (let i = 0; i < menu.length; i++) {
      const menuItem = menu[i]
      if (menuAuthkey.includes(menuItem.authKey)) {
        if (menuItem.child?.length > 0) {
          getMenu(menuItem.child)
        }
        menuItem.show = true
      }
    }
    return menuList
  }
  const menus = getMenu(menuList)
  return menus
}

// 生成路由
export const generatorRoute = (routeAuthKey) => {}

// 路由守卫
export const startRouteMonitor = (router) => {
  router.beforeEach((to, from, next) => {
    const useStore = useUserStore()
    const authKeys = useStore.userInfo?.authKey || []

    console.log(authKeys)
    console.log(to)
    if (to.meta.isWhite) {
      next()
    } else {
      if (authKeys.includes(to.meta.authKey)) {
        next()
      } else {
        router.push('/login')
      }
    }
  })
}
