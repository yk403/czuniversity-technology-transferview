<template>
    <el-dialog title="新增技术需求" :visible.sync="dialogvisible.show" width="500px">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属领域">
                <el-select v-model="form.region" placeholder="请选则" style="width:380">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预算">
                <el-input v-model="form.budget"></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="form.publisher"></el-input>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="所属地区">
                <el-input v-model="form.region"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogvisible.show = false">取 消</el-button>
            <el-button type="primary" @click="dialogvisible.show = false">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:["dialogvisible"],
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                budget:'',
                publisher:'',
                region:''
            }
        }
    },
}
</script>
<style>
    .el-select>.el-input{
        width: 380px;
    }
</style>