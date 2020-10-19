<template>
  <div>
    <!-- <h1>角色list</h1> -->
    <el-table
      :data="list"
      border
      style="width: 100%"
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="dele(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqRoleDel } from '../../../utils/request';
export default {
  props: [],
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction",
    }),
    dele(id){
      reqRoleDel(id).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.reqListAction()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>