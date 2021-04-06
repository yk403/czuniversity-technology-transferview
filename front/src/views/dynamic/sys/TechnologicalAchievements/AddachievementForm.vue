<template>
	<!-- 新建 -->
	<el-dialog
		:title="type1 == 1 ? '添加技术成果' : '编辑技术成果'"
		:visible.sync="dialogVisible1.show"
		width="500px"
	>
		<el-form ref="form" :model="formData" label-width="80px">
			<el-form-item label="成果名称">
				<el-input v-model="formData.cgmc"></el-input>
			</el-form-item>
			<el-form-item label="所属领域">
				<el-select
					v-model="formData.lyId"
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
				<el-input v-model="formData.hzjg"></el-input>
			</el-form-item>
			<el-form-item label="发布人">
				<el-input v-model="formData.contracts"></el-input>
			</el-form-item>
			<el-form-item label="所属地区">
				<el-input v-model="formData.dwdz"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="Newvisible = false">取 消</el-button>
			<el-button type="primary" @click="Save">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as Cgapi from '@/http/modules/tJsCg.js'
import * as Msg from '@/utils/Message'
export default {
	props: ['dialogVisible1', 'type1', 'formData'],
	data() {
		return {
			option: [],
			form: {
				id: '',
				cgmc: '',
				lyId: '',
				hzjg: '',
				contracts: '',
				dwdz: '',
			},
		}
	},
	mounted() {
		this.lylist()
	},
	methods: {
		lylist() {
			const paramtemp = {}
			lyapi.page(paramtemp).then((res) => {
				this.option = res.data.data.list
			})
		},
		//新增需求
		Save() {
			if (typeof this.formData.id == 'undefined') {
				Cgapi.save(this.formData).then((res) => {
					this.cancel()
					Msg.success(res.data.msg)
				})
			} else if (parseFloat(this.formData.id).toString() != 'NaN') {
				Cgapi.update(this.formData).then((res) => {
					this.cancel()
					Msg.success(res.data.msg)
				})
			}
		},
		cancel() {
			this.$refs['form'].resetFields()
			this.dialogVisible1.show = false
			this.$parent.list()
		},
	},
}
</script>

<style></style>
