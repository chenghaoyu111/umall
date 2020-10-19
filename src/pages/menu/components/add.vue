<template>
  <div>
    <!-- 弹框 -->
    <el-dialog :title="info.isAdd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed='close'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change='changePid()'>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name"
            >
              <!-- <i :class="item.path"></i> -->
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "../../../router/index";
import { reqMenuAdd } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMenuDetail,reqMenuUpdate} from '../../../utils/request'
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      indexRouters: indexRouters,
    };
  },
  computed: {
    ...mapGetters({
      list:'menu/list'
    }),
    
  },
  methods: {
    ...mapActions({
      reqListAction:'menu/reqListAction',
    }),
    
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)//成功弹出提示
          this.empty()//重置弹框数据
          this.cancel();//弹框消失
          this.reqListAction()//添加成功刷新list列表
        } else {
          warningAlert(res.data.msg);//失败弹出提示
        }
      });
      // console.log(this.form);
    },
    changePid(){
      if(this.form.pid==0){
        this.form.type=1
      }else{
        this.form.type=2
      }
    },
    // 点击编辑时回去form信息
    look(id){
      reqMenuDetail(id).then((res)=>{
        if(res.data.code ==200){
          this.form = res.data.list
          this.form.id = id
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    update(){
      reqMenuUpdate(this.form).then(res=>{
        if(res.data.code==200){
            successAlert(res.data.msg)
            this.empty()
            this.cancel()
            this.reqListAction()
        }else{
          warningAlert()
        }
      })
    },
    close(){
      if(!this.info.isAdd){
        this.empty()
      }
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>