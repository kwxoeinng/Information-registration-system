<template>
  <el-table :data="tableData" border style="width: 100%" height="600">
    <el-table-column
      type="index"
      :index="indexMethod"
      width="150"
      label="换班时间"
    >
    </el-table-column>
    <el-table-column prop="dayseven" label="星期天" width="150">
    </el-table-column>
    <el-table-column prop="dayone" label="星期一" width="150">
    </el-table-column>
    <el-table-column prop="daytwo" label="星期二" width="150">
    </el-table-column>
    <el-table-column prop="daythree" label="星期三" width="150">
    </el-table-column>
    <el-table-column prop="dayfour" label="星期四" width="150">
    </el-table-column>
    <el-table-column prop="dayfive" label="星期五" width="150">
    </el-table-column>
    <el-table-column prop="daysix" label="星期六" width="150">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          dayone: "小芬",
          daytwo: "小纯",
          daythree: "小钰",
          dayfour: "小芬",
          dayfive: "小熙",
          daysix: "小钰",
          dayseven: "小熙",
        },
        {
          dayone: "小纯",
          daytwo: "小芬",
          daythree: "小熙",
          dayfour: "小钰",
          dayfive: "小纯",
          daysix: "小钰",
          dayseven: "小熙",
        },
        {
          dayone: "小熙",
          daytwo: "小钰",
          daythree: "小芬",
          dayfour: "小纯",
          dayfive: "小钰",
          daysix: "小芬",
          dayseven: "小纯",
        },
        {
          dayone: "小钰",
          daytwo: "小熙",
          daythree: "小芬",
          dayfour: "小纯",
          dayfive: "小熙",
          daysix: "小芬",
          dayseven: "小纯",
        },
      ],
    };
  },
  methods: {
    indexMethod(index) {
      return index * 6 + "点";
    },
  },
};
</script>
