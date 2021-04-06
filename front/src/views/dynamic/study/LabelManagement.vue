<template>
    <div class="label_body">
        <div class="screen">
            <span class="screen_search">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
            </span>
            <span class="time_select">
                <el-date-picker v-model="value1" type="datetimerange"
                start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
            </span>
            <el-row class="btn">
                <el-button type="primary" round @click="showImport">导入</el-button>
                <el-button type="primary" round @click="showNew">新增</el-button>
            </el-row>
        </div>
        <el-table :data="tableData" style="width: 100%;" height="490">
                <el-table-column prop="number" label="序号"></el-table-column>
                <el-table-column prop="category" label="类别"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="name_num" label="名称编号"></el-table-column>
                <el-table-column prop="time" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button class="edit" size="mini">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <span class="paging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-sizes="[50, 100, 150, 200, 250]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </span>
        <New :dialogvisible="dialogvisible"/>
        <Import :ImportShow="ImportShow"/>
    </div>
</template>

<script>
/*import New from '@/components/ImportNew/New.vue'
import Import from '@/components/ImportNew/Import.vue'*/
    export default{
        data(){
            return{
                value1: '',
                input2: '',
                dialogvisible: {
                    show:false,
                },
                ImportShow:{
                    show:false,
                },
                form:{

                },
                tableData: [{
                    number: '01',
                    category: '所属领域',
                    name: '电子信息技术',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                }, {
                    number: '02',
                    category: '所属领域',
                    name: '生物与新医药技术',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                }, {
                   number: '03',
                    category: '所属领域',
                    name: '航空航天技术',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                }, {
                    number: '04',
                    category: '所属领域',
                    name: '新材料技术',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                },{
                    number: '05',
                    category: '所属领域',
                    name: '新能源及节能技术',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                },{
                    number: '06',
                    category: '所属领域',
                    name: '现代农业与食品产业',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                },{
                    number: '07',
                    category: '所属领域',
                    name: '现代农业与食品产业',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                },{
                    number: '08',
                    category: '所属领域',
                    name: '现代农业与食品产业',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                },{
                    number: '09',
                    category: '所属领域',
                    name: '现代农业与食品产业',
                    name_num:'0Xb356478',
                    time:'2021-02-13 14:00:20'
                }]
            }
        }, 
/*        components:{
            New,
            Import
        },*/
        methods:{
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 删除
            handleDelete() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            showNew(){
                this.dialogvisible.show=true
            },
            showImport(){
                this.ImportShow.show=true
            }
        }
    }
</script>
<style scope>
    .label_body{
        overflow: auto;
    }
    .screen{
        overflow: auto;
        margin-bottom: 10px;
    }
    .screen_search{
        width: 360px; float: left; margin-right: 20px;
    }
    .time_select{
        float:left;
    }
    .btn{
        float: right;
    }
    .edit{
        color:rgb(49, 144, 225);
        border:1px solid rgb(49, 144, 225);
    }
    .paging{
        float: right;
        margin-top: 20px;
    }

</style>