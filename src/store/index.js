/**
 * Vuex最核心的管理对象store
 */
/*
vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})