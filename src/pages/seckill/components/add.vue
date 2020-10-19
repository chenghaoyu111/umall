<template>
  <div class="box">
    <!-- <h1>秒杀添加</h1> -->

    <el-dialog
      :title="info.isadd ? '添加活动' : '编辑活动'"
      :visible.sync="info.isshow"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <el-col :span="11">
            <el-form-item prop="begintime">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="form.begintime"
                style="width: 100%"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">至</el-col>
          <el-col :span="11">
            <el-form-item prop="endtime">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="form.endtime"
                style="width: 100%"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" prop="goodsid">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option label="商品一" :value="1"></el-option>
            <el-option label="商品二" :value="2"></el-option>
          </el-select>
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
            >添 加</el-button
          >
          <el-button type="primary" @click="update()" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSeckillAdd,
  reqSeckillDetail,
  reqSeckillUpate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqCateList } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
      reqListAction: "seckill/reqListAction",
    }),
    cancle() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },

    add() {
      // let data ={
      //   ...this.form,
      //   begintime:this.form.begintime/1000,
      //   endtime:this.form.endtime/1000
      // }
      // console.log(data);

      reqSeckillAdd(this.form).then((res) => {
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

    // 一级分类改变时获取二级的分类
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      //   console.log(1111);
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    look(id) {
      reqSeckillDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.getSecondList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqSeckillUpate(this.form).then((res) => {
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
  mounted() {
    this.reqCateList();
  },
};
</script>
<style scoped>
.box {
  width: 600px;
}
</style>