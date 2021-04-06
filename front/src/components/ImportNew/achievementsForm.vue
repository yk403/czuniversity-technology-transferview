<template>
	<!--技术成果-->
	<div class="label_body">
		<div class="screen" style="margin:20px 0 10px 0;">
			<span class="screen_search">
				<el-input
					placeholder="请输入内容"
					prefix-icon="el-icon-search"
					v-model="searchForm.cgmc"
					@keydown.enter.native="seachEnterFun"
					style="margin-left:20px;"
				></el-input>
			</span>
			<el-row class="btn">
				<el-button
					size="medium"
					round
					enctype="multipart/form-data"
					type="primary"
					@click="dialogFormVisible2 = true"
					>导入</el-button
				>
				<el-button size="medium" round type="primary" @click="loaded()"
					>新增</el-button
				>
				<el-button
					size="medium"
					round
					type="primary"
					@click="distribution()"
					>统一下发</el-button
				>
			</el-row>
		</div>
		<el-table
			:data="tableData"
			height="360"
			style="width: 100%; padding:0 10px;"
			@selection-change="tableSelected"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column
				type="index"
				label="序号"
				:index="indexMethod"
			></el-table-column>
			<el-table-column prop="cgmc" label="名称"></el-table-column>
			<el-table-column
				v-if="show1"
				prop="id"
				label="条目id"
			></el-table-column>
			<el-table-column prop="hzjg" label="预算"></el-table-column>
			<el-table-column prop="contracts" label="发布人"></el-table-column>
			<el-table-column
				v-if="show1"
				prop="fbwtgsm"
				label="备注"
			></el-table-column>
			<el-table-column prop="dwdz" label="所属地区"></el-table-column>
			<el-table-column prop="status" label="当前状态">
				<template slot-scope="scope">
					<span v-if="scope.row.status == 2" style="color:#409EFF"
						>审核通过</span
					>
					<span v-if="scope.row.status == 1" style="color:green"
						>审核中</span
					>
					<span v-if="scope.row.status == 3" style="color:red"
						>未通过</span
					>
				</template>
			</el-table-column>
			<el-table-column prop="releaseStatus" label="发布状态">
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
				prop="createTime"
				label="发布时间"
			></el-table-column>
			<el-table-column label="操作" width="220">
				<template slot-scope="scope">
					<el-button
						size="mini"
						type="primary"
						@click="audit(scope.index, scope.row)"
						:disabled="scope.row.status == '1' ? false : true"
						>审核</el-button
					>
					<el-button
						class="edit"
						size="mini"
						@click="handlgetById(scope.index, scope.row)"
						>编辑</el-button
					>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.index, scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<span class="paging">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="searchForm.pageNum"
				:page-sizes="[2, 20, 40, 60, 80]"
				:page-size="searchForm.pageSize"
				:total="searchForm.total"
				layout="total, sizes, prev, pager, next, jumper"
			>
			</el-pagination>
		</span>
		<!-- 导入excel数据 -->
		<el-dialog
			title="导入"
			:visible.sync="dialogFormVisible2"
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
		<!-- 新建 -->
		<el-dialog
			title="新增技术需求"
			:visible.sync="Newvisible"
			width="500px"
		>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="需求名称">
					<el-input v-model="form.cgmc"></el-input>
				</el-form-item>
				<el-form-item label="所属领域">
					<el-select
						v-model="form.lyId"
						placeholder="请选则"
						style="width:380"
					>
						<el-option
							v-for="item in option"
							:key="item.bn"
							:value="item.id"
							:label="item.mc"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="合作价格">
					<el-input v-model="form.hzjg"></el-input>
				</el-form-item>
				<el-form-item label="发布人">
					<el-input v-model="form.contracts"></el-input>
				</el-form-item>
				<el-form-item label="所属地区">
					<el-input v-model="form.dwdz"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="Newvisible = false">取 消</el-button>
				<el-button type="primary" @click="Save">确 定</el-button>
			</div>
		</el-dialog>
		<AuditAchievements
			ref="AuditAchievements"
			:AuditAchievements="AuditAchievements"
			:form-data="formData"
		/>
	</div>
</template>

<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as api from '@/http/modules/tJsCg.js'
import * as Msg from '@/utils/Message'

import AuditAchievements from '@/components/ImportNew/AuditAchievements.vue'
export default {
	name: 'AchievementsForm',
	props: ['lyId', 'lbId'],
	data() {
		return {
			show1: false,
			show2: false,
			Newvisible: false,
			loading: true,
			searchForm: {
				lyId: null,
				lbId: null,
				cgxqId: null,
				hzjg: null,
				dwdz: null,
				cgqsr: null,
				cgmc: null,
				cjsj: null,
				pageNum: 1,
				pageSize: 10,
				total: 0,
			},
			dialogFormVisible2: false,
			value1: '',
			input2: '',
			tableData: [],
			option: [],
			form: {
				id: '',
				cgmc: '',
				lyId: '',
				hzjg: '',
				contracts: '',
				dwdz: '',
			},
			AuditAchievements: {
				show: false,
			},
			formData: {},
			ids: [],
		}
	},
	components: { AuditAchievements },
	created() {},
	mounted() {
		this.list()
	},
	methods: {
		indexMethod(index) {
			return index + 1
		},
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

		list() {
			const that = this
			this.loading = true
			const param = this.searchForm
			api.page(param).then((res) => {
				this.loading = false
				if (res.data.errCode == 0) {
					that.tableData = res.data.data.list
					that.searchForm.total = res.data.data.total
				} else {
					Msg.error(res.data.msg)
				}
			})
		},
		//类别下拉框
		loaded() {
			this.Newvisible = true
			const paramtemp = {}
			for (let k in this.form) {
				this.form[k] = ''
			}
			lyapi.page(paramtemp).then((res) => {
				if (res.data.errCode == 0) {
					this.option = res.data.data.list
					this.searchForm.total = res.data.data.total
				} else {
					Msg.error(res.data.msg)
				}
			})
		},
		//编辑
		handlgetById(index, row) {
			this.Newvisible = true
			this.loaded()
			this.form = Object.assign({}, row)
			this.$nextTick(() => {
				this.$refs['form'].resetFields()
			})
			//   console.log(this.form.lyid)
		},
		clearFiles() {
			this.$refs['upload'].clearFiles()
		},
		// 上传文件个数超过定义的数量
		// eslint-disable-next-line no-unused-vars
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
		},
		// 上传文件
		uploadFile(item) {
			const fileObj = item.file
			const form = new FormData()
			form.append('file', fileObj)
			form.append('headRowNumber', 1)
			api.importCg(form).then((res) => {
				const data = res.data
				switch (data.code) {
					case 0:
						Msg.success(data.msg)
						this.dialogFormVisible2 = false
						this.list()
						break
					case 500:
						Msg.error(data.msg)
						break
					default:
						break
				}
			})
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
		// 删除
		handleDelete(index, row) {
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				api.remove(row.id).then((res) => {
					if (res.data.errCode == 0) {
						Msg.success(res.data.msg)
						this.list()
					} else {
						Msg.error(res.data.msg)
					}
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
		//新增
		Save() {
			if (this.form.id.length == 0) {
				this.Newvisible = false
				api.save(this.form).then((res) => {
					if (res.data.errCode == 0) {
						Msg.success(res.data.msg)
						this.list()
					} else {
						Msg.error(res.data.msg)
					}
				})
			} else if (this.form.id.length != 0) {
				this.Newvisible = false
				api.update(this.form).then((res) => {
					if (res.data.errCode == 0) {
						Msg.success(res.data.msg)
						this.list()
					} else {
						Msg.error(res.data.msg)
					}
				})
			}
		},
		//审核
		audit(index, row) {
			this.AuditAchievements.show = true
			this.formData = Object.assign({}, row)
			// this.dialoginfo = row
		},
		//关闭弹出框
		closeDialog() {
			this.AuditAchievements.show = false
			this.list()
		},

		//获取选中的id
		tableSelected(val) {
			for (let selectedItem of val) {
				this.ids.push(selectedItem.id)
			}
		},
		//统一下发
		distribution() {
			api.issueBatch(this.ids).then((res) => {
				if (res.data.errCode == 0) {
					this.list()
				} else {
					Msg.error(res.data.msg)
				}
			})
		},
	},
}
</script>

<style scope>
.label_body {
	overflow: auto;
}
.screen {
	overflow: auto;
	margin-bottom: 10px;
}
.screen_search {
	width: 360px;
	float: left;
	margin-right: 20px;
}
.time_select {
	float: left;
}
.btn {
	float: right;
	margin-right: 10px;
}
.edit {
	color: rgb(49, 144, 225);
	border: 1px solid rgb(49, 144, 225);
}
.paging {
	float: right;
	margin: 20px 20px 20px 0;
}
.el-select > .el-input {
	width: 380px;
}
.el-button.is-round {
	margin-right: 10px;
}
</style>
