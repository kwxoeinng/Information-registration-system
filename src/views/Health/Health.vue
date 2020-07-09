<template>
  <el-dialog
    title="健康打卡"
    v-if="dialogFormVisible"
    :visible.sync="dialogFormVisible"
    :showClose="showClo"
    :close-on-click-modal="false"
  >
    <el-form :model="add" ref="add" :rules="healthRules">
      <el-form-item
        label="工号："
        :label-width="formLabelWidth"
        style="width:400px"
      >
        <div>{{ (add.mineID = userInfo.mineID) }}</div>
      </el-form-item>
      <div style="display:flex;flex-direaction:row;">
        <el-form-item
          label="体温："
          :label-width="formLabelWidth"
          style="width:300px"
          prop="temperature"
        >
          <el-select v-model="add.temperature" placeholder="请选择体温">
            <el-option label="36-37℃" value="体温正常"></el-option>
            <el-option label="37.1-38℃" value="低热"></el-option>
            <el-option label="38.1-39℃" value="中热"></el-option>
            <el-option label="39.1-41℃" value="高热"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="症状："
          :label-width="formLabelWidth"
          style="width:300px"
          prop="symptom"
        >
          <el-select v-model="add.symptom" placeholder="请选择出现的症状">
            <el-option label="正常" value="无症状"></el-option>
            <el-option label="咳嗽" value="咳嗽症状"></el-option>
            <el-option label="头晕" value="头晕症状"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item
        label="目前所在地："
        :label-width="formLabelWidth"
        style="width:600px"
        prop="habitation"
      >
        <el-input v-model="add.habitation" placeholder="请输入目前所在地"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" style="width:200px;margin-left:500px">
      <el-button
        type="primary"
        style="width:200px;"
        round
        @click="submitForm('add')"
        >打 卡</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { reqAddHealth } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      dialogFormVisible: true,
      add: {
        mineID: "",
        temperature: "",
        symptom: "",
        habitation: "",
      },
      formLabelWidth: "120px",
      showClo: false,
      healthRules: {
        temperature: [
          { required: true, message: "请选择体温", trigger: "blur" },
        ],
        symptom: [{ required: true, message: "请选择症状", trigger: "blur" }],
        habitation: [
          { required: true, message: "目前居住地不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.healtheConfirm("add");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async healtheConfirm() {
      let result;
      let obj = {};
      let formData = new FormData();
      for (var key in this.add) {
        let status = this.add[key];
        if (status) {
          switch (key) {
            case "mineID":
              obj.mineID = status;
              break;
            case "temperature":
              obj.temperature = status;
              break;
            case "symptom":
              obj.symptom = status;
              break;
            default:
              obj.habitation = status;
              break;
          }
        }
      }
      result = await reqAddHealth(obj);
      if (result) {
        this.$message({
          message: "健康打卡已完成，返回首页",
          type: "success",
        });
        this.add = {};
        this.$router.replace("/home");
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
    },
  },
};
</script>
<style></style>
