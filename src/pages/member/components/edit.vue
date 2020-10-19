<template>
  <div class="box">
    <!-- <h1>修改</h1> -->
    <el-dialog title="会员信息修改" :visible.sync="info.isshow">
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
          留空则不修改
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="update()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqMemberDetail,
  reqMemberUpdate,
  reqMemberList,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),
    look(id) {
      reqMemberDetail(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          //   this.form.id = id
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqMemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    cancle() {
      this.info.isshow = false;
    },
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 500px;
}
</style>