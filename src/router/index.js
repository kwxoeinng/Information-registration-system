import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

//组件
import Home from '../views/Home/Home.vue'
import Announcement from '../views/Announcement/Announcement.vue'
import Arrange from '../views/Arrange/Arrange.vue'
import EmployeeMsg from '../views/EmployeeMsg/EmployeeMsg.vue'
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
                showFooter: true
            },
        }, 
        {
            path: '/announcement',
            component: Announcement,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            },
        }, 
        {
            path: '/employeemsg',
            component: EmployeeMsg,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            },
        }, 
        {
            path: '/arrange',
            component: Arrange,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            },
        }, 
        {
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