<template>
  <el-table :data="tableData" border style="width: 100%" height="600">
    <el-table-column
      type="index"
      :index="indexMethod"
      width="150"
      label="换班时间"
    >
    </el-table-column>
    <el-table-column prop="daySeven" label="星期天" width="150">
    </el-table-column>
    <el-table-column prop="dayOne" label="星期一" width="150">
    </el-table-column>
    <el-table-column prop="dayTwo" label="星期二" width="150">
    </el-table-column>
    <el-table-column prop="dayThree" label="星期三" width="150">
    </el-table-column>
    <el-table-column prop="dayFour" label="星期四" width="150">
    </el-table-column>
    <el-table-column prop="dayFive" label="星期五" width="150">
    </el-table-column>
    <el-table-column prop="daySix" label="星期六" width="150">
    </el-table-column>
  </el-table>
</template>

<script>
import { reqQueryArrange } from "../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.arrangeQuery();
  },
  methods: {
    indexMethod(index) {
      return index * 6 + "点";
    },
    async arrangeQuery() {
      let result;
      const obj = {
        daySeven: this.daySeven,
        dayOne: this.dayOne,
        dayTwo: this.dayTwo,
        dayThree: this.dayThree,
        dayFour: this.dayFour,
        dayFive: this.dayFive,
        daySix: this.daySix,
      };
      result = await reqQueryArrange(obj);
      if (result) {
        this.tableData = result;
      } else {
        this.tableData = [];
      }
    },
  },
};
</script>
