<template>
  <div style="width:800px;height:400px;margin:50px auto">
    <el-form
      v-loading="loading"
      label-position="right"
      label-width="120px"
      :model="formData"
      size="medium"
    >
      <div style="display:flex;flex-direction: row;">
        <el-form-item label="工号:">
          {{ userInfo.mineID }}
        </el-form-item>
        <el-form-item label="入职时间:">
          {{ formData.mineHiredate }}
        </el-form-item>
      </div>
      <div style="display:flex;flex-direction: row;">
        <el-form-item label="职位:">
          {{ formData.minePost }}
        </el-form-item>
        <!-- <el-button
          v-show="formData.minePost == '门卫处负责人'"
          type="info"
          plain
          style="width:100px;height:30px;margin-left:40px;"
          size="mini"
          @click="dialogAdminVisible = true"
          >管理员登录</el-button
        > -->
      </div>
      <div style="display:flex;flex-direction: row;">
        <el-form-item label="姓名:" style="width:250px;">
          <el-input v-model="formData.mineName"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌:" style="width:250px;">
          <el-select v-model="formData.minePolitic">
            <el-option label="中国共产党员" value="中国共产党员"></el-option>
            <el-option label="共青团员" value="共青团员"></el-option>
            <el-option label="群众" value="群众"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="身份证:" style="width:400px;">
        <el-input v-model="formData.mineIdCard"></el-input>
      </el-form-item>
      <el-form-item label="手机号" style="width:400px;">
        <el-input v-model="formData.minePhone"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址" style="width:600px;">
        <el-input v-model="formData.mineAddress"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" style="margin-left:530px;" @click="editConfirm('formData')"
        >保 存</el-button
      >
    </span>
    <el-dialog
      title="管理员登录"
      :visible.sync="dialogAdminVisible"
      width="20%"
    >
      <el-form>
        <el-form-item>
          <el-input
            v-model="adminName"
            style="width:200px;margin-left:80px;"
            prefix-icon="el-icon-user"
            placeholder="请输入管理员账号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="adminPwd"
            style="width:200px;margin-left:80px;"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdminVisible = false">取 消</el-button>
        <el-button type="primary" @click="login('/administrator')"
          >登 录</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "./information.css";
import { mapState } from "vuex";
import { reqQueryMine, reqAdminLogin,reqUpdateInf } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.mineQuery();
  },
  data() {
    return {
      formData: {
        mineName: "",
        mineIdCard: "",
        minePolitic: "",
        minePost: "",
        mineHiredate: "",
        minePhone: "",
        mineAddress: "",
      },
      adminName: "",
      adminPwd: "",
      dialogAdminVisible: false,
      loading: true,
    };
  },
  methods: {
    //异步登录
    async login(path) {
      let result;
      const { adminName, adminPwd } = this;
      // 发送ajax请求密码登陆
      result = await reqAdminLogin({ adminName, adminPwd });
      // 根据结果数据处理
      if (result.code === 0) {
        // 跳转
        this.$router.replace(path);
        this.adminName = "";
        this.adminPwd = "";
      } else {
        // 显示警告提示
        const msg = result.msg;
        this.$message.error(msg);
      }
      this.dialogAdminVisible = false;
    },
    async mineQuery() {
      let result;
      const obj = { mineID: this.userInfo.mineID };
      result = await reqQueryMine(obj);
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
      const mineID = this.userInfo.mineID;
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
      if (result) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.mineQuery();
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
