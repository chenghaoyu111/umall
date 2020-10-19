<template>
  <div>
    <!-- <h1>角色管理</h1> -->
    <el-button type="primary" @click="willAdd()">添加</el-button>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>

    <!-- 添加 -->
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
        isshow: false,
        isadd:true
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
      this.info.isadd = true
    },
    edit(id){
        this.info.isadd = false
        this.info.isshow = true
        this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>