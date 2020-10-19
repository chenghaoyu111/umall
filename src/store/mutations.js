export const state = {
    //用户信息
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem('userInfo')):{}
}
export const mutations = {
    changeUserInfo(state,info){
        state.userInfo=info;
        console.log(state.userInfo);
        if(info.id){
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            sessionStorage.removeItem('userInfo')
        }
    }
}
export const getters = {
    userInfo(state){
        return state.userInfo
    }
}