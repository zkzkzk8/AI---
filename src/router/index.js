import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    // path：访问该页面的浏览器URL路径
    // 在地址栏输入 /login 就会匹配到这条路由规则
    path: '/login',

    // name：路由的名字，唯一标识
    // 用于编程式跳转：$router.push({ name:'Login' })，不用写完整路径
    name: 'Login',

    // component：访问该路由要渲染的页面组件
    // ()=>import() 路由懒加载：只有访问/login时，才加载Login.vue组件代码
    // @ 代表项目src目录，@/views/login/Login.vue = src/views/login/Login.vue
    component: () => import('@/views/login/Login.vue'),

    // meta：【路由元信息】，相当于贴在路由上的自定义便签小纸条
    // vue-router本身不会使用meta里面的数据，全部交给开发者自己读取使用
    // 可以存放标题、权限标记、菜单图标等自定义数据，想加什么字段都可以
    meta: {
      // title：自定义字段，记录这个页面的名称
      // 一般在全局路由守卫中读取 to.meta.title，用来设置浏览器标签页标题
      // 还可以用于面包屑、侧边栏菜单显示文本
      title: '登录'
    }
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
    redirect: '/notes',
    children: [
      {
        path: 'notes',
        name: 'Notes',
        component: () => import('@/views/notes/Notes.vue'),
        meta: {
          title: '我的笔记'
        }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/views/chat/Chat.vue'),
        meta: {
          title: 'AI问答'
        }
      }
    ]
  }
]


// 创建路由实例：搭建路由器
const router = createRouter({
  /*
  history：路由工作模式
  createWebHistory()：history模式，URL不带#，网址好看；⚠️上线后端需要配置，否则刷新404
  如果写成 createWebHashHistory()：hash模式，URL带#，上线无需后端配置
  */
  history: createWebHistory(),

  // routes: routes 的ES6简写，把路由规则数组传入路由器
  routes
})

// 全局前置路由守卫：每一次路由跳转【之前】都会执行这个回调函数
router.beforeEach((to, from, next) => {
  /*
  to：目标路由对象，你【即将要访问】的页面路由（车票）
    to.path → 目标页面url路径
    to.meta → 目标路由的meta便签信息
  from：来源路由对象，你【离开的】那个页面
  next()：放行函数！必须调用，否则页面卡住不动
    next() → 正常放行，去to的页面
    next('/xxx') → 强制跳转到指定页面
  */

  // 三元表达式：设置浏览器标签标题
  // 如果目标路由meta里面有title，就拼接 "页面名 - 智能笔记"
  // 如果没有meta.title，浏览器标题就写默认值：'智能笔记'
  document.title = to.meta.title ? `${to.meta.title} - 智能笔记` : '智能笔记'

  // 从浏览器本地存储取出token，token就是登录成功后的身份凭证
  const token = localStorage.getItem('token')

  // 判断条件：三个条件【同时成立】才拦截跳转登录
  // 条件1：to.path!=='/login' → 想去的页面不是登录页
  // 条件2：!token → token不存在，用户没有登录
  // 条件3：to.path!=='/register' → 想去的页面不是注册页
  if (to.path !== '/login' && !token && to.path !== '/register') {
    // 满足条件：未登录，访问非登录/注册页面 → 强制跳转到登录页
    next('/login')
  } else {
    // 其余全部情况：放行，正常进入目标页面
    // 情况包括：①有token已登录；②访问登录页；③访问注册页
    next()
  }
})



export default router

2222

666
1111
333
9999
