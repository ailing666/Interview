<template>
  <div class="request">
    <!-- 
      :visible.sync:是否显示
      width:宽度
      show-close:是否显示关闭按钮
    -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :show-close="false">
      <div slot="title" class="request-title">用户注册</div>
      <div class="request">
        <el-form :model="form" label-width="80px" ref="form" :rules="rules">
          <!-- 
            label:标题
            action:接口地址
            show-file-list:是否展示文件列表
            on-success:上传成功的回调函数
            before-upload:上传前的回调函数
          -->
          <!-- 头像 -->
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              :action="avatarUrl"
              name="image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 昵称 -->
          <el-form-item label="昵称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <!-- 图形码 -->
          <el-form-item label="图形码" prop="imgCode">
            <el-row>
              <el-col :span="15">
                <el-input v-model="form.imgCode"></el-input>
              </el-col>
              <el-col :span="8" :offset="1">
                <img :src="CodeImg" @click="changeCodeImg" class="register-code-img" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="验证码" prop="rcode">
            <el-row>
              <el-col :span="15">
                <el-input v-model="form.rcode"></el-input>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-button class="register-btn_code" @click="sendCode" :disabled="time != 30">
                  获取短信验证码
                  <span v-if="time !== 30">({{time}})秒</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCode, userRegister } from "@/api/login.js";
export default {
  data() {
    return {
      // 对话框是否显示
      dialogVisible: false,
      // 接口地址
      avatarUrl: process.env.VUE_APP_URL + "/uploads",
      // 头像地址
      imageUrl: "",
      // 图形验证码地址
      CodeImg: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 倒计时时间
      time: 30,
      form: {
        username: "", //	是	string	用户名
        phone: "", //	是	string	手机号
        email: "", //	是	string	邮箱
        avatar: "", //	是	string	头像地址
        password: "", //	是	string	密码
        imgCode: "",
        rcode: "" //	是
      },
      rules: {
        username: [{ required: true, message: "必填项", trigger: "blur" }],
        phone: [
          { required: true, message: "必填项", trigger: "blur" },
          { mix: 11, max: 11, message: "请输入11位手机号", trigger: "change" },
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
        email: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback(new Error("邮箱格式不正确"));
              }
            }
          }
        ],
        avatar: [{ required: true, message: "必填项", trigger: "blur" }],
        password: [
          { required: true, message: "必填项", trigger: "blur" },
          { mix: 6, max: 12, message: "密码长度6-12", trigger: "change" }
        ],
        imgCode: [
          { required: true, message: "必填项", trigger: "blur" },
          { mix: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "必填项", trigger: "blur" },
          { mix: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = process.env.VUE_APP_URL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField(["avatar"]);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeCodeImg() {
      this.CodeImg =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    submit() {
      this.$refs.form.validate(result => {
        if (result) {
          userRegister(this.form).then(res => {
            window.console.log(res);
          });
          this.$message.success("提交成功");
          this.dialogVisible = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    sendCode() {
      let num = 0;
      // 由于接口参数是手机号和图形码,所以在获取短信时局部校验手机号和图形码,只有两个都填写后才调用接口,提升性能
      this.$refs.form.validateField(["imgCode", "phone"], errorMessage => {
        if (errorMessage == "") {
          num++;
        }
      });
      if (num == 2) {
        this.time--;
        let timer = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            clearInterval(timer);
            this.time = 30;
          }
        }, 1000);
        getCode({ code: this.form.imgCode, phone: this.form.phone }).then(
          res => {
            if (res.code == 200) {
              this.$message.success(res.data.captcha + "");
            } else {
              this.$message.error("错误");
            }
          }
        );
      }
    }
  }
};
</script>

<style lang="less">
.request {
  .el-dialog__header {
    padding: 0;
  }
  .request-title {
    height: 54px;
    line-height: 54px;
    background: linear-gradient(225deg, #1493fa, #01c6fa);
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: center;
    color: #fefefe;
    letter-spacing: 0px;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .register-code-img {
    width: 143px;
    height: 41px;
  }
  .register-btn_code {
    width: 139px;
    height: 39px;
  }
}
</style>