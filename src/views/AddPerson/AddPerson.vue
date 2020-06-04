<template>
  <el-form
    ref="form"
    :model="addPersonForm"
    label-width="80px"
    size="medium"
    :label-position="labelPosition"
  >
    <el-form-item label="身份证" style="width:500px">
      <el-input v-model="addPersonForm.idCard"></el-input>
    </el-form-item>
    <el-form-item label="姓名" style="width:500px">
      <el-input v-model="addPersonForm.name"></el-input>
    </el-form-item>
    <el-form-item label="手机" style="width:500px">
      <el-input v-model="addPersonForm.phoneNum"></el-input>
    </el-form-item>
    <el-form-item label="时间" style="width:500px">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="addPersonForm.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="addPersonForm.date2"
          style="width: 100%;"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item size="large" style="margin-top:100px">
      <el-button type="primary" @click="onSubmit" style="width:250px"
        >录入</el-button
      >
      <el-button style="width:250px" @click="goTo('/home')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      addPersonForm: {
        idCard: "",
        name: "",
        phoneNum: "",
        date1: "",
        date2: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>
