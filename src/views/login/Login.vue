<template>
  <div class="login">
    <div class="login-left">
      <div class="login-left-header">
        <img class="login-left-header-logo" src="@/assets/login-logo.png" alt />
        <h4 class="login-left-header-t1">黑马面面</h4>
        <div class="login-left-header-line"></div>
        <h5 class="login-left-header-t2">用户登录</h5>
      </div>
      <div class="login-left-body">
        <!-- 
        :model->绑定表单的值,form是个对象
        :rules->绑定表单的验证规则
        ref:父子组件传值
        prefix-icon:输入框头部图标
        show-password:是否显示密码
        prop:在需要验证的子项上绑定prop值,对应input的v-model值
        -->
        <el-form :model="form" :rules="rules" ref="form">
          <!-- 手机 -->
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16">
                <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
              </el-col>
              <el-col :span="8">
                <img class="login-left-body-code" @click="changeCode" :src="imgCodeUrl" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 用户协议 -->
          <el-form-item prop="isPass">
            <el-checkbox v-model="form.isPass">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-button class="login-left-body-button" type="primary" @click="submit">登录</el-button>
          <br />
          <br />
          <el-button class="login-left-body-button" type="primary" @click="changeDialogVisible">注册</el-button>
        </el-form>
        <Request ref="request"></Request>
      </div>
    </div>
    <div class="login-right">
      <img src="@/assets/login-right.png" alt />
    </div>
  </div>
</template>

<script>
import Request from "@/views/login/Request";
export default {
  components: { Request },
  data() {
    return {
      imgCodeUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "", //是	string	手机号
        password: "", //是	string	密码
        code: "",
        isPass: "" //是
      },
      rules: {
        phone: [
          { required: true, message: "必填项", trigger: "blue" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback(new Error("手机号格式不正确"));
              }
            }
          }
        ],
        password: [
          { required: true, message: "必填项", trigger: "blue" },
          { min: 6, max: 12, message: "密码长度6-12", trigger: "change" }
        ],
        code: [
          { required: true, message: "必填项", trigger: "blue" },
          { min: 4, max: 4, message: "请输入4位图形码", trigger: "change" }
        ],
        isPass: [
          {
            validator: (rule, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback(new Error("请勾选用户协议哦"));
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.succes("成功啦");
        } else {
          this.$message.error("错误的!");
        }
      });
    },
    // 点击图片切换验证码
    changeCode() {
      this.imgCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    changeDialogVisible() {
      this.$refs.request.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .login-left {
    width: 478px;
    height: 550px;
    padding: 50px;
    background: #f5f5f5;
    .login-left-header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .login-left-header-logo {
        width: 22px;
        height: 17px;
        margin-right: 15px;
      }
      .login-left-header-t1 {
        font-size: 24px;
        font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }

      .login-left-header-line {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
        margin: 0 12px;
      }

      .login-left-header-t2 {
        font-size: 22px;
        font-family: PingFangSC Regular, PingFangSC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
    }
    .login-left-body {
      .login-left-body-code {
        width: 100%;
        height: 40px;
      }
      .login-left-body-button {
        width: 100%;
      }
    }
  }
}
</style>