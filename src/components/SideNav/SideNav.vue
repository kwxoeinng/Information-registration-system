<template>
  <div>
    <el-col>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="goTo('/home')">
          <i class="el-icon-house"></i>
          <span slot="title">来访登记</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goTo('/announcement')">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">信息公告</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="goTo('/arrange')">
              <i class="el-icon-date"></i>
              <span slot="title">工作安排</span></el-menu-item
            >
            <el-menu-item index="3-2" @click="goTo('/employeemsg')">
              <i class="el-icon-coin"></i>
              <span slot="title">员工信息</span>
            </el-menu-item>
            <el-menu-item index="3-3"
              ><i class="el-icon-setting"></i>
              <span slot="title">我的信息</span></el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-message"></i>
          <span slot="title">建议反馈</span>
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
