<template>
  <div>
    <!-- 头部 -->
    <div class="clientHeader">
      <p class="headerText">来访人员登记预约</p>
      <div>
        <el-button
          type="primary"
          icon="el-icon-thumb"
          circle
          style="position: relative;top:30px;left:30px;"
          @click="drawer = true"
        ></el-button>
      </div>
    </div>
    <!-- 轮播图 -->
    <div>
      <!-- <el-carousel
        style="height:400px;width:900px;margin:0 auto;"
        height="400px"
        direction="vertical"
        :autoplay="false"
      >
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <el-image :src="item.idView"></el-image>
        </el-carousel-item>
      </el-carousel> -->
      <el-carousel
        :interval="4000"
        type="card"
        height="300px"
        style="height:331px;width:1150px;margin:0 auto;"
      >
        <el-carousel-item v-for="item in imagesbox" :key="item.id">
          <el-image :src="item.idView"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 公告 -->
    <div class="clientBox">
      <!-- 公告 -->
      <div class="clientAnnouncement">
        <div style="width:100px;height:40px;font-size:24px;">
          近期公告
        </div>
        <el-collapse accordion>
          <el-collapse-item
            v-for="(item, index) in clientData"
            :key="item.releaseTitle"
            :title="item.releaseTitle"
            :name="index"
          >
            <div class="clientTitle" prop="releaseTitle">
              {{ item.releaseTitle }}
            </div>
            <div class="clientDate" prop="releaseTime">
              {{ item.releaseTime }}
            </div>
            <div class="clientContent">
              <div class="contentText" prop="releaseContent">
                {{ item.releaseContent }}
              </div>
              <div class="clientIssuer" prop="releaseIssuer">
                {{ item.releaseIssuer }}
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 预约抽屉 -->
    <el-drawer title="来访预约" :visible.sync="drawer" :with-header="false">
      <!-- 预约 -->
      <div class="orderBox">
        <div class="orderText">预约申请</div>
        <!-- 表单 -->
        <el-form :model="add" ref="add" label-width="80px">
          <el-form-item label="身份证">
            <el-input v-model="add.orderIdCard"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="add.orderName"></el-input>
          </el-form-item>
          <el-form-item label="来访原因">
            <el-input v-model="add.orderReason"></el-input>
          </el-form-item>
          <el-form-item label="来访日期">
            <el-input v-model="add.orderArrive"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <div class="loginPhone">
              <div class="phoneInput">
                <el-input type="tel" v-model="add.orderPhone"></el-input>
              </div>
              <el-link
                :disabled="!rightPhone || codeBtnshow"
                :underline="false"
                @click="getCode"
                >{{
                  computeTime > 0 ? `还剩(${computeTime}s)` : `获取验证码`
                }}</el-link
              >
            </div>
          </el-form-item>
        </el-form>
        <!-- 验证码 -->
        <el-input
          style="float:left;width:230px;margin-left:80px;"
          v-model="code"
          placeholder="请输入验证码"
        ></el-input>
        <!-- 按钮 -->
        <div class="clientBox">
          <el-button
            style="position: absolute;right:270px;margin-top:70px"
            type="primary"
            round
            @click="checkCode()"
            :disabled="phoneBtnshow"
            >手机验证</el-button
          >
          <el-button
            style="position: absolute;right:150px;margin-top:70px"
            type="primary"
            round
            @click="orderConfirm('add')"
            :disabled="orderBtnshow"
            >预约</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import "./orderclient.css";
import {
  reqQueryAnnouncement,
  reqAddOrder,
  reqSmsLogin,
  reqSendCode,
} from "../../api";
export default {
  data() {
    return {
      clientData: [],
      code: "",
      computeTime: 0, //倒计时
      add: {
        orderIdCard: "",
        orderName: "",
        orderReason: "",
        orderArrive: "",
        orderPhone: "",
      },
      orderBtnshow: true,
      phoneBtnshow: false,
      codeBtnshow: false,
      drawer: false,
      imagesbox: [
        { id: 0, idView: require("../../assets/images/one.jpg") },
        { id: 1, idView: require("../../assets/images/two.jpg") },
        { id: 2, idView: require("../../assets/images/three.jpg") },
      ],
    };
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.add.orderPhone);
    },
  },
  created() {
    this.query();
  },
  methods: {
    async query() {
      let result;
      const obj = {
        releaseTitle: this.releaseTitle,
        releaseTime: this.releaseTime,
        releaseContent: this.releaseContent,
        releaseIssuer: this.releaseIssuer,
      };
      result = await reqQueryAnnouncement(obj);
      if (result) {
        this.clientData = result;
      } else {
        this.clientData = [];
      }
    },
    async checkCode() {
      let result;
      const rightPhone = this.rightPhone;
      const code = this.code;
      const phone = this.add.orderPhone;
      if (!this.rightPhone) {
        this.$message.error("手机号输入有误，请检查");
        return;
      } else if (!/^\d{6}$/.test(code)) {
        this.$message.error("验证码输入有误，请检查");
        return;
      }
      result = await reqSmsLogin(phone, code);
      // 停止计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      // 根据结果数据处理
      if (result.code === 0) {
        this.orderBtnshow = false;
        this.phoneBtnshow = true;
        this.codeBtnshow = true;
        this.$message({
          message: "手机验证成功，请提交预约",
          type: "success",
        });
      } else {
        // 显示警告提示
        const msg = result.msg;
        this.$message.error(msg);
      }
    },
    // 异步获取短信验证码
    async getCode() {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 60;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            // 停止计时
            clearInterval(this.intervalId);
          }
        }, 1000);
        // 发送ajax请求(向指定手机号发送验证码短信)
        const result = await reqSendCode(this.add.orderPhone);
        if (result.code === 1) {
          // 显示提示
          this.$message.error(result.msg);
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },
    async orderConfirm(formName) {
      let result;
      let obj = {};
      let formData = new FormData();
      for (var key in this.add) {
        let status = this.add[key];
        if (status) {
          switch (key) {
            case "orderIdCard":
              obj.orderIdCard = status;
              break;
            case "orderName":
              obj.orderName = status;
              break;
            case "orderReason":
              obj.orderReason = status;
              break;
            case "orderArrive":
              obj.orderArrive = status;
              break;
            default:
              obj.orderPhone = status;
              break;
          }
        }
      }
      result = await reqAddOrder(obj);
      if (result) {
        this.$message({
          message: "预约成功",
          type: "success",
        });
        // 成功后，触发重新查询下数据
        this.query();
        this.add = {};
        this.code = "";
        this.orderBtnshow = true;
        this.phoneBtnshow = false;
        this.drawer = false;
      } else {
        this.$message({
          message: result.errorMsg,
          type: "warning",
        });
      }
    },
  },
};
</script>
