// 职责：创建一个router实例导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Test from '@/views/test'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    // name: 'login' 给当前路由取名
    // 跳转使用：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面  如果子路由有名字  父级路由需要删除
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment },
        { path: '/setting', name: 'setting', component: Setting }
      ]
    },
    { path: '/test', name: 'test', component: Test },
    // 404 处理  通配
    { path: '*', name: '404', component: NotFound }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  const user = store.getUser()
  // 访问的是登录页面：放行
  // 访问的是其他页面且没有做过登录：拦截  登录页面。
  // if (to.path === '/login') return next()
  // if (!user.token) return next('/login')
  // next()
  if (to.path !== '/login' && !user.token) return next('/login')
  next()
})

export default router
