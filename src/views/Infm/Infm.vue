<template>
  <div>
    <!-- 菜单导航 -->
    <div>
      <el-menu default-active="4" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="$router.replace('/administrator')"
          >信息管理</el-menu-item
        >
        <el-menu-item index="2" @click="$router.replace('/arrm')">工作安排管理</el-menu-item>
        <el-menu-item index="3" @click="$router.replace('/healm')">健康打卡管理</el-menu-item>
        <el-menu-item index="4">意见反馈管理</el-menu-item>
        <el-menu-item index="5" @click="dialogVisibleChange = true"
          >退出管理员</el-menu-item
        >
      </el-menu>
    </div>
        <div style="margin:40px auto">
      <el-table
        :data="tableData"
        style="width: 60%;margin:0 auto;height:800px;"
      >
        <el-table-column prop="feedbackText" label="建议与反馈" width="200">
        </el-table-column>
        <el-table-column prop="feedbackRate" label="对工作的评分" width="200">
        </el-table-column>
      </el-table>
    </div>
    <!-- 切换弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleChange" width="30%">
      <div>是否退出管理员?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="$router.replace('/login')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reqQueryFeedback } from "../../api";
export default {
  data() {
    return {
      dialogVisibleChange: false,
      tableData: [],
    };
  },
  created() {
    this.query();
  },
  methods: {
    //查询数据
    async query(isquery) {
      let result;
      const obj = {
        feedbackText: this.feedbackText,
        feedbackRate: this.feedbackRate,
      };
      result = await reqQueryFeedback(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
  },
};
</script>
