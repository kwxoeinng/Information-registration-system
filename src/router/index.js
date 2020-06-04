import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

//组件
import Home from '../views/Home/Home.vue'
import Personal from '../views/Personal/Personal.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import AddPerson from '../views/AddPerson/AddPerson.vue'
import EditPerson from '../views/EditPerson/EditPerson.vue'

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
            children: [{
                    // 当 /user/:id/addPeroson 匹配成功，
                    // AddPerson 会被渲染在 User 的 <router-view> 中
                    path: 'addPeroson',
                    component: AddPerson,
                    meta: {
                        showHeader: true,
                        showSideNav: true,
                        showFooter: true
                    },
                },
                {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'editPerson',
                    component: EditPerson
                }
            ]
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