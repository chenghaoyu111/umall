<template>
  <div class="box">
    <!-- <h1>管理员添加</h1> -->

    <el-dialog title="管理员添加" :visible.sync="info.isshow">
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="name">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="delivery">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add()" v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="update()" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqRoleListAction,
  reqManageList,
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      reqManageList: "manage/reqListAction",
      reqTotalAction: "manage/reqTotalAction",
    }),
    add() {
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.reqManageList();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    cancle() {
      this.info.isshow = false;
    },
    look(uid) {
      reqManageDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // this.reqRoleListAction();
    if (this.roleList.length == 0) {
      this.reqRoleListAction();
    }
  },
};
</script>
<style scoped>
.box {
  width: 500px;
}
</style>