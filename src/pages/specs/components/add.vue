<template>
  <div>
    <!-- <h1>商品规格添加</h1> -->
    <el-dialog
      :title="info.isadd ? '商品规格添加' : '商品规格编辑'"
      :visible.sync="info.isshow"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="con">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="del(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
            <el-button
              @click="add()"
              v-if="info.isadd"
              type="primary"
              >添 加</el-button
            >
            <el-button @click="update()" v-else type="primary">修 改</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction: "specs/reqTotalAction",
    }),
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    del(index) {
      this.attrArr.splice(index, 1);
    },
    add() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancle();

          //list数据要刷新
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cancle() {
      this.info.isshow = false;
    },
    empty() {
      this.attrArr = [{ value: "" }, { value: "" }];
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    look(id) {
      reqSpecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          // successAlert(res.data.msg)
          this.form = res.data.list[0];
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsUpdate(this.form).then((res) => {
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
  },
  mounted() {},
};
</script>
<style scoped>
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>