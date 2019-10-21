import Vue from 'vue'
import Router from 'vue-router'
import Details from '@/components/Details'
import Index from '@/components/Index'
import Classification from '@/components/Classification'
import Shop from '@/components/Shop'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Baby from '@/components/Classification/Baby'
import Beauty from '@/components/Classification/Beauty'
import Household from '@/components/Classification/Household'
import Food from '@/components/Classification/Food'
import Global from '@/components/Classification/Global'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Classification',
      name: 'Classification',
      component: Classification,
      children:[
        {
          path: '/',
          redirect: 'Baby'
        },
        {
          path: 'Baby',
          name: 'Baby',
          component: Baby
        },
        {
          path: 'Beauty',
          name: 'Beauty',
          component: Beauty
        },
        {
          path: 'Household',
          name: 'Household',
          component: Beauty
        },
        {
          path: 'Food',
          name: 'Food',
          component: Food
        },
        {
          path: 'Global',
          name: 'Global',
          component: Global
        },
      ]

    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
  ]
})
