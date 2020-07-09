<template>
  <div id="app" class="set">
    <el-container>
      <el-header v-show="$route.meta.showHeader" style="height:80px;"
        ><Header></Header
      ></el-header>
      <el-container>
        <el-aside width="250px;height:700px;" v-show="$route.meta.showSideNav"
          ><SideNav></SideNav
        ></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
      <el-footer v-show="$route.meta.showFooter"><Footer></Footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from "./components/Header/Header.vue";
import SideNav from "./components/SideNav/SideNav.vue";
import Footer from "./components/Footer/Footer.vue";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
  },
  components: {
    Header,
    SideNav,
    Footer,
  },
};
</script>
<style>
* html,
body {
  margin: 0;
  padding: 0;
}
.el-header {
  width: 100%;
  color: #333;
  background-color: #0c82dc;
}
.el-footer {
  position: relative;
  top: 80px;
  color: #909399;
  text-align: center;
  line-height: 10px;
  font-size: 12px;
  width: 100%;
}
.el-main {
  width: 100%;
  padding:0px;
}
.el-aside {
  color: #333;
  background-color: #fff;
}
</style>
