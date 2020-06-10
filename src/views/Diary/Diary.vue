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
      <el-form :model="add">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="add.diaryDate"
            type="datetime"
            placeholder="选择来访时间"
            style="width:300px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工号：" :label-width="formLabelWidth"
          >{{ userInfo.name }}
        </el-form-item>
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
        <el-button type="primary" @click="dialogDiary = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { reqQueryDiary } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      diaryData: [],
      add: {
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
  },
};
</script>
<style></style>
