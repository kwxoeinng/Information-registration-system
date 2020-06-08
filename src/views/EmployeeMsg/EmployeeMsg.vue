<template>
  <el-table :data="tableData" style="width: 100%" height="600">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.employeeName }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.employeeSex }}</span>
          </el-form-item>
          <el-form-item label="工号">
            <span>{{ props.row.employeeId }}</span>
          </el-form-item>
          <el-form-item label="职称">
            <span>{{ props.row.employeeTitle }}</span>
          </el-form-item>
          <el-form-item label="籍贯">
            <span>{{ props.row.nativePlace }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="工号" prop="employeeId"> </el-table-column>
    <el-table-column label="姓名" prop="employeeName"> </el-table-column>
    <el-table-column label="职称" prop="nativePlace"> </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { reqQueryEmployee } from "../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.employeeQuery();
  },
  methods: {
    async employeeQuery() {
      let result;
      const obj = {
        employeeId: this.employeeId,
        employeeName: this.employeeName,
        employeeTitle: this.employeeTitle,
        employeeSex: this.employeeSex,
        nativePlace: this.nativePlace,
      };
      result = await reqQueryEmployee(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
  },
};
</script>
