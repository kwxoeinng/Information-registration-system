<template>
  <div id="list-container" style="margin: 20px auto;" v-loading="loading">
    <!-- 查询、录入来访人员 -->
    <div style="width: 100%; overflow: hidden;">
      <el-form ref="form" label-width="80px">
        <div style="float: left; width: 30%;">
          <el-form-item>
            <el-input
              placeholder="请输入身份证"
              v-model="personIdCard"
              clearable
              maxlength="18"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
        <el-button style="margin-left: 20px;" @click="conditionsQuery(true)"
          >查 询</el-button
        >
        <el-button type="primary" @click="newAdd">录入来访人员</el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      style="
        width: 90%;
        height: 600px;
        margin: 0 auto;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        overflow: hidden;
      "
    >
      <el-table
        :data="tableData"
        height="600"
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column type="index" width="100" label="序号">
        </el-table-column>
        <!-- 身份证 -->
        <el-table-column
          prop="personIdCard"
          label="身份证"
          width="200"
        ></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="personName"
          label="姓名"
          width="200"
        ></el-table-column>
        <!-- 手机 -->
        <el-table-column
          prop="personPhone"
          label="手机"
          width="200"
        ></el-table-column>
        <!-- 粤康码 -->
        <el-table-column
          prop="personCode"
          label="粤康码"
          width="200"
        ></el-table-column>
        <!-- 来访原因 -->
        <el-table-column
          prop="personReason"
          label="来访原因"
          width="300"
        ></el-table-column>
        <!-- 来访时间 -->
        <el-table-column
          prop="personArrive"
          label="来访时间"
          width="300"
        ></el-table-column>
        <!-- 离开时间 -->
        <el-table-column
          prop="personLeave"
          label="离开时间"
          width="300"
          sortable
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="editFunc(scope.row)"
              >编辑</el-button
            >
            <el-button size="small" type="danger" @click="delFunc(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增对话框 -->
    <el-dialog
      title="录入来访人员"
      :visible.sync="dialogVisibleAdd"
      width="30%"
    >
      <el-form :model="add" ref="add" label-width="80px" :rules="rules">
        <!-- 身份证 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="身份证" prop="personIdCard">
            <el-input
              v-model="add.personIdCard"
              maxlength="18"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
        <!-- 姓名 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="姓名" prop="personName">
            <el-input v-model="add.personName"></el-input>
          </el-form-item>
        </div>
        <!-- 手机 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="手机" prop="personPhone">
            <el-input
              v-model="add.personPhone"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
        </div>
        <!-- 来访原因 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="来访原因" prop="personReason">
            <el-input v-model="add.personReason"></el-input>
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
        </div>
        <!-- 离开时间 -->
        <!-- <div style="float: left; width: 100%;">
          <el-form-item label="离开时间">
            <el-date-picker
              style="width:300px"
              v-model="add.personLeave"
              type="datetime"
              placeholder="选择离开时间"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
        </div> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('add')"
          >录入完成</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisibleEdit" width="30%">
      <el-form label-width="80px">
        <!-- 身份证 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="身份证">
            <el-input v-model="update.personIdCard" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 姓名 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="姓名">
            <el-input v-model="update.personName" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 手机 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="手机">
            <el-input v-model="update.personPhone" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 来访原因 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="来访原因">
            <el-input v-model="update.personReason" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <!-- 来访时间 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="来访时间">
            <el-date-picker
              style="width:300px"
              v-model="update.personArrive"
              type="datetime"
              placeholder="选择来访时间"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <!-- 粤康码 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="粤康码">
            <el-tooltip :content="update.personCode" placement="top">
              <el-switch
                v-model="update.personCode"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="正常"
                inactive-value="不正常"
                :disabled="true"
              >
              </el-switch>
            </el-tooltip>
            <!-- <el-input v-model="update.personCode"></el-input> -->
          </el-form-item>
        </div>
        <!-- 离开时间 -->
        <div style="float: left; width: 100%;">
          <el-form-item label="离开时间">
            <el-date-picker
              style="width:300px"
              v-model="update.personLeave"
              type="datetime"
              placeholder="选择来访时间"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm('update')"
          >确 定</el-button
        >
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

<script type="text/javascript">
import {
  reqQueryPerson,
  reqAddPerson,
  reqDelPerson,
  reqUpdatePerson,
  reqConditionsQuery,
} from "../../api";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      personIdCard: "",
      tableData: [],
      rules: {
        personIdCard: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "请输入正确长度的身份证",
            trigger: "blur",
          },
        ],
        personName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        personPhone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机",
            trigger: "blur",
          },
        ],
        personReason: [
          { required: true, message: "来访原因不能为空", trigger: "blur" },
        ],
        personCode: [
          {
            pattern: /^正常$/,
            message: "粤康码不正常，无法完成录入",
            trigger: "blur",
          },
        ],
      },
      // 新增页面
      add: {
        personIdCard: "",
        personName: "",
        personPhone: "",
        personCode: "",
        personReason: "",
        personArrive: this.dateFormat(new Date()),
        personLeave: "",
      },
      // 修改页面
      update: {
        personIdCard: "",
        personName: "",
        personPhone: "",
        personCode: "",
        personReason: "",
        personArrive: "",
        personLeave: this.dateFormat(new Date()),
      },
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      dialogVisibleDle: false,
      row: null,
      _id: "",
      loading: true,
    };
  },

  created() {
    this.query();
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
    //查询数据
    async query(isquery) {
      let result;
      const obj = {
        personIdCard: this.personIdCard,
        personName: this.personName,
        personPhone: this.personPhone,
        personCode: this.personCode,
        personReason: this.personReason,
        personArrive: this.personArrive,
        personLeave: this.personLeave,
      };
      // if (this.personIdCard) obj.personIdCard = this.personIdCard;
      // if (this.personName) obj.personName = this.personName;
      // if (this.personPhone) obj.personPhone = this.personPhone;
      // if (this.personDate) obj.personDate = this.personDate;
      result = await reqQueryPerson(obj);
      if (result) {
        this.tableData = result;
        if (isquery) {
          this.$message({
            message: "查询成功",
            type: "success",
          });
        }
        this.loading = false;
      } else {
        if (isquery) {
          this.$message({
            message: "查询失败",
            type: "warning",
          });
        }
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
            case "personArrive":
              obj.personArrive = status;
              break;
            default:
              obj.personLeave = status;
              break;
          }
        }
      }
      result = await reqAddPerson(obj);
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
      this.dialogVisibleAdd = false;
    },
    // 修改弹框
    editFunc(row) {
      this.dialogVisibleEdit = true;
      this._id = row._id;
      this.$set(this.$data.update, "personIdCard", row.personIdCard);
      this.$set(this.$data.update, "personName", row.personName);
      this.$set(this.$data.update, "personPhone", row.personPhone);
      this.$set(this.$data.update, "personCode", row.personCode);
      this.$set(this.$data.update, "personReason", row.personReason);
      this.$set(this.$data.update, "personArrive", row.personArrive);
      this.$set(this.$data.update, "personLeave", row.personLeave);
      this.row = row;
    },
    // 编辑页面提交
    async editConfirm() {
      let result;
      const id = this._id;
      let obj = { id: id };
      for (var key in this.update) {
        let status = this.update[key];
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
            case "personArrive":
              obj.personArrive = status;
              break;
            default:
              obj.personLeave = status;
              break;
          }
        }
      }
      result = await reqUpdatePerson(obj);
      if (result) {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.query(false);
      } else {
        this.$message({
          message: "更新失败",
          type: "warning",
        });
      }
      // console.log("提交编辑页面");
      this.dialogVisibleEdit = false;
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
      result = await reqDelPerson(obj);
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
    //条件查询
    async conditionsQuery() {
      let result;
      const obj = {
        personIdCard: this.personIdCard,
      };
      result = await reqConditionsQuery(obj);
      if (result) {
        if (this.personIdCard == "") {
          this.query();
        } else {
          this.tableData = result;
        }
      } else {
        this.tableData = [];
      }
    },
  },
};
</script>
