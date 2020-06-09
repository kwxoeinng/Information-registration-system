<template>
  <div id="list-container" style="margin: 20px auto;">
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
      <el-table :data="tableData" height="600" style="width: 100%;">
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
          width="300"
        ></el-table-column>
        <!-- 来访时间 -->
        <el-table-column
          prop="orderArrive"
          label="来访时间"
          width="200"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { reqQueryOrder } from "../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.orderQuery();
  },
  methods: {
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
  },
};
</script>
<style></style>
