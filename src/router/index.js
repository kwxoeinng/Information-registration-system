import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

//组件
import Home from '../views/Home/Home.vue'
import Personal from '../views/Personal/Personal.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
        mode: 'history',
        routes: [{
                path: '/',
                redirect: '/login',
            },
            {
                path: '/home',
                component: Home,
                name: Home,
                meta: {
                    showHeader: true,
                    showSideNav: true,
                    showFooter: true
                }
            }, {
                path: '/personal',
                component: Personal,
                name: Personal,
                meta: {
                    showHeader: true,
                    showSideNav: true,
                    showFooter: true
                }
            },
            {
                path: '/login',
                component: Login,
                name: Login,
            }, {
                path: '/register',
                component: Register,
                name: Register
            }
        ],
        fallback: true
    }) 
export default router