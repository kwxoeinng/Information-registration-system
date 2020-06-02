<template>
  <div class="box">
    <!-- 用户名 -->
    <div class="inputContainer">
      <el-input
        style="float:left"
        v-model="inputone"
        placeholder="请输入用户名"
      ></el-input>
    </div>
    <!-- 密码 -->
    <div class="inputContainer">
      <el-input
        placeholder="请输入密码"
        v-model="inputtwo"
        show-password
      ></el-input>
    </div>
    <!-- 登录 -->
    <div class="btnContainer">
      <el-button type="primary" round size="medium" @click="goTo('/login')"
        >注册</el-button
      >
    </div>
  </div>
</template>
<script>
import "./register.css";
export default {
  data() {
    return {
      inputone: "",
      inputtwo: "",
    };
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>
