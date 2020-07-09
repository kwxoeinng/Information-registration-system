<template>
  <div>
    <!-- 表格 -->
    <div style="width:1000px;height:600px;margin:0 auto;">
      <el-table
        :data="diaryData"
        style="width:100%"
        :default-sort="{ prop: 'diaryDate', order: 'descending' }"
        v-loading="loading"
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
      <el-form :model="add" ref="add" :rules="rules">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="add.diaryDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :disabled="true"
          >
          </el-date-picker>
        </el-form-item>
        <div class="textStyle" style="margin:20px 80px">
          工号：{{ (add.mineID = userInfo.mineID) }}
        </div>
        <el-form-item prop="diaryContent"
          ><el-input
            style="margin:10px auto;"
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
        <el-button type="primary" @click="submitForm('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "./diary.css";
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
        diaryDate: this.dateFormat(new Date()),
        diaryContent: "",
      },
      formLabelWidth: "120px",
      dialogDiary: false,
      loading: true,
      rules: {
        diaryContent: [
          { required: true, message: "日记内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.diaryQuery();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.diaryConfirm("add");
        } else {
          return false;
        }
      });
    },
    //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      // 拼接
      return year + "-" + month + "-" + day;
    },
    async diaryQuery() {
      let result;
      const obj = {
        diaryDate: this.diaryDate,
        diaryContent: this.diaryContent,
      };
      result = await reqQueryDiary(obj);
      if (result) {
        this.diaryData = result;
        this.loading = false;
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
