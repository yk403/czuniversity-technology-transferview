<template>
	<!--难题竞标-->
	<el-container direction='vertical'>
		<!--卡片-->
		<div id="Req_card">
			<el-row :gutter="20" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row; justify-content: flex-start;">
				<el-col :xs="4" :sm="4" :md="4" :lg="6" :xl="8" v-for="(iteam, index) in alldemand" :key="index">
					<div class="Req_project">
						<div class="Req_project_operation" @mouseenter="enter(index)" @mouseleave="leave()">
							<div class="Req_status" :class="{'colorDisplay1':iteam.buttonColor1,'colorDisplay2':iteam.buttonColor2,'colorDisplay3':iteam.buttonColor3,'colorDisplay4':iteam.buttonColor4}">
                				{{ iteam.fbshzt }}
							</div>
							<div class="Req_operation" v-if="seen && index == current">
								<img src="~@/assets/edit.png" alt="编辑" style="position: absolute; top:120px; left:33.33%; cursor:pointer;">
								<img src="~@/assets/delete.png" alt="删除" style="position: absolute; top:120px; right:33.33%; cursor:pointer;" @click="remove(iteam.id)">
							</div>
							<img class="Req_operation_img" :src="iteam.xqtp" style="width:100%; height: 190.43px; border-radius: 4px;">
						</div>
						<div class="Req_project_body">
							<div @click="ViewDetails(data)">
								<div class="Req_project_body_title">{{ iteam.xqmc }}</div>
								<div class="Req_project_body_field">技术领域：
									<span style="color: #000;">{{ iteam.lyName }}</span></div>
								<div class="Req_project_body_price">价格：
									<span style="color: #000;">{{ iteam.hzjg }}</span>
								</div>
								<div class="Req_project_body_cooperation">合作方式：
									<span style="color: #000;">{{ iteam.hzfs }}</span>
								</div>
								<div class="Req_project_body_introduce">需求介绍：
									<span style="color: #000;">{{ iteam.introduction }}</span>
								</div>
								<div class="Req_project_body_border"></div>
							</div>
							<div class="Req_project_body_operation">
								<div class="Req_project_body_button1" :class="{'Req_project_body_buttonable':iteam.buttonFirst1,'buttonDisabled':iteam.buttonSecond1}">进入大厅</div>
								<div class="Req_project_body_button2" :class="{'Req_project_body_buttonable':iteam.buttonFirst2,'buttonDisabled':iteam.buttonSecond2}">查看详情</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
                <div style="margin-bottom:10px;">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="searchProjects.pageNum"
                        :page-size="searchProjects.pageSize"
                        layout="prev, pager, next"
                        :total="searchProjects.total"
                    >
                    </el-pagination>
                </div>    
		</div>
	</el-container> 
</template>

<script>
	import * as xqapi from '@/http/modules/tJsXq.js'
  import * as Msg from '@/utils/Message'
	export default {
		data() {
			return {
        		alldemand:[],
                searchProjects:{
                    pageNum:1,
                    pageSize:8,
                    total:0
                },
				seen:false,
          		current:0,
				xqtp:''
			}
		},
		mounted() {
			this.load()
		},
		methods: {
            // 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
				this.searchProjects.pageSize = val
				this.load()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
				this.searchProjects.pageNum = val
				this.load()
			},
			//需求表单
			RequirementsForm(){
				const { href } =this.$router.resolve({path:'/RequirementsForm'})
				window.open(href,'_blank')
			},
			//查看需求详情
			ViewDetails(data){
				const { href } =this.$router.resolve({path:'/TechReqInformation', query: data})
            	window.open(href,'_blank')
			},
			//动态获取图片
			showImg(){
				this.xqtp = this.$router.query.xqtp
			},
			//需求数据
            load(){
                const that = this
                this.loading = true
                const param1 = {}
                xqapi.page(param1).then(res =>{
                    that.loading = false
                    if(res.data.errCode==0){
                        that.alldemand = res.data.data.list
                      that.alldemand.forEach(row => {
                        switch(row.fbshzt)
                        {
                          case 1:
                            row.buttonFirst1= false
                            row.buttonSecond1= true
                            row.buttonFirst2= true
                            row.buttonSecond2= false
                            row.fbshzt = "待审核"
                            row.buttonColor1= true
                            row.buttonColor2= false
                            row.buttonColor3= false
                            row.buttonColor4= false
                            break;
                          case 2:
                            row.buttonFirst1= true
                            row.buttonSecond1= false
                            row.buttonFirst2= true
                            row.buttonSecond2= false
                            row.fbshzt = "审核通过"
                            row.buttonColor1= false
                            row.buttonColor2= true
                            row.buttonColor3= false
                            row.buttonColor4= false
                            break;
                          case 3:
                            row.buttonFirst1= false
                            row.buttonSecond1= true
                            row.buttonFirst2= true
                            row.buttonSecond2= false
                            row.fbshzt = "整改"
                            row.buttonColor1= false
                            row.buttonColor2= false
                            row.buttonColor3= true
                            row.buttonColor4= false
                            break;
                          case 4:
                            row.buttonFirst1= false
                            row.buttonSecond1= true
                            row.buttonFirst2= true
                            row.buttonSecond2= false
                            row.fbshzt = "拒绝"
                            row.buttonColor1= false
                            row.buttonColor2= false
                            row.buttonColor3= false
                            row.buttonColor4= true
                            break;
                        }
                      })
                      console.log(that.alldemand);
                    }else{
                        Msg.error(res.data.msg)
                    }
                })

            },
			//鼠标移入移出
			enter(index){
				this.seen = true;
				this.current = index;
			},
			leave(){
				this.seen = false;
				this.current = null;
			},
			remove(id) {
				this.$confirm('确认删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					// console.log(id)
					xqapi.remove(id).then((res) => {
						const data = res.data
						switch (data.code) {
							case 0:
								Msg.success(data.msg)
								this.load()
								break
							case 500:
								Msg.error(data.msg)
								break
							default:
								break
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除',
					})
				})
			},
		},
	}
</script>

<style scoped>
	/*-----卡片样式-----*/
	.eq_card_text{
		padding:24px; 
		text-align: left; 
		margin-bottom: 24px; 
		background: #FFFFFF; 
		border: 1px solid #E7E7EE; 
		border-radius: 4px;
	}
	.Req_project_operation{
		position: relative;
	}
	.Req_status{
		position: absolute;
		top: 24px;
		left: 24px;
    color: #FFFFFF;
    width: 104px;
    height: 33px;
    border-radius: 4px;
    line-height: 33px;

	}
	.Req_operation{
		position: relative;
	}
	.Req_project:hover{
		cursor: pointer;
	}
	.Req_project_add_border{
		margin: 20px;
		border:1px dashed #CDCDCD;
		
	}
    .Req_project{
        background-color: white;
        border: 1px solid #fce7f6;
        margin-bottom: 32px;
    }
    .Req_project_body{
        padding: 24px;
		text-align: left;
		font-size: 16px;
    }
	.Req_project_body_title,.Req_project_body_field,.Req_project_body_price,.Req_project_body_introduce,.Req_project_body_cooperation{
		margin-bottom: 16px;
		color: #666;
		font-size: 16px;
	}
	.Req_project_body_title{
		color: #000;
		font-size: 24px;
	}
	.Req_project_body_title:hover{
		color: #BD8325;
	}
	.Req_project_body_border{
		width:100%; 
		height:1px; 
		background-color: #FCE7C6;
	}
	.Req_project_body_operation{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.Req_project_body_introduce{
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
	}
	.Req_project_body_button1{
		padding: 0 24px;
		margin-right: 10px;
	}
	/*.buttonDisabled:hover {
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
	}*/
	.buttonDisabled {
		width:100%;
		height:48px;
		background-color: #999999;
		color: white;
		border-radius: 4px;
		line-height: 48px;
		text-align: center;
		pointer-events: none;
	}
	.Req_project_body_button2{
		margin-left: 10px;
	}
	.Req_project_body_buttonable {
		width:100%; 
		height:48px; 
		background-color: #26292F; 
		color: white; 
		border-radius: 4px; 
		line-height: 48px; 
		text-align: center;
	}
	.Req_project_body_buttonable:hover {
		background-color: #BD8325;
		cursor: pointer;
	}
	.colorDisplay1 {
		background-color: #3F90F7;
	}
	.colorDisplay2 {
		background-color: #008000;
	}
	.colorDisplay3 {
		background-color: #ec5b56;
	}
	.colorDisplay4 {
		background-color: #F0AF41;
	}
</style>