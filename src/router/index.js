import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    reqUserInfo
} from '../api'

//组件
import Home from '../views/Home/Home.vue'
import Order from '../views/Order/Order.vue'
import Announcement from '../views/Announcement/Announcement.vue'
import Arrange from '../views/Arrange/Arrange.vue'
import Diary from '../views/Diary/Diary.vue'
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
        // 首页
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            },
        },
        // 预约
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            },
        },
        // 公告
        {
            path: '/announcement',
            name: 'announcement',
            component: Announcement,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            },
        },
        // 工作安排
        {
            path: '/arrange',
            name: 'arrange',
            component: Arrange,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            },
        },
        // 工作日记
        {
            path: '/diary',
            name: 'diary',
            component: Diary,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            },
        },
        // 我的信息
        {
            path: '/information',
            name: 'information',
            component: Information,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            }
        },
        // 意见反馈
        {
            path: '/feedback',
            name: 'feedback',
            component: Feedback,
            meta: {
                showHeader: true,
                showSideNav: true,
                showFooter: true,
                requireAuth: true
            }
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        //注册
        {
            path: '/register',
            component: Register,
        }
    ],
    fallback: true
})
// 导航守卫
router.beforeEach(async (to, from, next) => {
    let result;
    result = await reqUserInfo()
    if (to.meta.requireAuth) {
        if (result.data !== undefined) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})
export default router