<template>
	<!-- 新建 -->
	<el-dialog :title="type1 == 1?'添加技术需求':'编辑技术需求'" :visible.sync="dialogVisible1.show" width="500px">
		<el-form ref="form" :model="formData" label-width="80px">
			<el-form-item label="需求名称">
				<el-input v-model="formData.xqmc"></el-input>
			</el-form-item>
			<el-form-item label="所属领域">
				<el-select
					v-model="formData.lyId"
					placeholder="请选则"
					style="width:380"
				>
					<el-option
						v-for="item in option"
						:key="item.id"
						:value="item.id.toString()"
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
				<el-input v-model="formData.dz"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible1 = false">取 消</el-button>
			<el-button type="primary" @click="Save">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as api from '@/http/modules/tJsXq.js'
import * as Msg from '@/utils/Message'
export default {
  props: ['dialogVisible1', 'type1', 'formData'],
	data() {
		return {
			option: [],
			form: {
				id: '',
				xqmc: '',
				lyId: '',
				hzjg: '',
				contracts: '',
				dz: '',
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
      if (typeof(this.formData.id) == "undefined") {
        api.save(this.formData).then((res) => {

          this.cancel()

          Msg.success(res.data.msg)
        })
      } else if (parseFloat(this.formData.id).toString() != "NaN") {
        api.update(this.formData).then((res) => {

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
