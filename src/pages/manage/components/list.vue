<template>
  <div>
    <!-- <h1>管理员列表</h1> -->
    <el-table :data="list" border style="width: 100%" row-key="id">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启 用</el-button
          >
          <el-button type="info" v-else>启 用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编 辑</el-button
          >
          <el-button type="danger" @click="dele(scope.row.uid)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 设置分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>

    
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqManageDel } from "../../../utils/request.js";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      changePageAction: "manage/changePageAction",
      reqTotalAction: "manage/reqTotalAction",
    }),
    changePage(e) {
      this.changePageAction(e);
    },
    dele(uid) {
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
          this.reqTotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqListAction();
    this.reqTotalAction();
  },
};
</script>
<style scoped>
</style>