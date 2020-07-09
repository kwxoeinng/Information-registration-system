<template>
  <div id="list-container" style="margin: 20px auto;">
    <div style="width: 100%; overflow: hidden;">
      <el-form ref="form" label-width="80px">
        <div style="float: left; width:200px;">
          <el-form-item style="width:300px;">
            <el-input
              placeholder="输入手机号搜索"
              v-model="orderPhone"
            ></el-input>
          </el-form-item>
        </div>
        <el-button
          icon="el-icon-search"
          circle
          style="margin-left:110px;"
          @click="orderConditionsQuery()"
        ></el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      style="
        width: 90%;
        height: 680px;
        margin: 0 auto;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        overflow: hidden;
      "
    >
      <el-table :data="tableData" height="600">
        <el-table-column type="index" width="100" label="序号">
        </el-table-column>
        <!-- 身份证 -->
        <el-table-column
          prop="orderIdCard"
          label="身份证"
          width="200"
        ></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="orderName"
          label="姓名"
          width="200"
        ></el-table-column>
        <!-- 手机 -->
        <el-table-column
          prop="orderPhone"
          label="手机"
          width="200"
        ></el-table-column>
        <!-- 来访原因 -->
        <el-table-column
          prop="orderReason"
          label="来访原因"
          width="280"
        ></el-table-column>
        <!-- 来访时间 -->
        <el-table-column
          prop="orderArrive"
          label="来访时间"
          width="200"
        ></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="addFunc(scope.row)"
              >预约完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      title="完成预约"
      :visible.sync="dialogVisibleSuccess"
      width="30%"
    >
      <el-form label-width="80px" :model="add" ref="add" :rules="rules">
        <!-- 身份证 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="身份证">
            <el-input v-model="add.personIdCard" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 姓名 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="姓名">
            <el-input v-model="add.personName" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 手机 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="手机">
            <el-input v-model="add.personPhone" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 来访原因 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="来访原因">
            <el-input v-model="add.personReason" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 来访时间 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="来访时间">
            <el-date-picker
              style="width:300px"
              v-model="add.personArrive"
              type="datetime"
              placeholder="选择来访时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="true"
              prop="personArrive"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <!-- 粤康码 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="粤康码" prop="personCode">
            <el-tooltip :content="add.personCode" placement="top">
              <el-switch
                v-model="add.personCode"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="正常"
                inactive-value="不正常"
              >
              </el-switch>
            </el-tooltip>
            <!-- <el-input v-model="add.personCode"></el-input> -->
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleSuccess = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('add')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqQueryOrder,
  reqAddPerson,
  reqDelOrder,
  reqOrderConditionsQuery,
} from "../../api";
export default {
  data() {
    return {
      orderPhone: "",
      orderArrive: "",
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 6 * 24 * 3600 * 1000;
          let threeMonths = curDate + three;
          return time.getTime() > threeMonths;
        },
      },
      // 修改页面
      add: {
        personIdCard: "",
        personName: "",
        personPhone: "",
        personCode: "",
        personReason: "",
        personArrive: this.dateFormat(new Date()),
      },
      rules: {
        personCode: [
          {
            pattern: /^正常$/,
            message: "粤康码不正常，无法完成录入",
            trigger: "blur",
          },
        ],
      },
      dialogVisibleSuccess: false,
    };
  },
  created() {
    this.orderQuery();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addConfirm("add");
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
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    formatDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      // 拼接
      return year + "-" + month + "-" + day;
    },
    async orderQuery() {
      let result;
      const obj = {
        orderIdCard: this.orderIdCard,
        orderName: this.orderName,
        orderPhone: this.orderPhone,
        orderReason: this.orderReason,
        orderArrive: this.orderArrive,
      };
      result = await reqQueryOrder(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
    //条件查询
    async orderConditionsQuery() {
      let result;
      const obj = {
        orderPhone: this.orderPhone,
      };
      result = await reqOrderConditionsQuery(obj);
      if (result) {
        if (this.orderPhone == "") {
          this.orderQuery();
        } else {
          this.tableData = result;
        }
      } else {
        this.tableData = [];
      }
    },
    // 完成预约
    addFunc(row) {
      this.dialogVisibleSuccess = true;
      this._id = row._id;
      this.$set(this.$data.add, "personIdCard", row.orderIdCard);
      this.$set(this.$data.add, "personName", row.orderName);
      this.$set(this.$data.add, "personPhone", row.orderPhone);
      this.$set(this.$data.add, "personCode", row.orderCode);
      this.$set(this.$data.add, "personReason", row.orderReason);
      this.row = row;
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
            case "personIdCard":
              obj.personIdCard = status;
              break;
            case "personName":
              obj.personName = status;
              break;
            case "personPhone":
              obj.personPhone = status;
              break;
            case "personCode":
              obj.personCode = status;
              break;
            case "personReason":
              obj.personReason = status;
              break;
            default:
              obj.personArrive = status;
              break;
          }
        }
      }
      result = await reqAddPerson(obj);
      if (result) {
        const obj = {
          id: this.row._id,
        };
        result = await reqDelOrder(obj);
        if (result) {
          this.$message({
            message: "预约完成，跳转到来访登记页面",
            type: "success",
          });
          this.$router.replace('/home');
        } else {
          this.$message({
            message: result.errorMsg,
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      this.dialogVisibleSuccess = false;
    },
  },
};
</script>
<style></style>
