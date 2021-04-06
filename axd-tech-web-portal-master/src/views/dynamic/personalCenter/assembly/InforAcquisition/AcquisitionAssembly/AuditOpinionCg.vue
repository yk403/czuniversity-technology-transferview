<template>
    <el-dialog :close-on-click-modal="false" :title="formData.xqmc + '的审核意见' " top="30vh" :visible.sync="dialogVisible4.show"
    width="40%" center @close="closeClear()">
        <div style="padding: 20px;">
            <div style="display: flex; justify-content: flex-start; align-items: center;flex-wrap: nowrap;margin-bottom: 24px;">
                <img src="~@/assets/tips.png" alt="提示" style="margin-right: 20px;">
                <p style="font-size: 16px; color: #000;" label="审核意见">{{formData.fbshbz}}</p>
            </div>
            <div class="Req_operation_edit">
                <el-button class="Req_operation_edit_cancel" @click="cancel()">取消</el-button>
                <el-button class="Req_operation_edit_submit" type="warning" @click="makeSure()">确定</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
	import * as Cgapi from '@/http/modules/tJsCg.js'
    import * as Msg from '@/utils/Message'
    export default {
        props: ['dialogVisible4','formData'],
        data(){
            return{
                arr:[],
            }
        },
        mounted() {
            console.log(this.formData)
        },
      methods:{
        makeSure(){
            this.dialogVisible4.show = false;
        },
        closeClear() {
            this.formData.hangyeName = ''
        },
        //需求数据
        load(){
            const that = this
            this.loading = true
            const param = {}
            Cgapi.page(param).then(res =>{
                that.loading = false
                if(res.data.errCode==0){
                        that.arr = res.data.data.list;
                    }else{
                        Msg.error(res.data.msg)
                    }
                })
            },
            //取消
            cancel() {
                this.dialogVisible4.show = false
            }
        }
    }
</script>

<style scoped>
    /*操作按钮*/
    .Req_operation_edit{
        text-align: center;
        font-size: 16px;
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