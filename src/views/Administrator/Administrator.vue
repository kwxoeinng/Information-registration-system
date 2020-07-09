<template>
  <div>
    <!-- 菜单导航 -->
    <div>
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">信息管理</el-menu-item>
        <el-menu-item index="2" @click="$router.replace('/arrm')"
          >工作安排管理</el-menu-item
        >
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
    <!-- 新增 -->
    <div class="addUser">
      <el-form :model="add" ref="add">
        <div class="inputUser">
          <el-form-item>
            <el-input
              placeholder="录入新增工号"
              v-model="add.mineID"
            ></el-input>
          </el-form-item>
        </div>
        <div class="inputUser">
          <el-form-item
            ><el-input placeholder="输入新增密码" v-model="add.pwd"></el-input
          ></el-form-item>
        </div>
        <div class="btnUser">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="addConfirm('add')"
          ></el-button>
        </div>
      </el-form>
    </div>
    <!-- 自定义表格 -->
    <div class="userTable">
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column label="工号" width="200" prop="mineID">
        </el-table-column>
        <el-table-column label="密码" width="200" prop="pwd"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="editFunc(scope.row)"
              >个人信息</el-button
            >
            <el-button size="mini" type="danger" @click="delFunc(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      title="门卫个人信息"
      :visible.sync="dialogVisibleEdit"
      width="30%"
      v-loading="loading"
    >
      <el-form
        label-position="right"
        label-width="120px"
        :model="formData"
        size="medium"
      >
        <div style="display:flex;flex-direction: row;">
          <el-form-item label="工号:" style="width:250px;">
            {{ formData.mineID }}
          </el-form-item>
          <el-form-item label="姓名:" style="width:200px;">
            {{ formData.mineName }}
          </el-form-item>
        </div>
        <div style="display:flex;flex-direction: row;">
          <el-form-item label="身份证:">
            {{ formData.mineIdCard }}
          </el-form-item>
          <el-form-item label="政治面貌:">
            {{ formData.minePolitic }}
          </el-form-item>
        </div>
        <el-form-item label="手机号:" style="width:400px;">
          {{ formData.minePhone }}
        </el-form-item>
        <el-form-item label="家庭地址:">
          {{ formData.mineAddress }}
        </el-form-item>
        <el-form-item label="岗位:">
          <!-- {{ formData.minePost }} -->
          <el-select v-model="formData.minePost">
            <el-option label="警卫" value="警卫"></el-option>
            <el-option label="门卫" value="门卫"></el-option>
            <el-option label="门卫处负责人" value="门卫处负责人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期:" style="width:340px;">
          <el-input v-model="formData.mineHiredate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm('formData')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleDle" width="30%">
      <div>是否确认删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDle = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 切换弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleChange" width="30%">
      <div>是否退出管理员?</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisibleChange = false;
            $router.replace('/administrator');
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="$router.replace('/login')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "./administrator.css";
import {
  reqAddUser,
  reqQueryUser,
  reqDelUser,
  reqInfConditionsQuery,
  reqUpdateInf,
} from "../../api";
export default {
  data() {
    return {
      add: {
        mineID: "",
        pwd: "",
      },
      tableData: [],
      dialogVisibleDle: false,
      dialogVisibleChange: false,
      dialogVisibleEdit: false,
      formData: {
        mineID: "",
        mineName: "",
        mineIdCard: "",
        minePolitic: "",
        minePost: "",
        mineHiredate: "",
        minePhone: "",
        mineAddress: "",
      },
      loading: false,
    };
  },
  created() {
    this.query();
  },
  methods: {
    //查询数据
    async query() {
      let result;
      const obj = {
        mineID: this.mineID,
        pwd: this.pwd,
      };
      result = await reqQueryUser(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
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
            default:
              obj.pwd = status;
              break;
          }
        }
      }
      result = await reqAddUser(obj);
      if (result) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        // 成功后，触发重新查询下数据
        this.query();
        this.add = {};
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
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
      result = await reqDelUser(obj);
      if (result) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.query();
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogVisibleDle = false;
    },
    // 编辑弹框
    editFunc(row) {
      this.dialogVisibleEdit = true;
      this.row = row;
      this.mineQuery();
      this.loading = true;
    },
    //按工号查询
    async mineQuery() {
      let result;
      const obj = { mineID: this.row.mineID };
      result = await reqInfConditionsQuery(obj);
      if (result) {
        this.formData = result;
        this.loading = false;
      } else {
        this.formData = {};
      }
    },
    // 编辑页面提交
    async editConfirm() {
      let result;
      const mineID = this.row.mineID;
      let obj = { mineID: mineID };
      for (var key in this.formData) {
        let status = this.formData[key];
        if (status) {
          switch (key) {
            case "mineID":
              obj.mineID = status;
              break;
            case "mineName":
              obj.mineName = status;
              break;
            case "mineIdCard":
              obj.mineIdCard = status;
              break;
            case "minePolitic":
              obj.minePolitic = status;
              break;
            case "minePost":
              obj.minePost = status;
              break;
            case "mineHiredate":
              obj.mineHiredate = status;
              break;
            case "minePhone":
              obj.minePhone = status;
              break;
            default:
              obj.mineAddress = status;
              break;
          }
        }
      }
      result = await reqUpdateInf(obj);
      console.log(obj);
      if (result) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "更新失败",
          type: "warning",
        });
      }
      this.dialogVisibleEdit = false;
    },
  },
};
</script>
<style></style>
