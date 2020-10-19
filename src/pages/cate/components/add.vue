<template>
  <div class="box">
    <!-- <h1>添加</h1> -->
    <el-dialog
      :title="info.isadd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form" ref="form" label-width="100px" class="demo-Form">
        <el-form-item label="顶级分类" prop="pid" >
          <el-select v-model="form.pid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
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

        <el-form-item label="状态">
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
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
    add() {
      reqCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.empty();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
      this.cancle();
      this.empty();
    },
    cancle() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
    },

    upfile(e) {
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    look(id) {
      reqCateDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqCateUpdate(this.form).then((res) => {
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
    close() {
      if (!this.info.isadd) {
        this.empty();
      }
    }
  },
  mounted() {},
};
</script>
<style scoped >
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