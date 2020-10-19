<template>
<div>
<!-- <h1>会员管理</h1> -->
<v-list @edit='edit'></v-list>
<v-edit :info='info' ref="add"></v-edit>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import vList from './components/list'
import vEdit from './components/edit'
export default {
props:[],
components:{
    vList,
    vEdit
},
data(){
return {
    info:{
        isshow:false
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
edit(id){
    this.info.isshow=true
    this.$refs.add.look(id)
},
},
mounted(){},
}
</script>
<style scoped>
</style>