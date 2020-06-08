<template>
  <div>
    <el-dialog title="建议反馈" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="add" label-position="top">
        <el-form-item label="建议与反馈" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="请输入您的建议/反馈"
            v-model="add.feedbackText"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="评价一下所担任的工作"
          :label-width="formLabelWidth"
        >
          <el-input v-model="add.feedbackRate" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFeedack('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqAddFeedback } from "../../api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      add: {
        feedbackText: "",
        feedbackRate: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.dialogFormVisible = true;
  },
  methods: {
    async addFeedack() {
      let result;
      let obj = {};
      let formData = new FormData();
      for (var key in this.add) {
        let status = this.add[key];
        if (status) {
          switch (key) {
            case "feedbackText":
              obj.feedbackText = status;
            default:
              obj.feedbackRate = status;
              break;
          }
        }
      }
      result = await reqAddFeedback(obj);
      if (result) {
        this.$message({
          message: "提交成功，跳转回首页",
          type: "success",
        });
        this.$router.replace("/home");
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style></style>
