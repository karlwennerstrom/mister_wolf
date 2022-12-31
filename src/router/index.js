import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Admin from '../views/Admin.vue'
import Cuenta from '../views/Cuenta.vue'

import {getAuth,onAuthStateChanged} from "firebase/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',name: 'home',component: HomeView
    },
    {
      path: '/login',name: 'login',component: Login,meta: {
        requiresAuth: false
      }
    },
    {
      path: '/registro',name: 'registro',component: Registro
    },
    {
      path: '/about',name: 'about',component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',name: 'admin',component: () => import('../views/Admin.vue'),
      meta: {
        requiresAuth: true,
      }
    }
    ,
    {
      path: '/admin/conceptos',name: 'conceptos',component: () => import('../views/Conceptos.vue'),
      meta: {
        requiresAuth: true,
      }
    }
    ,
    {
      path: '/admin/todos',name: 'todos',component: () => import('../views/Todos.vue'),
      meta: {
        requiresAuth: true,
      }
    }
    ,
    {
      path: '/admin/blog',name: 'blog',component: () => import('../views/Blog.vue'),
      meta: {
        requiresAuth: true,
      }
    }
    ,
    {
      path: '/cuenta',name: 'cuenta',component: () => import('../views/Cuenta.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener=onAuthStateChanged(
    getAuth(),
      (user)=> {
        removeListener()
        resolve(user)
      },
      reject 
    )
  })
}

router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if(await getCurrentUser()){
          next()
      } else {
          
          next('/login')
      }
  }else {
      next()
  }
})



export default router
