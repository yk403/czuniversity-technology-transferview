<template>
    <!--审核弹出框-->
          <el-dialog title="审核" :visible.sync="AuditAchievements.show" width="500px">
            <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="id" v-if="show">
                <el-input v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formData.fbwtgsm"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="reject">驳 回</el-button>
            <el-button type="primary" @click="adopt">通 过</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as cgapi from '@/http/modules/tJsCg.js'
import * as Msg from '@/utils/Message'
export default {
    name:'AuditAchievements',
    props:['AuditAchievements','dialoginfo','formData'],
    data() {
        return {
            show:false,
              form: {
                  id: '',
                  xqmc: '',
                  lyId: '',
                  hzjg: '',
                  contracts:'',
                  dz:''
              },
              form2:{
                  id:'',
                  fbwtgsm:''//备注
              }
        }
    },
    methods:{
        //通过
        adopt(){
            console.log(this.formData)
            const that = this
            cgapi.pass(that.formData.id).then(res =>{
                if(res.data.errCode==0){
                    // Msg.success(res.data.Msg)
                    that.$parent.closeDialog()
                }else{
                    Msg.error(res.data.msg);
                }
            })
        },
        //驳回
        reject(){
            const that = this
            this.form2.id = this.formData.id
            this.form2.fbwtgsm = this.formData.fbwtgsm
            cgapi.disPass(this.form2).then(res =>{
                if(res.data.errCode==0){
                    // Msg.success(res.data.Msg)
                    that.$parent.closeDialog()
                }else{
                    Msg.error(res.data.msg);
                }
                   
            })
        }
    }
}
</script>

<style>

</style>