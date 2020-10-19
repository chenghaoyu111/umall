<template>
<div>
<!-- <h1>轮播图管理</h1> -->
<el-button type='primary' style="margin-bottom:20px" @click="willadd()">添加</el-button>
<v-list @edit='edit'></v-list>
<v-add :info='info' ref="add"></v-add>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import vList from './components/list'
import vAdd from './components/add'
export default {
props:[],
components:{
    vList,
    vAdd
},
data(){
return {
    info:{
        isshow:false,
        isadd:true
    }
}
},
computed:{
...mapGetters({
})
},
methods:{
...mapActions({
}),
willadd(){
    this.info.isshow=true
    this.info.isadd=true
},
edit(id){
    this.$refs.add.look(id)
    this.info.isadd=false
}
},
mounted(){},
}
</script>
<style scoped>
</style>