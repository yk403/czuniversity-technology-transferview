<template>
    <!-- 拍卖大厅 -->
    <div id="auction_body">
        <!--表格信息-->
        <div id="table_data">
            <h1>样例数据</h1>
            <el-table :data="tableData" style="width: 100%" height="520">
                <el-table-column fixed prop="number" label="序号"  width="60"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="field" label="所属领域"></el-table-column>
                <el-table-column prop="maturity" label="成熟度"></el-table-column>
                <el-table-column prop="price" label="起始价"></el-table-column>
                <el-table-column prop="mode" label="合作方式"></el-table-column>
                <el-table-column prop="contacts" label="联系人"></el-table-column>
                <el-table-column prop="numb" label="联系方式"></el-table-column>
                <el-table-column prop="states" label="当前状态"></el-table-column>
            </el-table>
            <span id="table_data_infor">
                <img src="~@/assets/achievement_pic1.png">
                <p>公司名称，地址，联系人，联系方式，简介等等</p>
            </span>
        </div>
        <!--信息操作-->
        <div style="width: 32%;">
            <!--叫价-->
            <div id="bidding">
                <h1>当前叫价</h1>
                <p>￥20,000 元</p>
                <span>追价</span>
                <div id="bidding_img">
                    <img src="~@/assets/numberOfCalls.png" style=" width: 88%;">
                </div>
                <el-form ref="form" :model="form" id="bidding_operation">
                    <el-input v-model="form.name" placeholder="请输入您的价格"></el-input>
                    <span id="bidding_operation_button">
                        <span>加价幅度：￥10，000 元/每次</span>
                        <el-button type="primary" @click="onSubmit">叫价</el-button>
                    </span>
                </el-form>
            </div>
            <!--出价记录-->
            <div id="record_form">
                <div id="record_forms">
                    <h1>出价记录</h1>
                    <div >
                        <el-button style="padding:0;" icon="el-icon-edit-outline"></el-button>
                        <el-button style="padding:0;" icon="el-icon-edit-outline"></el-button>
                    </div>
                </div>
                
                <el-table :data="recordForm" height="362">
                    <el-table-column fixed prop="number" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="拍品名称"></el-table-column>
                    <el-table-column prop="bidder" label="竞价方"></el-table-column>
                    <el-table-column prop="price" label="出价" width="60"></el-table-column>
                    <el-table-column prop="time" label="出价时间"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData: [
                    {
                    number: '01',
                    name: '转轮发动机',
                    field: '信息技术',
                    maturity: '专利',
                    price: '13 万',
                    mode: '技术转让',
                    contacts: '张某某',
                    numb: '13535354582',
                    states: '拍卖中'
                    }
                ],
                recordForm:[
                    {
                    number: '01',
                    name: '转轮发动机',
                    bidder: '信息技术',
                    price: '13万',
                    time: '2021-02-13'
                    }
                ],
                form: {
                    name: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    #auction_body{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: nowrap;
    }
    #table_data, #bidding, #record_form{
        padding:20px;  
        background-color: white; 
        border-radius: 8px; 
        color:black;
    }
    #table_data{
        width: 64%; 
        margin-right: 20px; 
    }
    #table_data > h1{
        text-align: left; 
        font-size: 16px; 
        margin-bottom:10px; 
    }
    #table_data_infor > img{
        width: 24%; 
        border-radius: 4px;
        margin: 20px 20px 0 0; 
        float:left;
    
    }
    #table_data_infor > p{
        float:left; 
        margin-top:20px; 
        font-size: 14px; 
    }
    #bidding{
        position: relative; 
        margin-bottom: 20px; 
        text-align: left; 
    }
    #bidding > h1{
        display: block; 
        font-size: 16px; 
        margin-bottom:20px; 
    }
    #bidding > p{
        display : inline;
        font-size: 40px; 
        margin-right: 20px; 
    }
    #bidding > span{
        font-size: 14px; 
        color: #409eff; 
        text-decoration: underline; 
    }
    #bidding_img{
        position: absolute; 
        top: -7px; 
        right: 48px; 
        z-index: 6; 
    }
    #bidding_operation{
        margin-top: 32px; 
    }
    #bidding_operation_button{
        margin-top:20px; 
        display:flex; 
        flex-wrap: nowrap; 
        justify-content: space-between;
    }
     #record_forms{
         display: flex;
        flex-wrap: nowrap; 
        justify-content: space-between;
     }
    #record_forms > h1 {
        width: 40%;
        font-size: 16px; 
        text-align: left; 
        margin-bottom:20px;
    }
    
</style>