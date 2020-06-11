<template>
  <div class="announceBox">
    <!-- 发布公告 -->
    <div class="releaseBox">
      <el-form size="medium" :model="add" ref="add">
        <!-- 公告标题 -->
        <el-form-item class="titleBox">
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
              style="width:150px"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 发布人 -->
          <div class="textStyle" style="margin:10px 50px">
            发布人：{{ add.releaseIssuer }}
          </div>
        </div>
        <!-- 公告内容 -->
        <el-form-item
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
          @click="releaseConfirm('add')"
          >发布公告</el-button
        >
      </span>
    </div>
    <!-- 查询公告 -->
    <div class="queryBox">
      <el-table :data="tableData" stripe style="width: 100%;height:600px">
        <el-table-column prop="releaseTitle" label="公告标题" width="300">
        </el-table-column>
        <el-table-column fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              size="small"
              @click="editFunc(scope.row)"
              >查看公告</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import "./announcement.css";
import { reqQueryAnnouncement, reqAddAnnouncement } from "../../api";
export default {
  data() {
    return {
      add: {
        releaseTitle: "",
        releaseTime: "",
        releaseIssuer: "门卫处",
        releaseContent: "",
      },
      tableData: [],
    };
  },
  created() {
    this.releaseQuery();
  },
  methods: {
    async releaseQuery() {
      let result;
      const obj = {
        releaseTitle: this.releaseTitle,
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
