<template>
	<!--信息发布：技术需求-->
	<el-container direction='vertical'>
		<!--卡片-->
		<div id="Req_card">
			<el-row :gutter="20" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row; justify-content: flex-start;">
				<!---->
				<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" v-for="(iteam, index) in alldemand" :key="index">
					<div class="Req_project">
						<div class="Req_project_operation" @mouseenter="enter(index)" @mouseleave="leave()">
							<div class="Req_status" :class="{'colorDisplay0':iteam.buttonColor0,'colorDisplay1':iteam.buttonColor1,'colorDisplay2':iteam.buttonColor2,'colorDisplay3':iteam.buttonColor3,'colorDisplay4':iteam.buttonColor4}">
                				{{ iteam.assistanceStatus }}
							</div>
							<div class="Req_operation" v-if="seen && index == current">
								<img src="~@/assets/edit.png" v-if="iteam.assistanceStatus == '整改'|| iteam.assistanceStatus == '待提交'" alt="编辑" style="position: absolute; top:120px; left:33.33%; cursor:pointer;" @click="showEdit(iteam)">
								<img src="~@/assets/delete.png" v-if="iteam.assistanceStatus == '整改' || iteam.assistanceStatus == '拒绝' || iteam.assistanceStatus == '待提交'" alt="删除" style="position: absolute; top:120px; right:33.33%; cursor:pointer;" @click="remove(iteam.id)">
							</div>
							<img class="Req_operation_img" :src="iteam.xqtp" style="width:100%; height: 190.43px; border-radius: 4px;">
						</div>
						<div class="Req_project_body">
							<div @click="ViewDetails(iteam)">
								<div class="Req_project_body_title">{{ iteam.xqmc }}</div>
								<div class="Req_project_body_field">技术领域：
									<span style="color: #000;">{{ iteam.lyName }}</span>
								</div>
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
								<div class="Req_project_body_button1" 
									:class="{'Req_project_body_button':iteam.buttonAble1,'Req_project_body_buttonDisable':iteam.buttonDisable1}" 
									@click="ApplyBidding(iteam)">招标申请</div>
								<div class="Req_project_body_button2" 
									:class="{'Req_project_body_button':iteam.buttonAble2,'Req_project_body_buttonDisable':iteam.buttonDisable2}"
									@click="showAuditOpinion(iteam)">审核意见</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
      <!--编辑弹窗-->
      <AddEditXq ref="AddEditXq" :dialog-visible1="dialogVisible1" :form-data="form"/>
			<!--审核意见-->
			<AuditOpinionXq ref="AuditOpinionXq" :dialog-visible="dialogVisible" :form-data="form"/>
		</div>
	</el-container>
</template>

<script>
	import * as xqapi from '@/http/modules/tJsXq.js'
  import AddEditXq from './AddEditXq'
  	import * as Msg from '@/utils/Message'
	import AuditOpinionXq from './AuditOpinionXq.vue'
	export default {
		components:{
			AuditOpinionXq,
      AddEditXq
		},
		data() {
			return {
        		alldemand:[],
				seen:false,
          		current:0,
				xqtp:'',
        dialogVisible1: {
          show: false
        },
				form: {
					dwmc: '',
					zzjgdm: '',
					contracts: '',
					fr: '',
					lxrdh: '',
					zj: '',
					dzyx: '',
					dz: '',
					xqmc: '',
					yxq: '',
					gjz: '',
					hzjg: '',
					lyId: '',
					lbId: '',
					hzfs: '',
					yxhzdw: '',
					yxhzzj: '',
					introduction: '',
					xqtp:'',
					fbshbz:'',
          remarks:''
				},
				dialogVisible:{
					show:false
				},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			//需求表单
			RequirementsForm(){
				const { href } =this.$router.resolve({path:'/RequirementsForm'})
				window.open(href,'_blank')
			},
			//查看需求详情
			ViewDetails(data){
				const { href } =this.$router.resolve({path:'/TechReqInformation',query: data});
            	window.open(href,'_blank');
			},
			//动态获取图片
			showImg(){
				this.xqtp = this.$router.query.xqtp
			},
			//需求数据
            load(){
                const that = this
                this.loading = true
                const param1 = {type: 1}
                xqapi.page(param1).then(res =>{
                    that.loading = false
                    if(res.data.errCode==0){
                        that.alldemand = res.data.data.list
                      that.alldemand.forEach(row => {
                        switch(row.assistanceStatus)
                        {
                          	case 0:
								row.buttonAble1= true
								row.buttonDisable1= false
								row.buttonAble2= false
								row.buttonDisable2= true
								row.assistanceStatus = "待提交"
								row.buttonColor0= true
								row.buttonColor1= false
								row.buttonColor2= false
								row.buttonColor3= false
								row.buttonColor4= false
                        	break;
							case 1:
								row.assistanceStatus = "待审核"
								row.buttonAble1= false
								row.buttonDisable1= true
								row.buttonAble2= false
								row.buttonDisable2= true
								row.buttonColor1= true
								row.buttonColor2= false
								row.buttonColor3= false
								row.buttonColor4= false
								break;
							case 2:
								row.assistanceStatus = "审核通过"
								row.buttonAble1= false
								row.buttonDisable1= true
								row.buttonAble2= false
								row.buttonDisable2= true
								row.buttonColor1= false
								row.buttonColor2= true
								row.buttonColor3= false
								row.buttonColor4= false
								break;
							case 3:
								row.assistanceStatus = "整改"
								row.buttonAble1= false
								row.buttonDisable1= true
								row.buttonAble2= true
								row.buttonDisable2= false
								row.buttonColor1= false
								row.buttonColor2= false
								row.buttonColor3= true
								row.buttonColor4= false
								break;
							case 4:
								row.assistanceStatus = "拒绝"
								row.buttonAble1= false
								row.buttonDisable1= true
								row.buttonAble2= true
								row.buttonDisable2= false
								row.buttonColor1= false
								row.buttonColor2= false
								row.buttonColor3= false
								row.buttonColor4= true
								break;
							default:
								row.buttonAble1= true
								row.buttonDisable1= false
								row.buttonAble2= false
								row.buttonDisable2= true
								row.assistanceStatus = "待提交"
								row.buttonColor0= true
								row.buttonColor1= false
								row.buttonColor2= false
								row.buttonColor3= false
								row.buttonColor4= false
                        }
                    })
                      console.log(that.alldemand);
                    }else{
                        Msg.error(res.data.msg)
                    }
                })

            },
			//鼠标移入
			enter(index){
				this.seen = true;
				this.current = index;
			},
			//移出
			leave(){
				this.seen = false;
				this.current = null;
			},
			//招标申请
			ApplyBidding(data){
				const { href } =this.$router.resolve({path:'/ApplyBidding',query: data})
            	window.open(href,'_blank')
			},
			//审核意见
			showAuditOpinion(iteam){
				this.dialogVisible.show = true
				this.form = {
					...iteam
				}
			},
      // 编辑弹窗
      showEdit(iteam) {
        this.dialogVisible1.show = true
        this.form = {
          ...iteam
        }
        this.$refs.AddEditXq.checklist[0]= Number(this.form.lyId)
        this.$refs.AddEditXq.checklist2[0]= Number(this.form.lbId)
        this.$refs.AddEditXq.checklist3[0]= this.form.hzfs
        this.$refs.AddEditXq.checklist4[0]= this.form.yxhzdw
        this.$refs.AddEditXq.checklist5[0]= this.form.yxhzzj
        this.$refs.AddEditXq.initImage(this.form.xqtp)
        console.log(this.form)
        // console.log(this.form)
      },
      // 删除
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
		cursor: pointer;
	}
	.Req_project_body_introduce{
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
	.Req_project_body_button1{
		padding: 0 24px;
		margin-right: 10px;
	}
	.Req_project_body_button2{
		margin-left: 10px;
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
	.Req_project_body_buttonDisable{
		width:100%;
		height:48px;
		background-color: #999999;
		color: white;
		border-radius: 4px;
		line-height: 48px;
		text-align: center;
		pointer-events: none;
	}
	/*.Req_project_body_buttonDisable:hover {
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
	}*/
  .colorDisplay0 {
    background-color: 	#BA55D3;
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