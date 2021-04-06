<template>
  <!--编辑需求信息-->
  <el-dialog :close-on-click-modal="false" title="申请发布" top="30vh" :visible.sync="dialogVisible3.show"
      width="40%" center @close="closeClear()">
    <el-form :model="formData" ref="ruleForm" label-width="100px" label-position='right' style="padding: 0 40px;margin: 24px 0;">
        <span >您正在进行成果发布，确认要发起成果发布申请吗？</span>
    </el-form>
    <div class="Req_operation_edit">
      <el-button class="Req_operation_edit_cancel" @click="cancel()">取消</el-button>
      <el-button class="Req_operation_edit_submit" type="warning" @click="makeSure()">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as Msg from '@/utils/Message'
import * as api from '@/http/modules/tJsCg.js'

export default {
  props: ['dialogVisible3','formData'],
  data() {
    return {
      form:{
        id: 0,
        fbshzt: 1
      }
      }
    },
  mounted() {
    console.log(this.formData);
  },
  methods: {
    closeClear() {
      this.formData.hangyeName = ''
    },
    save(data) {
      var that = this;
      that.form.id = data.id;
      if(data.fbshzt === "待提交") {
        that.form.fbshzt = 1
      }else{
        Msg.error("状态有误，不能申请");
        return false;
      }
      api.auditCg(that.form).then(res => {
        const data = res.data
        switch (data.errCode) {
          case 0:
            Msg.success(data.errMsg);
            that.$parent.$parent.load();
            this.cancel();
            break
          case 500:
            Msg.error(data.errMsg);
            break
          default:
            break
        }
      })
    },
    makeSure() {
          this.save(this.formData)
    },
    cancel() {
      this.dialogVisible3.show = false
    }

  }
}
</script>

<style scoped>

/*操作按钮*/
.Req_operation_edit{
  padding: 16px 0 32px 0;
  text-align: center;
  font-size: 16px;
  /* right: 50%; */
}
.Req_operation_edit_cancel{
  padding: 14px 40px;
  margin-right: 10px;
}
.Req_operation_edit_submit{
  padding: 14px 40px;
  background-color: #bd8325;
  color: white;
}
</style>
