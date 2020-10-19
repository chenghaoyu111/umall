<template>
  <div class="box">
    <!-- <h1>角色add</h1> -->

    <el-dialog title="角色添加" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="{children: 'children',label: 'title',}"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd==true">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqRoleAdd, reqRoleDetail, reqRoleList, reqRoleUpdate } from "../../../utils/request";
import {reqMenuListAction} from '../../../utils/request'
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      reqRoleList: "role/reqListAction",
    }),
    add() {
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle()
          this.empty()
          this.reqRoleList()
        } else {
          warningAlert(res.data.msg)
        }
      });
    },
    cancle(){
      this.info.isshow = false
    },
    empty(){
      this.form= {
        rolename: "",
        menus: '[]',
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([])
    },
    look(id){
      reqRoleDetail(id).then((res)=>{
        if(res.data.code ==200){
          this.form = res.data.list;
          this.form.id=id
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    update () {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()
          this.cancle()
          this.reqRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    if(this.menuList.length == 0){
      this.reqMenuListAction()
    }
  },
};
</script>
<style scoped>
.box {
  width: 600px;
}
</style>