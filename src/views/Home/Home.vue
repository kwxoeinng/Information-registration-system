<template>
  <div id="list-container" style="margin:20px auto">
    <!-- 查询、录入来访人员 -->
    <div style="width:100%;overflow:hidden;">
      <el-form ref="form" label-width="80px">
        <div style="float:left;width:30%">
          <el-form-item>
            <el-input
              placeholder="请输入身份证"
              v-model="personIdCard"
            ></el-input>
          </el-form-item>
        </div>
        <el-button style="margin-left:20px;" @click="query(true)"
          >查 询</el-button
        >
        <el-button type="primary" @click="newAdd">录入来访人员</el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      style="width:90%; margin: 0 auto; border: 1px solid #ebebeb; border-radius: 3px;overflow:hidden;"
    >
      <el-table :data="tableData" style="width: 100%">
        <!-- 身份证 -->
        <el-table-column
          prop="personIdCard"
          label="身份证"
          width="300"
        ></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="personName"
          label="姓名"
          width="250"
        ></el-table-column>
        <!-- 手机 -->
        <el-table-column
          prop="personPhone"
          label="手机"
          width="250"
        ></el-table-column>
        <!-- 来访时间 -->
        <el-table-column
          prop="personDate"
          label="来访时间"
          width="250"
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
    <el-dialog title="新增" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form :model="add" ref="add" label-width="80px">
        <!-- 身份证 -->
        <div style="float:left;width:100%">
          <el-form-item label="身份证">
            <el-input v-model="add.personIdCard"></el-input>
          </el-form-item>
        </div>
        <!-- 姓名 -->
        <div style="float:left;width:100%">
          <el-form-item label="姓名">
            <el-input v-model="add.personName"></el-input>
          </el-form-item>
        </div>
        <!-- 手机 -->
        <div style="float:left;width:100%">
          <el-form-item label="手机">
            <el-input v-model="add.personPhone"></el-input>
          </el-form-item>
        </div>
        <!-- 来访时间 -->
        <div style="float:left;width:100%">
          <el-form-item label="来访时间">
            <el-input v-model="add.personDate"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm('add')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisibleEdit" width="30%">
      <el-form label-width="80px">
        <!-- 身份证 -->
        <div style="float:left;width:100%">
          <el-form-item label="身份证">
            <el-input v-model="update.perosonIdCard"></el-input>
          </el-form-item>
        </div>
        <!-- 姓名 -->
        <div style="float:left;width:100%">
          <el-form-item label="姓名">
            <el-input v-model="update.personName"></el-input>
          </el-form-item>
        </div>
        <!-- 手机 -->
        <div style="float:left;width:100%">
          <el-form-item label="手机">
            <el-input v-model="update.personPhone"></el-input>
          </el-form-item>
        </div>
        <!-- 来访时间 -->
        <div style="float:left;width:100%">
          <el-form-item label="来访时间">
            <el-input v-model="update.personDate"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
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
import { reqQueryPerson, reqAddPerson } from "../../api";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      personIdCard: "",
      personName: "",
      personPhone: "",
      personDate: "",
      tableData: [],
      // 新增页面
      add: {
        personIdCard: "",
        personName: "",
        personPhone: "",
        personDate: "",
      },
      // 修改页面
      update: {
        personIdCard: "",
        personName: "",
        personPhone: "",
        personDate: "",
      },
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      dialogVisibleDle: false,
      row: null,
      _id: "",
    };
  },
  created() {
    this.query();
  },
  methods: {
    async query(isquery) {
      let result;
      const obj = {};
      if (this.personIdCard) obj.personIdCard = this.personIdCard;
      if (this.personName) obj.personName = this.personName;
      if (this.personPhone) obj.personPhone = this.personPhone;
      if (this.personDate) obj.personDate = this.personDate;
      result = await reqQueryPerson(obj);
      if (result) {
        this.tableData = result;
        if (isquery) {
          this.$message({
            message: "查询成功",
            type: "success",
          });
        }
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
        if(status)
        {
          switch (key) {
            case "personIdCard":
              obj.personIdCard = status
              break;
            case "personName":
              obj.personName = status
              break;
            case "personPhone":
              obj.personPhone = status
              break;
            default:
              obj.personDate = status
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
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
      console.log("提交新增数据");
      this.dialogVisibleAdd = false;
    },
    // 修改弹框
    editFunc(row) {
      console.log("修改弹框");
      this.dialogVisibleEdit = true;
    },
    // 编辑页面提交
    editConfirm() {
      console.log("提交编辑页面");
      this.dialogVisibleEdit = false;
    },
    // 删除弹框
    delFunc(row) {
      console.log("删除弹框");
      this.dialogVisibleDle = true;
    },
    // 删除提交
    delConfirm() {
      console.log("删除提交");
      this.dialogVisibleDle = false;
    },
  },
};
</script>
