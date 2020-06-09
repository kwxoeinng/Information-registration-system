import Vue from 'vue'
import VueRouter from 'vue-router'

//组件
import Home from '../views/Home/Home.vue'
import Order from '../views/Order/Order.vue'
import Announcement from '../views/Announcement/Announcement.vue'
import Arrange from '../views/Arrange/Arrange.vue'
import Diary from '../views/Diary/Diary.vue'
import Personal from '../views/Personal/Personal.vue'
import Information from '../views/Information/Information.vue'
import Feedback from '../views/Feedback/Feedback.vue'
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
            path: '/order',
            component: Order,
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
            path: '/arrange',
            component: Arrange,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            },
        },
        {
            path: '/diary',
            component: Diary,
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
            path: '/information',
            component: Information,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true
            }
        },
        {
            path: '/feedback',
            component: Feedback,
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