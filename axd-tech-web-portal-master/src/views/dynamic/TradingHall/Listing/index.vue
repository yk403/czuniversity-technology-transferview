<template>
	<!-- 挂牌大厅 -->
	<div id="Listing_body">
		<!--表格信息-->
		<div id="table_data">
			<h1>样例数据</h1>
			<el-table :data="tableData" style="width: 100%" height="520">
				<el-table-column
					fixed
					prop="number"
					label="序号"
					width="60"
				></el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column
					prop="field"
					label="所属领域"
				></el-table-column>
				<el-table-column
					prop="maturity"
					label="成熟度"
				></el-table-column>
				<el-table-column prop="price" label="起始价"></el-table-column>
				<el-table-column prop="mode" label="合作方式"></el-table-column>
				<el-table-column
					prop="contacts"
					label="联系人"
				></el-table-column>
				<el-table-column prop="numb" label="联系方式"></el-table-column>
				<el-table-column
					prop="states"
					label="当前状态"
				></el-table-column>
			</el-table>
			<span id="table_data_infor">
				<img src="~@/assets/achievement_pic1.png" />
				<p>公司名称，地址，联系人，联系方式，简介等等</p>
			</span>
		</div>
		<!--信息操作-->
		<div style="width: 32%;">
			<!--叫价-->
			<div id="bidding">
				<h1>摘牌记录</h1>
				<el-table :data="tableData1" style="width: 100%" height="266">
					<el-table-column
						fixed
						type="index"
						:index="indexMethod"
						label="序号"
						width="60"
					></el-table-column>
					<el-table-column
						prop="bidder"
						label="竞价方"
					></el-table-column>
					<el-table-column
						prop="numb"
						label="联系方式"
					></el-table-column>
                        
					<el-table-column
						prop="qualifications"
						label="相关资质"
					>
                        <el-button type="text" @click="dialogVisible.show = true">相关资质</el-button>
                    </el-table-column>
					<el-table-column
						prop="time"
						label="出价时间"
					></el-table-column>
				</el-table>
			</div>
			<!--出价记录-->
			<div id="record_form">
				<h1>洽谈室</h1>
				<div style="width:100%;height:280px;border:1px solid #ccc;border-radius: 4px;">
                    <div style="width:100%;height:210px;overflow:auto"></div>
                    <div style="margin:10px 20px 0 20px;">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                        <el-button type="primary">发送</el-button>
                    </div>
                </div>
			</div>
		</div>
        <Qualifications 
            :dialogVisible="dialogVisible"
        />
	</div>
</template>

<script>
import Qualifications from '@/views/dynamic/TradingHall/Listing/qualifications.vue'
export default {
    components:{
        Qualifications
    },
	data() {
		return {
            dialogVisible:{
                show:false
            },
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
					states: '挂牌中',
				},
			],
			tableData1: [
				{
					bidder: '张某某',
                    numb:'135**582',
                    time:'2021:2:13'
				},
			],
			form: {
				name: '',
			},
            input:''
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!')
		},
		indexMethod(index) {
			return index + 1
		},
	},
}
</script>

<style scoped>
#Listing_body {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: nowrap;
}
#table_data,
#bidding,
#record_form {
	padding: 20px;
	background-color: white;
	border-radius: 8px;
	color: black;
}
#table_data {
	width: 64%;
	margin-right: 20px;
    
}
#table_data > h1 {
	text-align: left;
	font-size: 16px;
	margin-bottom: 10px;
}
#table_data_infor > img {
	width: 24%;
	border-radius: 4px;
	margin: 20px 20px 0 0;
	float: left;
}
#table_data_infor > p {
	float: left;
	margin-top: 20px;
	font-size: 14px;
}
#bidding {
	position: relative;
	margin-bottom: 20px;
	text-align: left;
}
#bidding > h1 {
	display: block;
	font-size: 16px;
	margin-bottom: 20px;
}
#bidding > p {
	display: inline;
	font-size: 40px;
	margin-right: 20px;
}
#bidding > span {
	font-size: 14px;
	color: #409eff;
	text-decoration: underline;
}
#bidding_img {
	position: absolute;
	top: -7px;
	right: 48px;
	z-index: 6;
}
#bidding_operation {
	margin-top: 32px;
}
#bidding_operation_button {
	margin-top: 20px;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
}
#record_form > h1 {
	font-size: 16px;
	text-align: left;
	margin-bottom: 20px;
}
.el-input{
    width: 80%;
}
</style>
