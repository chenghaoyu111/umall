import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'
Vue.use(Router)


// 路由独享守卫
function checkedEnter(path, next) {
  let menus_url = store.state.userInfo.menus_url;
  console.log(store.state.userInfo);
  if (menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}



export let indexRouters = [
  {
    path: 'menu', 
    component: () => import('../pages/menu/menu.vue'),
     name: "菜单管理",
    beforeEnter(to, from, next) {
      checkedEnter('/menu', next)
    }
  },
  {
    path: 'role', component: () => import('../pages/role/role.vue'),
    name: "角色管理",
    beforeEnter(to, form, next) {
      checkedEnter('/role', next)
    }
  },
  {
    path: 'manage', component: () => import('../pages/manage/manage.vue'),
    name: "管理员管理",
    beforeEnter(to, form, next) {
      checkedEnter('/manage', next)
    }
  },
  {
    path: 'cate', component: () => import('../pages/cate/cate.vue'),
    name: "商品分类",
    beforeEnter(to, form, next) {
      checkedEnter('/cate', next)
    }
  },
  {
    path: 'specs', component: () => import('../pages/specs/specs.vue'),
    name: "商品规格",
    beforeEnter(to, form, next) {
      checkedEnter('/specs', next)
    }
  },
  {
    path: 'goods', component: () => import('../pages/goods/goods.vue'),
    name: "商品管理",
    beforeEnter(to, form, next) {
      checkedEnter('/goods', next)
    }
  },
  {
    path: 'member', component: () => import('../pages/member/member.vue'),
    name: "会员管理",
    beforeEnter(to, form, next) {
      checkedEnter('/member', next)
    }
  },
  {
    path: 'banner', component: () => import('../pages/banner/banner.vue'),
    name: "轮播图管理",
    beforeEnter(to, form, next) {
      checkedEnter('/banner', next)
    }
  },
  {
    path: 'seckill', component: () => import('../pages/seckill/seckill.vue'), name: "秒杀活动",
    beforeEnter(to, form, next) {
      checkedEnter('/seckill', next)
    }
  }
]

let router = new Router({
  routes: [
    { path: '/login', component: () => import('../pages/login/login.vue') },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: "",
          component: () => import('../pages/home/home.vue'),
        },
        ...indexRouters
      ]
    },
  ]
})


// 登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  if (store.state.userInfo.token) {
    next()
    return
  }
  next('/login')
})
export default router
