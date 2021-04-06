<template>
	<el-dialog
		title="创建活动"
		:visible.sync="dialogVisible.show"
		width="50%"
		:before-close="handleClose"
	>
		<el-form
			:model="formData"
			:rules="rules"
			ref="ruleForm"
			label-width="110px"
			label-position="left"
		>
			<div class="Req_info_text">
				<h1>技术需求文本：文本</h1>
				<div class="Req_info_body">
					<div class="Req_info_body_first">
						<el-form-item label="需求详情" prop="xqxq">
							<el-input
								v-model="formData.xqxq"
								type="textarea"
								:rows="4"
								placeholder="请输入内容"
							></el-input>
						</el-form-item>
					</div>
					<div class="Req_info_body_first">
						<el-form-item label="技术指标" prop="jszb">
							<el-input
								v-model="formData.jszb"
								type="textarea"
								:rows="4"
								placeholder="主要技术指标与参数，500字以内"
							></el-input>
						</el-form-item>
					</div>
					<div class="Req_info_body_first">
						<el-form-item label="备注" prop="remarks">
							<el-input
								v-model="formData.remarks"
								type="textarea"
								:rows="4"
								placeholder="备注"
							></el-input>
						</el-form-item>
					</div>
				</div>
			</div>
		</el-form>
	</el-dialog>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style>
   .Req_info_text{
        margin-top: 20px;
        width: 100%;
        background-color: white;
        border: 1px solid #E7E7EE;
    }
    .Req_info_text > h1{
        text-align: left;
        font-size: 18px;
        padding: 20px 20px;
        margin: 0;
        border-bottom: 1px solid #E7E7EE;
        margin-bottom: 20px;
    }
    .Req_info_body_first{
        background-color: #E7E7EE;
        padding: 20px;
        margin: 20px;
    }
    .Req_info_body_first{
        background-color: #E7E7EE;
        padding: 20px;
        margin: 20px;
    }
</style>
