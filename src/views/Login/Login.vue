<template>
  <div class="box">
    <!-- 选择登录方式 -->
    <!-- <div class="loginHeader">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="loginWay = true">密码登录</el-menu-item>
        <el-menu-item index="2" @click="loginWay = false"
          >手机登录</el-menu-item
        >
      </el-menu>
    </div> -->
    <el-form @submit.prevent="login">
      <!-- 密码登录 -->
      <div>
        <!-- 用户名 -->
        <el-form-item class="inputContainer">
          <el-input
            v-model="name"
            placeholder="请输入工号"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="inputContainer">
          <el-input
            placeholder="请输入密码"
            v-model="pwd"
            show-password
          ></el-input>
        </el-form-item>
        <div class="loginBtn">
          <el-button
            style="width:100%"
            type="primary"
            round
            size="medium"
            @click="login('/home')"
            >登录</el-button
          >
        </div>
      </div>
      <!-- 短信登录 -->
      <!-- <div v-show="!loginWay">
        <div class="inputContainer">
          <div class="loginPhone">
            <div class="phoneInput">
              <el-input
                type="tel"
                v-model="phone"
                placeholder="手机"
              ></el-input>
            </div>
            <el-link
              :disabled="!rightPhone"
              :underline="false"
              @click="getCode"
              >{{
                computeTime > 0 ? `还剩(${computeTime}s)` : `获取验证码`
              }}</el-link
            >
          </div>
        </div>
        <div class="inputContainer">
          <el-input
            style="float:left"
            v-model="code"
            placeholder="验证码"
          ></el-input>
        </div>
        <div class="loginBtn">
          <el-button
            style="width:100%;"
            type="primary"
            round
            @click="login('/home')"
            >登录</el-button
          >
        </div>
      </div> -->
    </el-form>
  </div>
</template>
<script>
import "./login.css";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api";
export default {
  data() {
    return {
      // loginWay: true, //登录方式
      name: "", //用户名
      pwd: "", //密码
      // cache: "",//图形验证码
      phone: "", //手机号
      code: "", //短信验证码
      computeTime: 0, //倒计时
    };
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  methods: {
    //异步登录
    async login(path) {
      let result;
      // 前端验证
      // if (this.loginWay) {
      //密码登录
      const { name, pwd } = this;
      if (!this.name) {
        this.$message.error("用户名不能为空，请检查");
        return;
      } else if (!this.pwd) {
        this.$message.error("密码不能为，请检查");
        return;
      }
      // 发送ajax请求密码登陆
      result = await reqPwdLogin({ name, pwd });
      // } else {
      //   //短信登录
      //   const { rightPhone, phone, code } = this;
      //   if (!this.rightPhone) {
      //     this.$message.error("手机号输入有误，请检查");
      //     return;
      //   } else if (!/^\d{6}$/.test(code)) {
      //     this.$message.error("验证码输入有误，请检查");
      //     return;
      //   }
      //   // 发送ajax请求短信登陆
      //   result = await reqSmsLogin(phone, code);
      // }
      // 停止计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      // 根据结果数据处理
      if (result.code === 0) {
        const user = result.data;
        // 将user保存到vuex的state
        this.$store.dispatch("recordUser", user);
        // 去首页
        this.$router.replace(path);
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
        const result = await reqSendCode(this.phone);
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
  },
};
</script>
