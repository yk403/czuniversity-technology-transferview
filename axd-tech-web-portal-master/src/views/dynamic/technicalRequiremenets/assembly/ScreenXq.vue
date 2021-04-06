<template>
	<!--技术资源需求-->
	<el-container direction='vertical' style="background-color: #F7F6F6;">
		<!--search-->
		<div class="search_bg">
			<div class="search">
				<div class="search_operction">
				<el-select class="XqType" v-model="value1" placeholder="技术类型">
					<el-option v-for="(items,index) in XqType" :key="index" :label="items.mc" :value="items.class" 
						@click.native="typeSearch(items)">{{ items.mc }}</el-option>
				</el-select>
				<el-select class="XqField" v-model="value2" placeholder="技术领域">
					<el-option v-for="(item,index) in XqField" :key="index" :label="item.mc" :value="item.class" 
						@click.native="fieldSearch(item)">{{ item.mc }}</el-option>
				</el-select>
				<!--搜索框-->
				<el-input class="XqSearch_form" clearable placeholder="请输入查询内容"  
					@keydown.enter.native="seachEnterFun" v-model="searchParam.xqmc">
                    <el-button @click="search" slot="append" style="background-color:#BD8325;color:white;border:0;border-radius: 0;"  icon="el-icon-search"></el-button>
                </el-input>
				</div>
			</div>
		</div>
		<!--卡片-->
		<div class="Req_card">
			<div class="Req_card_text">
				找到 <span :model="search">
					<span style="color: #bd8325;">{{searchParam.total}}</span>
				</span> 个需求
			</div>
			<el-row :gutter="20" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row;justify-content: flex-start;">
				<el-col  :xs="6" :sm="6" :md="6" :lg="6" :xl="6" v-for="(iteam, index) in alldemand" :key="index">
					<div class="Req_project">
						<img :src="iteam.xqtp" style="width:100%; height: 190.43px;">
						<div class="Req_project_body">
							<div class="Req_project_body_title">{{ iteam.xqmc }}</div>
							<div class="Req_project_body_field">技术领域：
								<span style="color: #000000;">{{ iteam.lyName }}</span>
							</div>
							<div class="Req_project_body_price">价格：
								<span style="color: #000000;">{{ iteam.hzjg }}</span>
							</div>
							<div class="Req_project_body_introduce">需求介绍：
								<span style="color: #000000;">{{ iteam.introduction }}</span>
							</div>
							<div class="Req_project_body_border"></div>
							<div class="Req_project_body_button" @click="ViewDetails(iteam)">查看详情</div>
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
				:page-sizes="[10, 20, 30, 40]"
				:page-size="searchParam.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="searchParam.total"
			>
			</el-pagination>
		</div>
	</el-container>
</template>

<script>
	import * as xqapi from '@/http/modules/tJsXq.js'
	import * as lbapi from '@/http/modules/tJsLb.js'
	import * as lyapi from '@/http/modules/tJsLy.js'
  import * as Msg from '@/utils/Message'
	export default {
		data() {
			return {
				XqType: [],
				XqField: [],
				value1: '',
				value2: '',
				input: '',
				searchParam: {
					lbclass:null,
					lyclass: null,
					xqmc: null,
					dz: null,
					createTime: null,
					pageNum: 1,
					pageSize: 10,
					total: 0,
				},
                alldemand:[],
				xqtp:''
			}
		},
		mounted() {
			this.lblist(), 
			this.lylist(),
			this.load()
		},
		methods: {
			//查看需求详情
			ViewDetails(data){
				console.log(data);
				const { href } =this.$router.resolve({path:'/TechReqInformation',query: data});
            	window.open(href,'_blank');
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
				this.searchParam.pageSize=val
				this.load()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
				this.searchParam.pageNum=val
				this.load()
			},
			//需求数据
            load(){
                const that = this
                this.loading = true
                const param1 = this.searchParam
                xqapi.page(param1).then(res =>{
                    that.loading = false
                    if(res.data.errCode==0){
                        that.alldemand = res.data.data.list
                        this.searchParam.total=res.data.data.total
                    }else{
                        Msg.error(res.data.msg)
                    }
                })
            },
			// 类别
			lblist() {
				const that = this
				const param = {}
				lbapi.page(param).then((res) => {
					this.loading = false
					if (res.data.errCode==0) {
						that.XqType = res.data.data.list
						// console.log(res.data.data.records)
					}
				})
			},
			// 领域
			lylist() {
				const that = this
				const param = {}
				lyapi.page(param).then((res) => {
					this.loading = false
					if (res.data.errCode==0) {
						// console.log(res.data.data.records)
						that.XqField = res.data.data.list
					}
				})
			},
            //搜索框
			search() {
				this.load()
			},
			seachEnterFun(e) {
				var keyCode = window.event ? e.keyCode : e.which
				if (keyCode == 13) {
					this.search()
				}
			},
			//下拉框领域搜索
			fieldSearch(item) {
				const fclass = item.class
                console.log(fclass,111);
				if (fclass === '0') {
					this.searchParam.lyclass = ''
				} else {
					this.searchParam.lyclass = fclass
				}
				this.load()
			},
			//类型搜索
			typeSearch(items) {
				const tclass = items.class
				if (tclass === '1') {
					this.searchParam.lbclass = ''
				} else {
					this.searchParam.lyclass = tclass
				}
				this.load()
			},
			//动态图片获取
			showImg(){
				this.xqtp = this.$router.query.xqtp;
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
		border-top: #BD8325 4px solclass;
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
        border-radius: 0;
		background-color: #F3F3F6;
		color: #000000;
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

	.Req_card{
		padding: 24px 48px;
	}
	.Req_card_text{
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
    .Req_project{
        background-color: white;
    }
    .Req_project_body{
        padding: 24px;
		background-color: white;
		border: 1px solid #fce7f6;
		border-top: 0px;
        margin-bottom: 32px;
		text-align: left;
		font-size: 16px;
    }
	.Req_project_body:hover{
		box-shadow: 0 4px 6px #ddd;
	}
	.Req_project_body_title , .Req_project_body_field , .Req_project_body_price , .Req_project_body_introduce{
		margin-bottom: 24px;
		font-size: 16px;
		color: #666;
	}
	.Req_project_body_introduce{
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
	}
	.Req_project_body_title{
		font-size: 24px;
		color: #000;
	}
	.Req_project_body_title:hover{
		color: #BD8325;
		cursor: pointer;
	}
	.Req_project_body_border{
		width:100%; 
		height:1px; 
		background-color: #FCE7C6;
		margin-bottom: 24px;
	}
	.Req_project_body_button{
		width:100%; 
		height:48px; 
		background-color: #26292F; 
		color: white; 
		border-radius: 4px; 
		line-height: 48px; 
		text-align: center;
	}
	.Req_project_body_button:hover{
		background-color: #BD8325;
		cursor: pointer;
	}
</style>