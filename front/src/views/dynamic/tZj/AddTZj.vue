<template>
    <div>
        <el-dialog v-el-drag-dialog center :close-on-click-modal="false" :title="type===1?'新增':'编辑'" :visible.sync="dialogVisible.show">
            <el-form ref="form" :rules="formRules" :model="formData" label-width="100px">
                    <el-form-item label="" prop="id">
                        <el-input v-model="formData.id" />
                    </el-form-item>
                    <el-form-item label="" prop="xm">
                        <el-input v-model="formData.xm" />
                    </el-form-item>
                    <el-form-item label="" prop="sfz">
                        <el-input v-model="formData.sfz" />
                    </el-form-item>
                    <el-form-item label="" prop="xb">
                        <el-input v-model="formData.xb" />
                    </el-form-item>
                    <el-form-item label="" prop="sr">
                        <el-input v-model="formData.sr" />
                    </el-form-item>
                    <el-form-item label="" prop="mz">
                        <el-input v-model="formData.mz" />
                    </el-form-item>
                    <el-form-item label="" prop="dp">
                        <el-input v-model="formData.dp" />
                    </el-form-item>
                    <el-form-item label="" prop="xl">
                        <el-input v-model="formData.xl" />
                    </el-form-item>
                    <el-form-item label="" prop="zyjszw">
                        <el-input v-model="formData.zyjszw" />
                    </el-form-item>
                    <el-form-item label="" prop="dw">
                        <el-input v-model="formData.dw" />
                    </el-form-item>
                    <el-form-item label="" prop="dz">
                        <el-input v-model="formData.dz" />
                    </el-form-item>
                    <el-form-item label="" prop="dh">
                        <el-input v-model="formData.dh" />
                    </el-form-item>
                    <el-form-item label="" prop="zjh">
                        <el-input v-model="formData.zjh" />
                    </el-form-item>
                    <el-form-item label="" prop="sshy">
                        <el-input v-model="formData.sshy" />
                    </el-form-item>
                    <el-form-item label="" prop="csxk">
                        <el-input v-model="formData.csxk" />
                    </el-form-item>
                    <el-form-item label="" prop="zcfx">
                        <el-input v-model="formData.zcfx" />
                    </el-form-item>
                    <el-form-item label="" prop="yjcg">
                        <el-input v-model="formData.yjcg" />
                    </el-form-item>
                    <el-form-item label="" prop="dzyj">
                        <el-input v-model="formData.dzyj" />
                    </el-form-item>
                    <el-form-item label="" prop="yjly">
                        <el-input v-model="formData.yjly" />
                    </el-form-item>
                    <el-form-item label="" prop="zscq">
                        <el-input v-model="formData.zscq" />
                    </el-form-item>
                    <el-form-item label="" prop="zjxm">
                        <el-input v-model="formData.zjxm" />
                    </el-form-item>
                    <el-form-item label="" prop="lw">
                        <el-input v-model="formData.lw" />
                    </el-form-item>
                    <el-form-item label="" prop="zlh">
                        <el-input v-model="formData.zlh" />
                    </el-form-item>
                    <el-form-item label="" prop="bz">
                        <el-input v-model="formData.bz" />
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button type="danger" @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '@/http/modules/tZj.js'
import * as Msg from '@/utils/Message'
export default {
    name: 'AddTZj',
    props: ['dialogVisible', 'type', 'formData'],
    data() {
        return {
                tZjForm: {
                id: null,
                xm: null,
                sfz: null,
                xb: null,
                sr: null,
                mz: null,
                dp: null,
                xl: null,
                zyjszw: null,
                dw: null,
                dz: null,
                dh: null,
                zjh: null,
                sshy: null,
                csxk: null,
                zcfx: null,
                yjcg: null,
                dzyj: null,
                yjly: null,
                zscq: null,
                zjxm: null,
                lw: null,
                zlh: null,
                bz: null,
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                }
            }
        },
    created() {
    },
    mounted() {
    },
    methods: {
        onSubmit() {
            const that = this
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (that.type === 1) {
                    // 保存
                    api.save(that.formData).then(res => {
                         if (res.data.code === 0) {
                            Msg.success(res.data.msg)
                            that.$parent.closeDialog()
                         } else {
                            Msg.error(res.data.msg)
                         }
                    }).catch(err => {
                        console.log(err)
                         Msg.error('服务器错误，请联系管理员')
                     })
                    } else {
                     // 编辑
                        api.update(that.formData).then(res => {
                            if (res.data.code === 0) {
                            Msg.success(res.data.msg)
                            that.$parent.closeDialog()
                        } else {
                             Msg.error(res.data.msg)
                        }
                     }).catch(err => {
                        console.log(err)
                        Msg.error('服务器错误，请联系管理员')
                 })
                 }
              }
            })
        },
        restForm() {
            if (this.$refs['form']) {
                this.$refs['form'].resetFields()
            }
        },
        cancel() {
            this.$refs['form'].resetFields()
            this.$parent.closeDialog()
        }
    }
}
</script>

<style scoped>

</style>
