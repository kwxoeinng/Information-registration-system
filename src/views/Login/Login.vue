<template>
  <div class="box">
    <div class="inputContainer">
      <el-input
        style="float:left"
        v-model="inputone"
        placeholder="请输入用户名"
      ></el-input>
    </div>
    <div class="inputContainer">
      <el-input
        placeholder="请输入密码"
        v-model="inputtwo"
        show-password
      ></el-input>
    </div>
    <div class="btnContainer">
      <el-button type="primary" round size="medium" @click="goTo('/home')"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script>
import "./login.css";
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
