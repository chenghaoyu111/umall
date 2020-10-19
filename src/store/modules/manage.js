import { reqManageCount, reqManageList } from '../../utils/request'
const state = {
    list: [],
    // 数量
    size:2,
    // 总数
    total:0,
    // 页码
    page:1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions = {
    reqListAction(context) {
        reqManageList({page:context.state.page,size:context.state.size}).then(res=>{
            let list=res.data.list?res.data.list:[]
            

            if(context.state.page>1&&list.length==0){
                context.commit('changePage',context.state.page-1)
                context.dispatch("reqListAction")
                return
            }
            context.commit('changeList',list)
        })
    },

    reqTotalAction(context){
        reqManageCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    
    changePageAction(context,page){
        context.commit('changePage',page)
        context.dispatch('reqListAction')
    }
}
const getters={
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}