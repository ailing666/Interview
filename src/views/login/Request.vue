<template>
  <div class="request">
    <!-- 
      :visible.sync:是否显示
      width:宽度
      show-close:是否显示关闭按钮
    -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
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

<style>
</style>