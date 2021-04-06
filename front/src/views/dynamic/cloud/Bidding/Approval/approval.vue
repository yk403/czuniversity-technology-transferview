<template>
	<div class="label_body">
		<!-- 下拉框 -->
		<div class="label_body_head">
			<div style="display:flex;">
				<div>
                    <el-input
                        placeholder="请输你想输入的关键字"
                        suffix-icon="el-icon-search"
                        v-model="searchForm.mc"
                        @keydown.enter.native="seachEnterFun"
                    >
                    </el-input>
				</div>
				<div style="padding-left:20px;">
					<el-select
						v-model="searchForm.lyId"
						placeholder="请选择技术领域"
					>
						<el-option
							v-for="(item, index) in lylists"
							:key="index"
							:label="item.mc"
							:value="item.id"
							@click.native="typeClick()"
						>
						</el-option>
					</el-select>
				</div>
				<div style="padding-left:20px;">
					<el-select
						v-model="searchForm.lbId"
						placeholder="请选择类别"
					>
						<el-option
							v-for="(item, index) in lblists"
							:key="index"
							:label="item.mc"
							:value="item.id"
							@click.native="typeClick()"
						>
						</el-option>
					</el-select>
				</div>
                <div class="label_body_search">
                    <el-button style="margin-left:20px;" type="warning" @click="reset()"
                        >重置</el-button
                    >
                </div>
			</div>

		</div>
		<!-- 搜索数目 -->
		<div class="search_num">
			<img
				style="width:18px;height:18px;margin-left:20px;"
				src="~@/assets/remind.png"
				alt=""
			/>
			<div style="margin-left:10px;">
				已为您筛选<span style="color:#BD8325;">{{
					searchForm.total
				}}</span
				>条数据
			</div>
		</div>
		<!-- 表格 -->
		<div style="margin:0 20px;">
			<el-table
				:data="tableData"
				style="width: 100%;"
				height="558"
				@selection-change="tableSelected"
			>
				<el-table-column type="selection"></el-table-column>
				<el-table-column
					type="index"
					label="序号"
					:index="indexMethod"
				></el-table-column>
				<el-table-column
					v-if="show1"
					prop="id"
					label="条目id"
				></el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column
					prop="lyname"
					label="所属领域"
				></el-table-column>
				<el-table-column
					prop="contracts"
					label="发布方"
				></el-table-column>
				<el-table-column
					prop="lxrdh"
					label="联系方式"
				></el-table-column>
                <el-table-column
					prop="agreement"
					label="协议管理"
				></el-table-column>
				<el-table-column
					v-if="show1"
					prop="fbwtgsm"
					label="备注"
				></el-table-column>
				<el-table-column prop="fbshzt" label="当前状态">
					<template slot-scope="scope">
						<span v-if="scope.row.fbshzt == 1" style="color:red"
							>待审批</span
						>
						<span v-if="scope.row.fbshzt == 2" style="color:green"
							>审核通过</span
						>
						<span v-if="scope.row.fbshzt == 3" style="color:yellow"
							>整改</span
						>
						<span v-if="scope.row.fbshzt == 4" style="color:orange"
							>拒绝</span
						>
					</template>
				</el-table-column>
				<el-table-column prop="cjsj" label="发布时间"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="audit(scope.index, scope.row)"
							style="width:24px;height:24px;"   
						>
							<img
								style="width:16px;height:16px;"
								src="~@/assets/examine.png"
								alt=""
							/>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin:10px 0;">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="searchForm.pageNum"
					:page-size="searchForm.pageSize"
					:total="searchForm.total"
					layout="prev, pager, next"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
import * as xqapi from '@/http/modules/tJsXq.js'
import * as Msg from '@/utils/Message'
export default {
	props: ['type1'],
	data() {
		return {
			options: '',
			input2: '',
			value1: '全部',
			value: '',
			show1: false,
            dialogVisible1:{
                show:false
            },
            dialogVisible2:{
                show:false
            },
			tableData: [],
			lylists: [],
			lblists: [],
			searchForm: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				lyId: '',
				lbId: '',
				mc: '',
				xqmc: '',
				cgmc: '',
                type:0
			},
            // 添加
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
                cgmc:'',
                cgjs:'',
                yxq: '',
                gjz: '',
                introduction:'',
                fbshbz:'',
                hzjg: '',
                lyId: '',
                lbId: '',
                hzfs: '',
                yxhzdw: '',
                yxhzzj: '',
                introduction: '',
                xqtp:'',
                cgtp:''
            },
			searchTab: {
				pageNum: 1,
				pageSize: 100,
				total: 0,
			},
			//1 查需求 0 查成果
			searchFlag: [
				{ id: 0, mc: '技术成果' },
				{ id: 1, mc: '技术需求' },
			],
			typeSelect: 0,
		}
	},
	mounted() {
		this.searchForm.fbshzt = 1
		this.xqlist()
		this.lylist()
		this.lblist()
	},
	methods: {
		seachEnterFun(e) {
			var keyCode = window.event ? e.keyCode : e.which
			if (keyCode == 13) {
				this.typeClick()
			}
		},
		typeClick(data) {
			this.xqlist(data)
		},
		// 需求数据
		xqlist(data) {
			const that = this
			if (typeof data === 'undefined') {
			} else {
				this.searchForm.fbshzt = data
			}
			this.searchForm.xqmc = this.searchForm.mc
			const param = this.searchForm
			xqapi.page(param).then((res) => {
				that.tableData = res.data.data.list
				that.tableData.forEach((row) => {
					row.name = row.xqmc
					row.address = row.dz
				})
				that.searchForm.total = res.data.data.total
			})
		},
		// 领域
		lylist() {
			const that = this
			const param = this.searchTab
			lyapi.page(param).then((res) => {
				if (res.data.errCode == 0) {
					// console.log(res.data.data.records)
					that.lylists = res.data.data.list
				}
			})
		},
		// 类别
		lblist() {
			const that = this
			const param = this.searchTab
			lbapi.page(param).then((res) => {
				if (res.data.errCode == 0) {
					// console.log(res.data.data.records)
					that.lblists = res.data.data.list
				}
			})
		},
		reset() {
			this.searchForm = {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				lyId: '',
				lbId: '',
				mc: '',
				xqmc: '',
				cgmc: '',
                type:0
			}
            this.searchForm.fbshzt = this.$parent.$parent.$parent.type1
			this.typeClick()
		},
        audit(index,row){
            if (this.typeSelect == 0){
                this.dialogVisible2.show=true
                this.form={
                    ...row
                }
                this.$refs.ExamineCg.checklist[0]= Number(this.form.lyId)
				this.$refs.ExamineCg.checklist2[0]= Number(this.form.lbId)
				this.$refs.ExamineCg.checklist3[0]= this.form.hzfs
				this.$refs.ExamineCg.checklist4[0]= this.form.yxhzdw
				this.$refs.ExamineCg.checklist5[0]= this.form.yxhzzj
				this.$refs.ExamineCg.initImage(this.form.cgtp)
            }else if (this.typeSelect == 1){
                this.dialogVisible1.show = true
                this.form ={
                    ...row
            }
				this.$refs.ExamineXq.checklist[0]= Number(this.form.lyId)
				this.$refs.ExamineXq.checklist2[0]= Number(this.form.lbId)
				this.$refs.ExamineXq.checklist3[0]= this.form.hzfs
				this.$refs.ExamineXq.checklist4[0]= this.form.yxhzdw
				this.$refs.ExamineXq.checklist5[0]= this.form.yxhzzj
				this.$refs.ExamineXq.initImage(this.form.xqtp)
				console.log(this.form)
            }

        },
		//表格序号
		indexMethod(index) {
			return (
				(this.searchForm.pageNum - 1) * this.searchForm.pageSize +
				index + 1
			)
		},
		// 分页
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.searchForm.pageSize = val
			this.cglist()
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.searchForm.pageNum = val
			this.cglist()
		},
		//获取选中的id
		tableSelected(val) {
			this.ids = []
			for (let selectedItem of val) {
				this.ids.push(selectedItem.id)
			}
		},
	},
}
</script>
<style>
.label_body {
	overflow: auto;
	background-color: #ffffff;
	margin-top: 20px;
}
.label_body .label_body_head {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #000000;
	margin: 20px;
}
.el-select {
	width: 162px;
	background: #ffffff;
	border-radius: 4px;
}
.el-input__inner {
	height: 36px;
}
.label_body .label_body_search {
	display: flex;
}
.label_body_search .el-input__inner {
	height: 36px;
}
.label_body_search .el-button {
	width: 72px;
	height: 36px;
	border: 1px solid #d4d2d2;
	border-radius: 4px;
}
.search_num {
	height: 54px;
	line-height: 54px;
	background: rgba(189, 131, 37, 0.1);
	border: 1px solid #bd8325;
	opacity: 0.3;
	border-radius: 4px;
	margin: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.el-button--mini,
.el-button--mini.is-round {
	padding: 0;
}
.screen {
	display: flex;
	justify-content: space-between;
	margin: 0 20px;
}
.screen .screen_add {
	margin-top: 20px;
}
.screen .screen_search {
	width: 600px;
	margin: 20px 0 0 20px;
	display: flex;
	justify-content: space-around;
}
.search_num {
	height: 54px;
	line-height: 54px;
	background: rgba(189, 131, 37, 0.1);
	border: 1px solid #bd8325;
	opacity: 0.3;
	border-radius: 4px;
	margin: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
