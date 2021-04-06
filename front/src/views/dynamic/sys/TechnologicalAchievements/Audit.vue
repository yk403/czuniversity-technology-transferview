<template>
    <!-- 审核弹出框 -->
          <el-dialog title="审核" :visible.sync="AuditShow.show" width="500px">
            <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="id" v-if="show">
                <el-input v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" :rows="4" v-model="formData.fbshbz"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="audit(3)">驳 回</el-button>
            <el-button type="primary" @click="audit(2)">通 过</el-button>
            <el-button type="danger" @click="audit(4)">拒 绝</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as api from '@/http/modules/tJsCg.js'
import * as Msg from '@/utils/Message'
export default {
    name:'Audit',
    props:['AuditShow','formData'],
    data() {
        return {
            show:false,
              form: {
                  id: '',
                  cgmc: '',
                  lyId: '',
                  hzjg: '',
                  contracts:'',
                  dz:''
              },
              form2:{
                  id:'',
                  fbshbz:'',//备注
                  fbshzt: ''
              }
        }
    },
    methods:{
        //通过
        // adopt(){
        //     console.log(this.formData)
        //     const that = this
        //     api.pass(that.formData.id).then(res =>{
        //         if(res.data.code==0){
        //              Msg.success(res.data.msg)
        //           that.cancel()
        //         }else{
        //             Msg.error(res.data.msg);
        //         }
        //     })
        // },
        //驳回
        audit(data){
            const that = this
            this.form2.id = this.formData.id
            this.form2.fbshbz = this.formData.fbshbz
            this.form2.fbshzt = data
            api.auditCg(this.form2).then(res =>{
                if(res.data.errCode==0){
                     Msg.success(res.data.errMsg);
                    that.cancel();
                }else{
                    Msg.error(res.data.errMsg);
                }
                   
            })
        },
      cancel() {
        this.$refs['form'].resetFields()
        this.AuditShow.show = false
        this.$parent.list()
      },
    }
}
</script>

<style>
.el-dialog__body{
    padding: 0 20px;
}
</style>