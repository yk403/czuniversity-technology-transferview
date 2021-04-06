<template>
    <el-dialog
    title="创建活动"
    :visible.sync="dialogVisible.show"
    width="50%"
    :before-close="handleClose">
    <el-form ref="form" :label-position="top" :model="formData" :rules="formRules">
        <div class="information">
            <el-form-item label="活动名称:" style="width: 50%;margin-right:16px;">
                <el-input v-model="formData.hdmc"></el-input>
            </el-form-item>
            <el-form-item label="咨询电话:" style="width: 50%;">
                <el-input v-model="formData.zxdh"></el-input>
            </el-form-item>
        </div>
        <div class="information">    
            <el-form-item label="开始时间:" style="width: 50%;margin-right:16px;">
                <el-input v-model="formData.hdkssj"></el-input>
            </el-form-item>
            <el-form-item label="截止时间:" style="width: 50%;">
                <el-input v-model="formData.hdjssj"></el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="拍卖设置:" style="width: 50%;">
                <el-radio v-model="formData.hdfs" label="0">手动拍卖</el-radio>
                <el-radio v-model="formData.hdfs" label="1">自动拍卖</el-radio>
            </el-form-item>
        </div>
        <div class="activityContent">
            <el-form-item label="活动内容:">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formData.fbshbz"></el-input>
            </el-form-item>
        </div>
        <div class="activityRule">
            <el-form-item label="活动规则:">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formData.hdgz"></el-input>
            </el-form-item>
        </div>
            <el-form-item label="活动商品:">
                    <el-table
                        :data="tableData"
                        style="width: 100%;"
                        height="558"
                        @selection-change="tableSelected"
                    >
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column
                            v-if="show1"
                            prop="id"
                            label="条目id"
                        ></el-table-column>
                        <el-table-column
                            prop="contracts"
                            label="所属领域"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="lxrdh"
                            label="需求方"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fbwtgsm"
                            label="联系方式"
                        ></el-table-column>
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
                </el-form-item>

        







    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible.show = false">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
  export default {
      props:['dialogVisible','formData'],
    data() {
      return {
            radio: '1',
			searchForm: {
				pageNum: 1,
				pageSize: 5,
				total: 0,
				lyId: '',
				lbId: '',
				mc: '',
				xqmc: '',
				cgmc: '',
                type:0
			},
        formRules: {
          jszb: [
            { required: true, message: '此为必填项不能为空', trigger: 'blur' },
          ],
          remarks: [
            { required: true, message: '此为必填项不能为空', trigger: 'blur' }
          ],
          xqxq: [
            { required: true, message: '此为必填项不能为空', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '此为必填项不能为空', trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style>
    .information{
        display: flex;

    }
/*    .activityContent > .el-form-item,.activityRule > .el-form-item{
  width: auto;
    }*/
    .el-form-item{
      width: auto;
    }
</style>