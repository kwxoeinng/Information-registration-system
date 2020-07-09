<template>
  <div>
    <!-- 菜单导航 -->
    <div>
      <el-menu default-active="2" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="$router.replace('/administrator')"
          >信息管理</el-menu-item
        >
        <el-menu-item index="2">工作安排管理</el-menu-item>
        <el-menu-item index="3" @click="$router.replace('/healm')"
          >健康打卡管理</el-menu-item
        >
        <el-menu-item index="4" @click="$router.replace('/infm')"
          >意见反馈管理</el-menu-item
        >
        <el-menu-item index="5" @click="dialogVisibleChange = true"
          >退出管理员</el-menu-item
        >
      </el-menu>
    </div>
    <!-- 内容 -->
    <div>
      <div style="width:1200px;height:40px;margin:20px auto;">
        <el-button type="primary" round @click="dialogVisibleAdd = true"
          >值班安排</el-button
        >
      </div>
      <!-- 表格 -->
      <div style="margin:10px auto;width:1200px">
        <el-table :data="tableData" height="750">
          <el-table-column prop="mineID" label="工号" width="400">
          </el-table-column>
          <el-table-column prop="workDate" label="星期" width="400">
          </el-table-column>
          <el-table-column prop="workTime" label="时间" width="400">
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 新增对话框 -->
    <el-dialog
      title="安排工作"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      style="height:600px;"
    >
      <el-form :model="add" ref="add" label-width="80px" style="height:170px;">
        <!-- 工号 -->
        <div style="float: left; width: 320px;">
          <el-form-item label="工号" prop="mineID">
            <el-select v-model="add.mineID" placeholder="请选择工号">
              <el-option
                :label="item.mineID"
                :value="item.mineID"
                v-for="item in data"
                :key="item.mineID"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="add.mineID"></el-input> -->
          </el-form-item>
        </div>
        <!-- 日期 -->
        <div style="float: left; width: 320px;">
          <el-form-item label="星期" prop="workDate">
            <!-- <el-input v-model="add.workDate"></el-input> -->
            <el-select v-model="add.workDate" placeholder="请选择星期">
              <el-option label="星期一" value="星期一"></el-option>
              <el-option label="星期二" value="星期二"></el-option>
              <el-option label="星期三" value="星期三"></el-option>
              <el-option label="星期四" value="星期四"></el-option>
              <el-option label="星期五" value="星期五"></el-option>
              <el-option label="星期六" value="星期六"></el-option>
              <el-option label="星期天" value="星期天"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 时间 -->
        <div style="float: left; width: 320px;">
          <el-form-item label="时间" prop="workTime">
            <!-- <el-input v-model="add.workTime"></el-input> -->
            <el-select v-model="add.workTime" placeholder="请选择时间">
              <el-option label="00:00~06:00" value="00:00~06:00"></el-option>
              <el-option label="06:00~12:00" value="06:00~12:00"></el-option>
              <el-option label="12:00~18:00" value="12:00~18:00"></el-option>
              <el-option label="18:00~24:00" value="18:00~24:00"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm('add')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reqQueryWork, reqAddWork,reqQueryMine,reqQueryUser } from "../../api";
export default {
  data() {
    return {
      dialogVisibleChange: false,
      tableData: [],
      formData: {
        mineID:"",
        mineName: "",
        mineIdCard: "",
        minePolitic: "",
        minePost: "",
        mineHiredate: "",
        minePhone: "",
        mineAddress: "",
      },
      dialogVisibleAdd: false,
      // 新增页面
      add: {
        mineID: "",
        workDate: "",
        workTime: "",
      },
      data:[],
    };
  },
  created() {
    this.query();
    this.mineQuery();
  },
  methods: {
    //查询数据
    async query() {
      let result;
      const obj = {
        mineID: this.mineID,
        workDate: this.workDate,
        workTime: this.workTime,
      };
      result = await reqQueryWork(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
    // 新增弹框
    newAdd() {
      this.dialogVisibleAdd = true;
    },
    // 新增提交
    async addConfirm(formName) {
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
            case "workDate":
              obj.workDate = status;
              break;
            default:
              obj.workTime = status;
              break;
          }
        }
      }
      result = await reqAddWork(obj);
      if (result) {
        // 成功后，触发重新查询下数据
        this.query();
        this.add = {};
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogVisibleAdd = false;
    },
    //查询数据
    async mineQuery() {
      let result;
      const obj = {
        mineID: this.mineID,
        pwd: this.pwd,
      };
      result = await reqQueryUser(obj);
      console.log(result);
      if (result) {
        this.data = result;
      } else {
        this.data = [];
      }
    },
  },
};
</script>
