<template>
  <div class="announceBox">
    <!-- 发布公告 -->
    <div class="releaseBox">
      <el-form size="medium" :model="add" ref="add" :rules="rules">
        <!-- 公告标题 -->
        <el-form-item class="titleBox" prop="releaseTitle">
          <el-input
            v-model="add.releaseTitle"
            placeholder="请输入公告标题"
          ></el-input>
        </el-form-item>
        <!-- 公告信息 -->
        <div class="msgBox">
          <!-- 发布时间 -->
          <el-form-item>
            <el-date-picker
              v-model="add.releaseTime"
              type="date"
              placeholder="选择日期"
              size="mini"
              style="width:170px"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 发布人 -->
          <div class="textStyle" style="margin:10px 50px">
            发布人：{{ (add.releaseIssuer = releaseIssuer) }}
          </div>
        </div>
        <!-- 公告内容 -->
        <el-form-item prop="releaseContent"
          ><el-input
            type="textarea"
            :autosize="{ minRows: 20 }"
            placeholder="请输入公告内容"
            v-model="add.releaseContent"
            style="width:860px;margin:0 20px"
          >
          </el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" style="width:200px;margin-left:680px">
        <el-button
          type="primary"
          style="width:200px;"
          round
          @click="submitForm('add')"
          >发布公告</el-button
        >
      </span>
    </div>
    <!-- 查询公告 -->
    <div class="queryBox">
      <el-table :data="tableData" stripe style="width: 100%;height:600px">
        <el-table-column prop="releaseTitle" label="公告标题" width="400">
        </el-table-column>
        <el-table-column fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              size="small"
              @click="queryFunc(scope.row)"
              >查看公告</el-button
            >
            <el-button size="small" type="danger" @click="delFunc(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 公告信息 -->
    <el-dialog
      :visible.sync="announcementDialog"
      width="40%"
      class="announcement"
    >
      <div class="releaseTitle" prop="releaseTitle">
        {{ query.releaseTitle }}
      </div>
      <div class="msgContainer">
        <div class="msgText" prop="releaseTime">
          {{ query.releaseTime }}
        </div>
        <div class="msgText" prop="releaseIssuer">
          {{ query.releaseIssuer }}
        </div>
      </div>
      <div class="releaseContent" prop="releaseContent">
        {{ query.releaseContent }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="announcementDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleDle" width="30%">
      <div>是否确认删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDle = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "./announcement.css";
import {
  reqQueryAnnouncement,
  reqAddAnnouncement,
  reqDelAnnouncement,
} from "../../api";
export default {
  data() {
    return {
      releaseIssuer: "门卫处",
      add: {
        releaseTitle: "",
        releaseTime: this.dateFormat(new Date()),
        releaseIssuer: "门卫处",
        releaseContent: "",
      },
      query: {
        releaseTitle: "",
        releaseTime: "",
        releaseIssuer: "",
        releaseContent: "",
      },
      tableData: [],
      announcementDialog: false,
      dialogVisibleDle: false,
      row: null,
      _id: "",
      rules: {
        releaseTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        releaseContent: [
          { required: true, message: "公告内容不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.releaseQuery();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.releaseConfirm("add");
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
    async releaseQuery() {
      let result;
      const obj = {
        releaseTitle: this.releaseTitle,
        releaseTime: this.releaseTime,
        releaseIssuer: this.releaseIssuer,
        releaseContent: this.releaseContent,
      };
      result = await reqQueryAnnouncement(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
    async releaseConfirm(formName) {
      let result;
      let obj = {};
      let formData = new FormData();
      for (var key in this.add) {
        let status = this.add[key];
        if (status) {
          switch (key) {
            case "releaseTitle":
              obj.releaseTitle = status;
              break;
            case "releaseTime":
              obj.releaseTime = status;
              break;
            case "releaseIssuer":
              obj.releaseIssuer = status;
              break;
            default:
              obj.releaseContent = status;
              break;
          }
        }
      }
      result = await reqAddAnnouncement(obj);
      if (result) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        // 成功后，触发重新查询下数据
        this.releaseQuery();
        this.add = {};
        this.releaseTime = "2020-07-03";
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
    },
    queryFunc(row) {
      this.announcementDialog = true;
      this._id = row._id;
      this.$set(this.$data.query, "releaseTitle", row.releaseTitle);
      this.$set(this.$data.query, "releaseTime", row.releaseTime);
      this.$set(this.$data.query, "releaseIssuer", row.releaseIssuer);
      this.$set(this.$data.query, "releaseContent", row.releaseContent);
      this.row = row;
      console.log(this.row);
    },
    // 删除弹框
    delFunc(row) {
      this.dialogVisibleDle = true;
      this.row = row;
    },
    // 删除提交
    async delConfirm() {
      let result;
      const obj = {
        id: this.row._id,
      };
      result = await reqDelAnnouncement(obj);
      if (result) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.releaseQuery();
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogVisibleDle = false;
    },
  },
};
</script>
