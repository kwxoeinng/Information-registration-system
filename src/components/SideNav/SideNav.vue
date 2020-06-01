<template>
  <el-col>
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="goTo('/home')">
        <i class="el-icon-house"></i>
        <span slot="title">我的首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('/personal')">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>
<style></style>
