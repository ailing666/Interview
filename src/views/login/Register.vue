<template>
  <div class="request">
    <!-- 
      :visible.sync:是否显示
      width:宽度
      show-close:是否显示关闭按钮
    -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :show-close="false">
      <div slot="title" class="request-title">用户注册</div>
      <div class="request"></div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
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
}
</style>