import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    reqUserInfo
} from '../api'

//组件
import Home from '../views/Home/Home.vue'
import Health from '../views/Health/Health.vue'
import Order from '../views/Order/Order.vue'
import Announcement from '../views/Announcement/Announcement.vue'
import Arrange from '../views/Arrange/Arrange.vue'
import Diary from '../views/Diary/Diary.vue'
import Information from '../views/Information/Information.vue'
import Feedback from '../views/Feedback/Feedback.vue'
import Login from '../views/Login/Login.vue'
import OrderClient from '../views/OrderClient/OrderClient.vue'
import Administrator from '../views/Administrator/Administrator.vue'
import Infm from '../views/Infm/Infm.vue'
import Arrm from '../views/Arrm/Arrm.vue'
import Healm from '../views/Healm/Healm.vue'


Vue.use(VueRouter)
// 解决ElementUI导航栏中的重复点菜单报错问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/orderclient',
        },
        {
            path: '/orderclient',
            component: OrderClient,
        },
        {
            path: '/administrator',
            component: Administrator,
        },
        {
            path: '/infm',
            component: Infm,
        },
        {
            path: '/arrm',
            component: Arrm,
        },
        {
            path: '/healm',
            component: Healm,
        },
        //健康打卡
        {
            path: '/health',
            name: 'health',
            component: Health,
            meta: {
                showHeader: true,
            },
        },
        //首页
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
            }
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
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