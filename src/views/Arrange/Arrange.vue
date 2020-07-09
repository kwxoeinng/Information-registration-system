<template>
  <div style="width:1000px;margin:0 auto;">
    <el-table :data="tableData" stripe style="width:1000px;height:100%;margin:0 auto;">
      <el-table-column prop="workDate" label="星期" width="500">
      </el-table-column>
      <el-table-column prop="workTime" label="时间" width="500">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { reqWorkConditionsQuery } from "../../api";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.conditionsQuery();
  },
  methods: {
    //条件查询
    async conditionsQuery() {
      let result;
      const obj = {
        mineID: this.userInfo.mineID,
      };
      result = await reqWorkConditionsQuery(obj);
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
