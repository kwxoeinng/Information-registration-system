<template>
  <div>
    <div
      style="width:400px;height:60px;float:left;font-size:20px;font-weight:bold;margin-top:10px;color:#606266"
    >
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
          {{ userInfo.name }}
        </div>
        <div class="headerLoginText">
          <!-- {{ userInfo.phone || "暂无绑定手机号" }} -->
          <el-link
            :underline="false"
            style="font-size:11px;color:#409EFF"
            icon="el-icon-edit"
            @click="goTo('/health')"
            >健康打卡</el-link
          >
        </div>
      </div>
      <!-- 退出登录 -->
      <div class="loginoutBox">
        <div class="loginoutText">
          <el-link icon="el-icon-switch-button" @click="loginout">退出</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./header.css";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },
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
            type: "success",
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
