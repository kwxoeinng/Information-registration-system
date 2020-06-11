<template>
  <div>
    <!-- 表格 -->
    <div style="width:1000px;height:600px;margin:0 auto;">
      <el-table
        :data="diaryData"
        style="width:100%"
        :default-sort="{ prop: 'diaryDate', order: 'descending' }"
      >
        <el-table-column prop="diaryDate" label="日期" sortable width="250">
        </el-table-column>
        <el-table-column prop="diaryContent" label="内容" width="500">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="dialogDiary = true"
              >今日工作日记</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 工作日记 -->
    <el-dialog title="工作日记" :visible.sync="dialogDiary">
      <el-form :model="add" ref="add">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="add.diaryDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <div class="textStyle" style="margin:10px 50px">
          工号：{{ (add.mineID = userInfo.name) }}
        </div>
        <el-form-item
          ><el-input
            type="textarea"
            :autosize="{ minRows: 6 }"
            placeholder="完成今天的工作日记吧ヾ(◍°∇°◍)ﾉﾞ"
            v-model="add.diaryContent"
            maxlength="200"
          >
          </el-input
        ></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDiary = false">取 消</el-button>
        <el-button type="primary" @click="diaryConfirm('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { reqQueryDiary, reqAddDiary } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      diaryData: [],
      add: {
        mineID: "",
        diaryDate: "",
        diaryContent: "",
      },
      formLabelWidth: "120px",
      dialogDiary: false,
    };
  },
  created() {
    this.diaryQuery();
  },
  methods: {
    async diaryQuery() {
      let result;
      const obj = {
        diaryDate: this.diaryDate,
        diaryContent: this.diaryContent,
      };
      result = await reqQueryDiary(obj);
      if (result) {
        this.diaryData = result;
      } else {
        this.diaryData = [];
      }
    },
    async diaryConfirm() {
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
            case "diaryDate":
              obj.diaryDate = status;
              break;
            default:
              obj.diaryContent = status;
              break;
          }
        }
      }
      result = await reqAddDiary(obj);
      if (result) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        // 成功后，触发重新查询下数据
        this.diaryQuery();
        this.add = {};
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogDiary = false;
    },
  },
};
</script>
<style>
.textStyle {
  font-size: 14px;
  color: #909399;
}
</style>
