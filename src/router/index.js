import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films' // 记得要在这import
import Cinemas from '@/views/Cinemas'
// import Center from '@/views/Center'
import Nowplaying from '@/views/films/Nowplaying'
import Comingsoon from '@/views/films/Comingsoon'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
// import Order from '@/views/Order'
import Login from '@/views/Login'
import City from '@/views/City'

Vue.use(VueRouter) // 注册路由插件，两个全局router-view router-link

// 配置表
const routes = [
  {
    path: '/films',
    component: Films,
    // 嵌套路由（二级路由）
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/cinemas',
    component: Cinemas,
    meta: {
      isLee: true
    }
  },
  {
    path: '/city',
    component: City
  },
  {
    // 一个像二级页面，实际是同级页面的路由（像在饿了么点“搜索”的情况）
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/center',
    component: () => import('@/views/Center'), // 路由懒加载（打开这个页面的时候才导入），解决首屏加载过慢问题
    meta: {
      isLee: true
    },
    // 局部路由拦截
    beforeEach: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/order',
    component: () => import('@/views/Order'),
    // 路由元信息
    meta: {
      isLee: true
    }
  },
  {
    name: 'lee', // 命名路由
    path: '/detail/:id', // 动态二级路由
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  // 重定向，优先级最低
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  // 若值为hash也是有#号的，则一定是前端路由
  // 推荐用history，像微信分享链接会截掉#部分
  // history模式下，浏览器和人都分不清前端后端的，所以要在服务器端配置好（文档中有配置例子），让前端接管路由
  mode: 'history',
  routes
})

// 全局拦截
router.beforeEach((to, from, next) => {
  // to：到哪里
  // from：从哪来
  // next：若不需要拦截，就用next()
  // console.log(to)
  // 无条件放行
  // next()
  // 有条件
  if (to.meta.isLee) {
    // 判断本地存储中是否token
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        // 可以用于记录是从哪来
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
