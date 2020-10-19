export const actions = {
    changeUserInfoAction(context,info){
        context.commit('changeUserInfo',info)
    }
}

// 用户登录==>触发actions===>触发mutations