import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

function createRouter (state) {
  async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get('http://localhost:3000/api/v1/login')
      state.user = user
      next()
    } catch (err) {
      console.log('err', err)
      next('/login')
    }
  }

  const routes = [
    { path: '/', name: 'home', component: Home, beforeEnter },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login }
  ]
  return new VueRouter({
    routes
  })
}

export default createRouter
