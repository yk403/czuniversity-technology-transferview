<template>
    <el-dialog title="导入" :visible.sync="ImportShow.show" center @closed="clearFiles">
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-dialog>
</template>
<script>

import * as Msg from '@/utils/Message'
export default {
    props:["ImportShow"],
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
        }
    },

    methods: {
        beforeUpload(file) {
            if (!this.isExcel(file)) {
              this.$message.error('请上传.xlsx, .xls, .xlsm, .xltx, .csv等格式的Excel文件')
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
            const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            return (isText | isTextComputer)
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
            api.importXq(form).then(res => {
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
    },
}
</script>
<style>
    .el-dialog__title{
        float: left;
    }
</style>