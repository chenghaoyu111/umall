<template>
<div>
    <el-button type='primary' @click='willAdd()'>添 加</el-button>
<!-- <h1>商品规格</h1> -->
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
willAdd(){
    this.info.isshow=true
},
edit(id){
    this.info.isshow=true;
    this.info.isadd=false;
    this.$refs.add.look(id)
}
},
mounted(){},
}
</script>
<style scoped>
.el-button{
    margin-bottom: 20px;
}
</style>