<template>
  <div>
    <!-- <h1>列表</h1> -->
    <template>
      <el-table
        :data="list"
        border
        style="width: 100%" 
        row-key='id'
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="分类编号" width="180">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180">
        </el-table-column>

        <el-table-column prop="address" label="图片">
          <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt="">
          </template>
        </el-table-column>
        
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqCateDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    del(id) {
      reqCateDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
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