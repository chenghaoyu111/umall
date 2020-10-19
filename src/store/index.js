import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import {state,getters,mutations} from './mutations'
import {actions} from './actions'
import menu from './modules/menu'
import role from './modules/role'
import cate from './modules/cate'
import manage from './modules/manage'
import member from './modules/member'
import specs from './modules/specs'
import goods from './modules/goods'
import seckill from './modules/seckill'
import banner from './modules/banner'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        role,
        cate,
        manage,
        member,
        specs,
        goods,
        seckill,
        banner
    }
})