<template>
  <div style="width:500px;height:400px;margin:50px auto">
    <el-form
      label-position="right"
      label-width="120px"
      :model="formData"
      size="medium"
    >
      <el-form-item label="工号:">
        <el-input :disabled="true" v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input :disabled="true" v-model="formData.mineName"></el-input>
      </el-form-item>
      <el-form-item label="身份证:">
        <el-input :disabled="true" v-model="formData.mineIdCard"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌:">
        <el-input :disabled="true" v-model="formData.minePolitic"></el-input>
      </el-form-item>
      <el-form-item label="岗位:">
        <el-input :disabled="true" v-model="formData.minePost"></el-input>
      </el-form-item>
      <el-form-item label="入职时间:">
        <el-input :disabled="true" v-model="formData.mineHiredate"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.minePhone"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input v-model="formData.mineAddress"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { reqQueryMine } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.mineQuery();
  },
  data() {
    return {
      formData: {
        mineName: "",
        mineIdCard: "",
        minePolitic: "",
        minePost: "",
        mineHiredate: "",
        minePhone: "",
        mineAddress: "",
      },
    };
  },
  methods: {
    async mineQuery() {
      let result;
      const obj = { mineID: this.userInfo.name };
      result = await reqQueryMine(obj);
      if (result) {
        this.formData = result;
      } else {
        this.formData = {};
      }
    },
  },
};
</script>
<style></style>
