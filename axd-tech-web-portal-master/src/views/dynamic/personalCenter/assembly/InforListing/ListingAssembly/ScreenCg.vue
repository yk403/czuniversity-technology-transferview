<template>
	<!--技术商品交易-->
	<el-container direction='vertical'>
		<!--卡片-->
		<div id="Ach_card">
			<el-row :gutter="20" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row; justify-content: flex-start;">
				<el-col  :xs="4" :sm="4" :md="4" :lg="6" :xl="8" v-for="(item, index) in allprojects" :key="index">
					<div class="Ach_project">
						<!--图片操作-->
						<div class="Ach_project_operation" @mouseenter="enter(index)" @mouseleave="leave()">
							<div class="Ach_status" :class="{'colorDisplay1':item.buttonColor1,'colorDisplay2':item.buttonColor2,'colorDisplay3':item.buttonColor3,'colorDisplay4':item.buttonColor4}">
                				{{ item.fbshzt }}
							</div>
							<div class="Ach_operation" v-if="seen && index == current">
								<img src="~@/assets/edit.png" alt="编辑" style="position: absolute; top:120px; left:33.33%; cursor:pointer;">
								<img src="~@/assets/delete.png" alt="删除" style="position: absolute; top:120px; right:33.33%; cursor:pointer;" @click="remove(item.id)">
							</div>
							<img class="Ach_operation_img" :src="item.cgtp" style="width:100%; height: 190.43px; border-radius: 4px;">
						</div>
						<div class="Ach_project_body">
							<div @click="ViewDetails(item)">
								<div class="Ach_project_body_title">{{ item.cgmc }}</div>
								<div class="Ach_project_body_field">技术领域：
									<span style="color: #000;">{{ item.lyName }}</span>
								</div>
								<div class="Ach_project_body_price">价格：
									<span style="color: #000;">{{ item.hzjg }}</span>
								</div>
								<div class="Ach_project_body_cooperation">合作方式：
									<span style="color: #000;">{{ item.hzfs }}</span>
								</div>
								<div class="Ach_project_body_introduce">成果介绍：
									<span style="color: #000;">{{ item.cgjs }}</span>
								</div>
								<div class="Ach_project_body_border"></div>
							</div>	
							<div class="Ach_project_body_operation">
								<div class="Ach_project_body_button1" :class="{'Req_project_body_buttonable':item.buttonFirst1,'buttonDisabled':item.buttonSecond1}">进入大厅</div>
								<div class="Ach_project_body_button2" :class="{'Req_project_body_buttonable':item.buttonFirst2,'buttonDisabled':item.buttonSecond2}">审核意见</div>
							</div>			
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</el-container>
</template>

<script>
	import * as cgapi from '@/http/modules/tJsCg.js'
    import * as Msg from '@/utils/Message'
	export default {
		data() {
			return {
        		allprojects:[],
				seen:false,
          		current:0,
				cgtp:''
			}
		},
		mounted() {
			this.list()
		},
		methods: {
			//新增成果
			showCgTable(){
				const { href } =this.$router.resolve({path:'/AchievementsRelease'})
				window.open(href,'_blank')
			},
			//查看需求详情
			ViewDetails(item){
				const { href } =this.$router.resolve({path:'/TechAchInformation',query: item})
            	window.open(href,'_blank')
			},
			//成果数据
			list() {
				const that = this
				this.loading = true
				const param = {}
				cgapi.page(param).then(res => {
					if (res.data.errCode==0) {
						that.allprojects = res.data.data.list
						that.allprojects.forEach(row => {
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
									row.buttonFirst1= false
									row.buttonSecond1= true
									row.buttonFirst2= false
									row.buttonSecond2= true
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
					} else {
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
					cgapi.remove(id).then((res) => {
						const data = res.data
						switch (data.code) {
							case 0:
								Msg.success(data.msg)
								this.list()
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
			showImg(){
				this.cgtp = this.$router.query.cgtp;
			}
		},
	}
</script>

<style scoped>
	/*-----卡片样式-----*/
	.Ach_card_text{
		padding:24px; 
		text-align: left; 
		margin-bottom: 24px; 
		background: #FFFFFF; 
		border: 1px solid #E7E7EE; 
		border-radius: 4px;
	}
	.Ach_project_operation{
		position: relative;
	}
	.Ach_status{
		position: absolute;
		top: 24px;
		left: 24px;
		color: #FFFFFF;
		width: 104px;
		height: 33px;
		border-radius: 4px;
		line-height: 33px;
	}
	.Ach_operation{
		position: relative;
	}
	.Ach_project:hover{
		cursor: pointer;
	}
	.Ach_project_add_border{
		margin: 20px;
		border:1px dashed #CDCDCD;
		
	}
    .Ach_project{
        background-color: white;
        
    }
    .Ach_project_body{
        padding: 24px;
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
	.Ach_project_body_title,.Ach_project_body_field,.Ach_project_body_price,.Ach_project_body_introduce,.Ach_project_body_cooperation{
		margin-bottom: 16px;
		color: #666;
		font-size: 16px;
	}
	.Ach_project_body_title{
		color: #000;
		font-size: 24px;
	}
	.Ach_project_body_title:hover{
		color: #BD8325;
	}
    .Ach_project_body_introduce{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
	.Ach_project_body_border{
		width:100%; 
		height:1px; 
		background-color: #FCE7C6;
	}
	.Ach_project_body_operation{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.Ach_project_body_button1{
		padding: 0 24px;
		margin-right: 10px;
	}
	.Ach_project_body_button2{
		margin-left: 10px;
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
	.Req_project_body_buttonable{
		width:100%; 
		height:48px; 
		background-color: #26292F; 
		color: white; 
		border-radius: 4px; 
		line-height: 48px; 
		text-align: center;
	}
	.Req_project_body_buttonable:hover{
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