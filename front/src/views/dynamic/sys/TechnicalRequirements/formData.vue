<template>
	<!-- 技术需求 -->
	<div class="label_body">
		<!-- 新增导入 -->
		<div class="screen">
			<div class="screen_add">
				<el-button
					type="primary"
					icon="el-icon-plus"
					style="background: #BD8325;border-radius: 4px;border: transparent;"
					@click="addXq()"
					>新增</el-button
				>
			</div>
			<el-row class="screen_search">
				<el-input
					placeholder="请输入内容"
                    clearable
					suffix-icon="el-icon-search"
					v-model="searchForm.xqmc"
					@keydown.enter.native="seachEnterFun"
					style="width:412px;margin-right:20px;"
				></el-input>
				<el-button
					enctype="multipart/form-data"
					type="primary"
					style="background: #BD8325;border-radius: 4px;border: transparent;"
					@click="dialogFormVisible = true"
				>
					<span>
						<img
							style="width:10px;height:15px;"
							src="~@/assets/download.png"
							alt=""
						/>
					</span>
					导入</el-button
				>
				<el-button
					type="primary"
					style="background: #FFFFFF;border-radius: 4px;color:#333333;border: 1px solid #D4D2D2;"
                    @click="distribution"
					>统一下发</el-button
				>
			</el-row>
		</div>
		<!-- 搜索数目 -->
		<div class="search_num">
			<img
				style="width:18px;height:18px;margin-left:20px;"
				src="~@/assets/remind.png"
				alt=""
			/>
			<div style="margin-left:10px;">
				已为您筛选<span style="color:#BD8325;">{{searchForm.total}}</span>条数据
			</div>
		</div>
		<!-- 表格数据 -->
		<div style="margin:0 20px;">
			<el-table
				:data="tableData"
				height="275"
				style="width: 100%;"
				@selection-change="tableSelected"
			>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column
					type="index"
					label="序号"
					:index="indexMethod"
					width="50"
				></el-table-column>
				<el-table-column
					v-if="show1"
					prop="id"
					label="条目id"
				></el-table-column>
				<el-table-column  prop="xqmc" width="120" label="名称"></el-table-column>
				<el-table-column prop="hzjg" width="120" label="合作价格(万元)"></el-table-column>
				<el-table-column
					prop="contracts"
                    width="70"
					label="发布人"
				></el-table-column>
				<el-table-column prop="dz" width="120" label="所属地区"></el-table-column>
				<el-table-column
					v-if="show1"
					prop="fbwtgsm"
					label="备注"
				></el-table-column>
				<el-table-column prop="fbshzt" width="80" label="当前状态">
					<template slot-scope="scope">
						<span v-if="scope.row.fbshzt == 2" style="color:#409EFF"
							>审核通过</span
						>
						<span v-if="scope.row.fbshzt == 1" style="color:green"
							>审核中</span
						>
						<span v-if="scope.row.fbshzt == 3" style="color:red"
							>整改</span
						>
                        <span v-if="scope.row.fbshzt == 4" style="color:red"
							>拒绝</span
						>
					</template>
				</el-table-column>
				<el-table-column
					prop="releaseStatus"
					label="发布状态"
                    width="80"
				>
					<template slot-scope="scope">
						<span
							v-if="scope.row.releaseStatus == 2"
							style="color:#409EFF"
							>已发布</span
						>
						<span
							v-if="scope.row.releaseStatus == 1"
							style="color:green"
							>未发布</span
						>
					</template>
				</el-table-column>
				<el-table-column
					prop="cjsj"
					label="发布时间"
				></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="handlgetById(scope.index, scope.row)"
							icon="el-icon-edit"
						></el-button>
						<el-button
							size="mini"
							icon="el-icon-delete"
							@click="remove(scope.row.id)"
						></el-button>
						<el-button
							size="mini"
							:disabled="scope.row.fbshzt == '1' ? false : true"
							@click="audit(scope.index, scope.row)"
						>
							<img src="~@/assets/examine.png" alt="" />
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
		<!--新增-->
		<Addrequirements
			ref="Addrequirements"
			:dialog-visible1="dialogVisible1"
			:type1="type1"
			:form-data="form"
		/>
		<!-- 导入 -->
		<el-dialog
			title="导入"
			:visible.sync="dialogFormVisible"
			center
			@closed="clearFiles"
		>
			<el-upload
				ref="upload"
				align="center"
				class="upload-demo"
				:multiple="false"
				:auto-upload="true"
				list-type="text"
				:on-exceed="handleExceed"
				:http-request="uploadFile"
				:limit="1"
				:show-file-list="true"
				:before-upload="beforeUpload"
				drag
				action=""
			>
				<i class="el-icon-upload" />
				<div class="el-upload__text">
					将文件拖到此处，或<em>点击上传</em>
				</div>
			</el-upload>
		</el-dialog>
		<!-- 审核 -->
		<Audit ref="Audit" :AuditShow="AuditShow" :form-data="form" />
	</div>
</template>
<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as api from '@/http/modules/tJsXq.js'
import * as Msg from '@/utils/Message'
import Addrequirements from './Addrequirements'
import Audit from './Audit'
export default {
	components: {
		Audit,
		Addrequirements,
	},
	data() {
		return {
			loading: true,
			show1: false,
			type1: 1,
			dialogVisible1: {
				show: false,
			},
			dialogFormVisible: false,
			AuditShow: {
				show: false,
			},
			formData: {},
			tableData: [],
			searchForm: {
				lyId: null,
				lbId: null,
				cgxqId: null,
				xqmc: null,
				cjsj: null,
				pageNum: 1,
				pageSize: 4,
				total: 0,
			},
			form: {
				id: '',
				xqmc: '',
				hzjg: '',
				contracts: '',
				dz: '',
				fbwtgsm: '',
				fbshzt: '',
				releaseStatus: '',
				cjsj: '',
				lyId: null

			},
			ids: [],
		}
	},
	mounted() {
		this.list()
	},
	methods: {
		//链接表格数据
		list() {
			const that = this
			this.loading = true
			const param = this.searchForm
			api.page(param).then((res) => {
				this.loading = false
				that.tableData = res.data.data.list
				that.searchForm.total = res.data.data.total
			})
		},
		//表格序号
		indexMethod(index) {
			return  (this.searchForm.pageNum - 1) * this.searchForm.pageSize + index + 1;
		},
		// 分页
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.searchForm.pageSize = val
			this.list()
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.searchForm.pageNum = val
			this.list()
		},
		// 导入上传
		beforeUpload(file) {
			if (!this.isExcel(file)) {
				this.$message.error(
					'请上传.xlsx, .xls, .xlsm, .xltx, .csv等格式的Excel文件'
				)
				return false
			}
			// const size = file.size / 1024 / 1024
			// if (size > 5) {
			//   this.$message.error('图片大小必须小于5M')
			//   return false
			// }
			// console.log('beforeUpload')
			// console.log(file.type)
			const isText = file.type === 'application/vnd.ms-excel'
			const isTextComputer =
				file.type ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			return isText | isTextComputer
		},
		isExcel(file) {
			return /\.(xlsx|xls|csv)$/.test(file.name)
		},
		clearFiles() {
			this.$refs['upload'].clearFiles()
		},
		// 上传文件个数超过定义的数量
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
		},

		uploadFile(item) {
            const that = this
			const fileObj = item.file
			const form = new FormData()
			form.append('file', fileObj)
			form.append('headRowNumber', 1)
			api.importXq(form).then((res) => {
				const data = res.data
				switch (data.code) {
					case 0:
						Msg.success(data.msg)
						that.dialogFormVisible = false
						that.list()
						break
					case 500:
						Msg.error(data.msg)
						break
					default:
						break
				}
			})
		},
		addXq() {
			this.dialogVisible1.show = true
			this.form = {}
			this.type1 = 1
		},
		handlgetById(index, row) {
			this.dialogVisible1.show = true
			this.form = {
				...row,
			}
			console.log(this.form)
			this.type1 = 2
		},
		audit(index, row) {
			this.AuditShow.show = true
			this.form = {
				...row,
			}
			console.log(this.form)
		},
		remove(id) {
			this.$confirm('确认删除？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					// console.log(id)
					api.remove(id).then((res) => {
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
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除',
					})
				})
		},
		//搜索
		search() {
			this.list()
		},
		seachEnterFun(e) {
			var keyCode = window.event ? e.keyCode : e.which
			if (keyCode == 13) {
				this.search()
			}
		},
		//获取选中的id
		tableSelected(val) {
            this.ids=[];
			for (let selectedItem of val) {
				this.ids.push(selectedItem.id)
			}
		},
		//统一下发
		distribution() {
			api.issueBatch(this.ids).then((res) => {
                console.log(this.ids,111);
				if (res.data.code == 0) {
                    Msg.success(res.data.msg)
					this.list()
				} else {
					Msg.error(res.data.msg)
				}
			})
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
