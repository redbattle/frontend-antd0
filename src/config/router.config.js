// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/Index'),
        meta: { title: '首页', keepAlive: true, icon: 'home' }
      },

      {
        path: '/a_user',
        name: 'a_user',
        component: PageView,
        redirect: '/a_user/list',
        meta: { title: '管理员', icon: 'bars' },
        children: [
          {
            path: '/a_user/list',
            name: 'a_user_list',
            component: () => import('@/views/a_user/List'),
            meta: { title: '列表' }
          }
        ]
      },

      {
        path: '/c_user',
        name: 'c_user',
        component: PageView,
        redirect: '/c_user/list',
        meta: { title: '用户', icon: 'bars' },
        children: [
          {
            path: '/c_user/list',
            name: 'c_user_list',
            component: () => import('@/views/c_user/List'),
            meta: { title: '列表' }
          }
        ]
      },

      {
        path: '/app_version',
        name: 'app_version',
        component: PageView,
        redirect: '/app_version/list',
        meta: { title: '用户', icon: 'bars' },
        children: [
          {
            path: '/app_version/list',
            name: 'app_version_list',
            component: () => import('@/views/app_version/List'),
            meta: { title: '列表' }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/public',
    component: UserLayout,
    redirect: '/public/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/public/Login')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }

]
