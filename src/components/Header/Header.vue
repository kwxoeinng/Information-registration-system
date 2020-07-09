<template>
  <div>
    <div class="mainText">
      学校来访人员信息登记系统
    </div>
    <div class="headerBox">
      <!-- 头像 -->
      <div class="avatarLoginBox">
        <div class="avatarLogin">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
      </div>
      <!-- 用户名、手机号 -->
      <div class="headerLoginBox">
        <div class="headerLoginText">
          {{ userInfo.mineID }}
        </div>
        <div>
          <el-link
            :underline="false"
            style="font-size:11px;color:#fff"
            icon="el-icon-edit"
            @click="goTo('/health')"
            >健康打卡</el-link
          >
        </div>
      </div>
      <!-- 退出登录 -->
      <div class="loginoutBox">
        <el-dropdown>
          <span>
            <i class="el-icon-setting" style="color:#fff;font-size:20px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><el-link icon="el-icon-switch-button" @click="loginout"
                >退出</el-link
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import "./header.css";
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      adminName: "",
      adminPwd: "",
      dialogAdminVisible: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    loginout() {
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 请求退出
          this.$store.dispatch("logout");
          this.$message({
            message: "退出成功!",
          });
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>
<style scoped>
body {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #0c82dc;
}
</style>
