<template>
  <div>
    <!-- <h1>首页</h1> -->
    <el-container>
      <el-aside width="200px">
        <!-- 导航 -->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 首页 -->
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏  -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 可以展开-->
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- 单个菜单-->
            <el-menu-item v-else :index="item.url">{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header>
          <el-button type="danger" class="quit" @click="quit()">登出</el-button>
          <div>
            {{ userInfo.username }}
          </div>
        </el-header>
        <!-- main -->
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.name"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    quit() {
      this.changeUserInfoAction({});
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log(this.userInfo.menus);
    // this. changeUserInfoAction();
    // console.log(this.$route);
    // console.log(this.userInfo.menus);
  },
};
</script>
<style scoped>
.el-container {
  width: 100vw;
  height: 100vh;
}
.el-aside {
  background-color: #20222a;
  color: #fff;
}
.el-header {
  background-color: #b3c0d1;
}

.el-breadcrumb {
  padding-bottom: 20px;
}

.el-header div {
  height: 100%;
  line-height: 60px;
  float: right;
  margin-right: 20px;
  font-weight: bold;
}
.quit {
  float: right;
  margin-top: 10px;
}
</style>