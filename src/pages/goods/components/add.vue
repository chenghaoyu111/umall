<template>
  <div class="box">
    <!-- <h1>添加</h1> -->
    <el-dialog
      :title="info.isadd ? '添加商品管理' : '编辑商品管理'"
      :visible.sync="info.isshow"
      @opened="opened"
    >
      <el-form :model="form" ref="form" label-width="100px" class="demo-Form">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="请选择" disabled value=""></el-option>
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
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="upfile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="(item,index) in goodsAttrList"
              :key="item"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <div v-if="info.isshow" id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",

        specsattr: [],

        isnew: 1,
        ishot: 1,
        status: 1,
      },
      secondCateList: [],
      goodsAttrList: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      // 商品规格
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
      reqSpecsList: "specs/reqListAction",
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
    }),

    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    upfile(e) {
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },


    changeSpecs() {
      this.form.specsattr = [];
      this.getAttrsArr();
      // console.log(this.goodsAttrList);
    },
    getAttrsArr() {
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      this.goodsAttrList = obj.attrs;
      console.log(this.goodsAttrList);
      // console.log(obj.attrs);
      // console.log(this.goodsAttrList,typeof this.goodsAttrList);
    },

    // 》》》》》》  添  加  《《《《《《
    add() {
      this.form.description = this.editor.txt.html();
      console.log(this.form.description);
      // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。要转换的 JavaScript 值（通常为对象或数组）
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      console.log(data);
      reqGoodsAdd(data).then((res) => {
        console.log(2222);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancle();
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 清空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };

      this.secondCateLis = []; //二级分类的list

      this.imgUrl = ""; //图片地址

      this.goodsAttrList = []; //商品属性list
    },
    // 隐藏弹框
    cancle() {
      this.info.isshow = false;
    },
    // 弹窗打开的时候创建富文本
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description); //创建完富文本在赋值
    },
    // 获取菜单的详情
    look(id) {
      reqGoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          this.form = res.data.list; // 给form赋值

          this.form.id = id; // 添加一个id给form

          this.getSecondList(); // 请求二级分类

          this.imgUrl = this.$imgPre + this.form.img; // ？图片？

          this.form.specsattr = JSON.parse(this.form.specsattr); // 商品属性  字符串==>>数组

          this.getAttrsArr(); // 获取商品属性
          // this.form.description = this.editor.txt.html();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

// 修改
    update() {
      // 富文本赋值
      this.form.description = this.editor.txt.html();
      // 声明一个data作为参数，data的值是form里的信息
      let data = {
        ...this.form,
        // 转字符串
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsUpdate(data).then((res) => {
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
    this.reqSpecsList();
    // console.log(this.form);
  },
};
</script>
<style scoped>
.box {
  width: 500px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #0f0f0f;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>