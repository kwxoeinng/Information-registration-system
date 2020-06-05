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
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                showHome:true
            },
        }, {
            path: '/personal',
            component: Personal,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login,
        }, {
            path: '/register',
            component: Register,
        }
    ],
    fallback: true
})
export default router