<template>
  <div>
    <el-button type="primary" @click="willAdd()">添加</el-button>
    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加组件 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import vList from "./components/list";
import vAdd from "./components/add";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        // 添加弹框  父传子
        isshow: false,
        // 定义是修改按钮还是添加按钮
        isAdd:true
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.info.isAdd = true
    },
    edit(id){
      this.info.isshow = true
      this.info.isAdd = false
      // 调用子组件的方法
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.el-button{
  margin-bottom: 20px;
}
</style>