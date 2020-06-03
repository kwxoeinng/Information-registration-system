<template>
  <div>
    <el-container>
      <el-header v-show="$route.meta.showHeader"><Header></Header></el-header>
      <el-container>
        <el-aside width="200px" v-show="$route.meta.showSideNav"
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
  background-color: #b3c0d1;
  color: #333;
  line-height: 45px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 680px;
}
</style>
