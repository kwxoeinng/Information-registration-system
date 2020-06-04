<template>
  <div>
    <el-col>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="goTo('/home')">
          <i class="el-icon-house"></i>
          <span slot="title">来访登记</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">信息公告</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-date"></i>
          <span slot="title">工作安排</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">日记记录</span>
        </el-menu-item>
        <el-menu-item index="5" @click="goTo('/personal')">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
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
