<template>
	<!--技术商品交易-->
	<el-container direction='vertical' style="background-color: #F7F6F6;">
		<!--search-->
		<div class="search_bg">
			<div class="search">
				<div class="search_operction">
					<el-select class="CgType" v-model="value1" placeholder="技术交易大厅">
						<el-option v-for="(items,index) in CgType" :key="index" :label="items.mc" :value="items.id" 
							@click.native="typeSearch(items)">{{ items.mc }}</el-option>
					</el-select>
					<el-select class="CgField" v-model="value2" placeholder="技术拍卖">
						<el-option v-for="(item,index) in CgField" :key="index" :label="item.mc" :value="item.id" 
							@click.native="fieldSearch(item)">{{ item.mc }}</el-option>
					</el-select>
					<el-select class="CgField" v-model="value2" placeholder="所有技术领域">
						<el-option v-for="(item,index) in CgField" :key="index" :label="item.mc" :value="item.id" 
							@click.native="fieldSearch(item)">{{ item.mc }}</el-option>
					</el-select>
					<!--搜索框-->
					<el-input class="CgSearch_form" clearable placeholder="请输入查询内容"  
						@keydown.enter.native="seachEnterFun" v-model="searchParam.cgmc">
							<el-button @click="search" slot="append" style="background-color:#BD8325;color:white;border:0;border-radius: 0;"  icon="el-icon-search"></el-button>    
					</el-input>
				</div>
			</div>
		</div>
		<!--卡片-->
		<div class="Ach_card">
			<div class="Ach_card_text">
				找到 <span :model="searchParam">
					<span style="color: #bd8325;">{{searchParam.total}}</span>
				</span> 个成果
			</div>
			<el-row :gutter="20" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row;justify-content: flex-start;">
				<el-col  :xs="6" :sm="6" :md="6" :lg="6" :xl="6" v-for="(item, index) in allprojects" :key="index">
					<div class="Ach_project">
						<img :src="item.cgtp" style="width:100%; height: 190.43px;">
						<div class="Ach_project_body">
							<div class="Ach_project_body_title">{{ item.cgmc }}</div>
							<div class="Ach_project_body_field">交易类型：
								<span style="color: #000;">{{ item.lyName }}</span>
							</div>
							<div class="Ach_project_body_field">技术领域：
								<span style="color: #000;">信息技术</span>
							</div>
							<div class="Ach_project_body_price">价格：
								<span style="color: #000;">{{ item.hzjg }}</span>
							</div>
							<div class="Ach_project_body_price">起止时间：
								<span style="color: #000;">2019-12-21~2020-6-12</span>
							</div>
							<div class="Ach_project_body_border"></div>
							<div class="Ach_project_body_button" @click="ViewDetails(item)">查看详情</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div style="display:flex; justify-content:flex-end;padding:0 60px 20px 0">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="searchParam.pageNum"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="searchParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="searchParam.total"
			>
			</el-pagination>
		</div>
	</el-container>
</template>

<script>
	import * as cgapi from '@/http/modules/tJsCg.js'
	import * as lbapi from '@/http/modules/tJsLb.js'
	import * as lyapi from '@/http/modules/tJsLy.js'
	import * as Msg from '@/utils/Message'
	export default {
		data() {
			return {
				value1: '',
				value2: '',
				input: '',
				CgType: [],
				CgField: [],
				allprojects: [],
				searchParam: {
					lbId:null,
					lyId: null,
					cgmc: null,
					dz: null,
					createTime: null,
					pageNum: 1,
					pageSize: 12,
					total: 0,
				},
				cgtp:''
			}
		},
		mounted() {
			this.lylist()
			this.lblist()
			this.list()
		},
		methods: {
			//查看需求详情
			ViewDetails(item){
				const { href } =this.$router.resolve({path:'/TechAchInformation' ,query: item});
            	window.open(href,'_blank');
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
				this.searchParam.pageSize = val
				this.list()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
				this.searchParam.pageNum = val
				this.list()
			},
			//成果数据
			list() {
				const that = this
				this.loading = true
				const param = this.searchParam
				cgapi.page(param).then(res => {
					if (res.data.errCode==0) {
						that.allprojects = res.data.data.list
                        that.searchParam.total=res.data.data.total
					} else {
						Msg.error(res.data.msg)
					}
				})
			},
			//领域
			lylist() {
				const that = this
				const param = {}
				lyapi.page(param).then((res) => {
					if (res.data.errCode==0) {
						that.CgField = res.data.data.list
					} else {
						Msg.error(res.data.msg)
					}
				})
			},
			//类别
			lblist() {
				const that = this
				const param1 = {}
				lbapi.page(param1).then((res) => {
					if (res.data.errCode==0) {
						that.CgType = res.data.data.list
					} else {
						Msg.error(res.data.msg)
					}
				})
			},
			//搜索框
			search() {
				this.list()
			},
			seachEnterFun(e) {
				var keyCode = window.event ? e.keyCode : e.which
				if (keyCode == 13) {
					this.search()
				}
			},
			//下拉框领域搜索
			fieldSearch(item){
				const fId = item.id
				if(fId === "0"){
					this.searchParam.lyId=''
				}else {
					this.searchParam.lyId=fId
				}
				this.list()
			},
			//类型搜索
			typeSearch(items){
				const tId = items.id
				if(tId==="1"){
					this.searchParam.lbId=''
				}else {
					this.searchParam.lyId=tId
				}
				this.list()
			},
			showImg(){
				this.cgtp = this.$router.query.cgtp
			}
		},
	}
</script>

<style>
	.search_bg{
		z-index: 10;
	}
	.search{
		margin: -60px 160px 0 160px;
		border-top: #BD8325 4px solid;
		background-color: white;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		padding: 48px 48px;
	}
	.search_operction{
		border: 1px solid #E7E7EE;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: flex-start;
	}
	.el-input__inner {
		border: 0;
		background-color: #F3F3F6;
		color: .000000;
	}
	.el-icon-search{
		background-color: #BD8325;
		width: 60px;
		margin-right: -5px;
		color: white;
	}
	.el-icon-search:hover{
		cursor: pointer;
	}
	/*-----卡片样式-----*/

	.Ach_card{
		padding: 24px 48px;
	}
	.Ach_card_text{
		height: 64px;
		padding: 0 24px; 
		font-size: 16px;
		color: #000;
		text-align: left; 
		line-height: 64px;
		margin-bottom: 24px; 
		background: #FFFFFF; 
		border: 1px solid #E7E7EE; 
	}
    .Ach_project{
        background-color: white;
    }
    .Ach_project_body{
        padding: 32px 24px;
		background-color: white;
		border: 1px solid #fce7f6;
		border-top: 0px;
        margin-bottom: 32px;
		text-align: left;
		font-size: 16px;
    }
	.Ach_project_body:hover{
		box-shadow: 0 4px 6px #ddd;
	}
	.Ach_project_body_title , .Ach_project_body_field , .Ach_project_body_price , .Ach_project_body_introduce{
		margin-bottom: 24px;
		font-size: 16px;
		color: #666;
	}
	.Ach_project_body_introduce{
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
	}
	.Ach_project_body_title{
		font-size: 24px;
		color: #000;
	}
	.Ach_project_body_title:hover{
		color: #BD8325;
		cursor: pointer;
	}
	.Ach_project_body_border{
		width:100%; 
		height:1px; 
		background-color: #FCE7C6;
		margin-bottom: 24px;
	}
	.Ach_project_body_button{
		width:100%; 
		height:48px; 
		background-color: #26292F; 
		color: white; 
		border-radius: 4px; 
		line-height: 48px; 
		text-align: center;
	}
	.Ach_project_body_button:hover{
		background-color: #BD8325;
		cursor: pointer;
	}
</style>
