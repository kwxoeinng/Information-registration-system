<template>
  <el-table :data="tableData" style="width: 100%" height="600">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="工号">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="小组 ID">
            <span>{{ props.row.groupId }}</span>
          </el-form-item>
          <el-form-item label="家庭地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="工号" prop="id"> </el-table-column>
    <el-table-column label="姓名" prop="name"> </el-table-column>
    <el-table-column label="描述" prop="address"> </el-table-column>
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
export default {
  data() {
    return {
      tableData: [
        {
          id: "11111110107",
          name: "李纯",
          address: "银河系地球村油油school",
          sex: "男",
          groupId: "10333",
        },
        {
          id: "11111110204",
          name: "孔孔",
          address: "银河系地球村油油school",
          sex: "男",
          groupId: "10333",
        },
        {
          id: "11111110205",
          name: "李芬",
          address: "银河系地球村油油school",
          sex: "男",
          groupId: "10333",
        },
        {
          id: "11111110209",
          name: "罗罗",
          address: "银河系地球村油油school",
          sex: "男",
          groupId: "10333",
        },
      ],
    };
  },
};
</script>
