<template>
  <div style="width: 600px">
    <!-- <h1>轮播图添加</h1> -->

    <el-dialog
      :title="info.isadd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="upfile"
            list-type="picture-card"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add()" v-if="info.isadd">添 加</el-button>
          <el-button type="primary" @click="update()" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "banner/reqListAction",
    }),
    cancle() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    upfile(e) {
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    add() {
      reqBannerAdd(this.form).then((res) => {
        console.log(res);
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
    look(id) {
      reqBannerDetail(id).then((res) => {
        // console.log(res);
        // console.log(this.form);
        if (res.data.code == 200) {
          this.info.isshow = true;
          this.form = res.data.list;
          this.form.id =id
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      // console.log(this.form);
      reqBannerUpdate(this.form).then((res) => {
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
</style>