<template>
  <div class="big">
    <!-- <h1>登录</h1> -->
    <div class="box">
      <div>
        <h2>登录</h2>
      </div>
        <div>
          <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </div>
        <div>
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div>
          <el-button type="primary" class="btn" @click="login()">登录</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqLogin} from '../../utils/request'
import {warningAlert,successAlert} from '../../utils/alert'
export default {
  props: [],
  components: {},
  data() {
    return {
      form:{
        username:"",
        password:''
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:'changeUserInfoAction'
    }),
    // login(){
    //   this.$router.push('/')
    // },、
    
    // 登录
    login(){
      reqLogin(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('登录成功')
          console.log(res.data.list);
          this.changeUserInfoAction(res.data.list)
          this.$router.push("/")
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
.big{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #4E3649,#393C59);
}
.box{
  width: 350px;
  padding: 30px 80px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
}
.box div{
  padding-bottom: 10px;
  text-align: center;
}
h2{
  margin-bottom: 15px;
}
.btn{
  width: 100%;
  margin-bottom: 20px;
}
</style>