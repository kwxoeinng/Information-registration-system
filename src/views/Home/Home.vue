<template>
  <div class="homeBox">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      class="formBox"
      v-show="$route.meta.showHome"
    >
      <div style="width:400px;height:50px;">
        <el-form-item label="搜索">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-button>搜索</el-button>
          <el-button type="primary" @click="goTo('/home/addPeroson')"
            >录入来访人员</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <el-table
      :data="tableData"
      height="550"
      class="tableBox"
      v-show="$route.meta.showHome"
    >
      <el-table-column prop="idCard" label="身份证" width="250">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column prop="phoneNum" label="手机" width="200">
      </el-table-column>
      <el-table-column label="时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px"
            >`{{ scope.row.date1 }}-{{ scope.row.date2 }}`</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <router-view></router-view>
  </div>
</template>
<script>
import "./home.css";
export default {
  data() {
    return {
      tableData: [],
      form: {
        idCard: "",
        name: "",
        phoneNum: "",
        date1: "",
        date2: "",
      },
    };
  },
  created() {
    this.queryPerson();
  },
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },
    handleEdit() {
      console.log(this.tableData.length);
    },
    //查询数据
    queryPerson() {},
  },
};
</script>
