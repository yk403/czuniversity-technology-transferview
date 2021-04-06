<template>
  <!--编辑需求信息-->
  <el-dialog
    :close-on-click-modal="false"
    :title="formData.xqmc"
    top="15vh"
    :visible.sync="dialogVisible1.show"
    width="75%"
    center
    @close="closeClear()"
  >
        <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="140px" label-position='left'>
            <!--技术成果：文本-->
            <div class="Ach_technological_info">
                <h1>技术成果:文本</h1>
                <div class="Ach_technological_info_body">
                    <el-form-item label="需求详情：" prop='xqxq'>
                        <el-input v-model="formData.xqxq" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="技术指标：" prop='jszb'>
                        <el-input v-model="formData.jszb" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="需求简介：" prop='introduction'>
                        <el-input v-model="formData.introduction" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="备注：" prop="remarks">
                        <el-input v-model="formData.remarks" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="Req_operation_edit">
            <el-button class="Ach_operation_edit_cancel" @click="cancel()">取消</el-button>
            <el-button class="Ach_operation_edit_submit" @click="makeSure()">提交</el-button>
        </div>
  </el-dialog>
</template>

<script>
import * as Msg from '@/utils/Message'
import { error } from '@/utils/Message'
import * as api from '@/http/modules/tJsXq.js'

export default {
  props: ['dialogVisible1','formData'],
  data() {
    return {
      detail: '',
      cityOptions: [], // '上海', '北京', '广州', '深圳'
      // checkAll: false,
      // checkedCities: [], // 默认选中
      cities: null,
      street: [],
      checkedCities1: [],
      optionsNum: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
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
    }
  },
  mounted() {
  },
  methods: {
    getStreets() {
      this.api.street.getStreet().then(res => {
        this.street = res.data
      })
    },
    closeClear() {
      this.formData.hangyeName = ''
    },
    loadSelectOption() {
/*      this.api.enterprise.company.loadSelect().then(res => {
        const data = res.data
        this.options7 = data.data
      })*/
    },
    changeCode() {
      this.options7.map(li => {
        if (li.name == this.formData.hangyeName) {
          this.formData.hangyeNum = li.value
        }
      })
    },
    save(data) {
      var that = this
      switch(data.assistanceStatus) {
        case "待提交":
          data.assistanceStatus = 0
          break;
        case "待审核":
          data.assistanceStatus = 1
          break;
        case "审核通过":
          data.assistanceStatus = 2
          break;
        case "整改":
          data.assistanceStatus = 3
          break;
        case "拒绝":
          data.assistanceStatus = 4
          break;
      }
      api.update(data).then(res => {
        const data = res.data
        switch (data.code) {
          case 0:
            Msg.success(data.msg);
            that.$parent.$parent.load();
            this.cancel();
            break
          case 500:
            Msg.error(data.msg);
            break
          default:
            break
        }
      })
    },
    makeSure() {
      this.$refs['ruleForm'].validate((valid) => {
        // console.log('1111:' + this.type1)
        // console.log(this.formData)
        if (valid) {
/*          switch (this.type1) {
            case 1:
              this.save(this.formData)
              break
            case 2:
              this.update(this.formData)
              break
            default:
              break
          }*/
          this.save(this.formData)
        }
      })
    },
    cancel() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible1.show = false
    },
    // handleCheckAllChange(val) {
    //   // console.log(this.cityOptions)
    //   this.checkedCities = val ? this.cityOptions : []
    //   // console.log('111' + this.checkedCities)
    //   this.isIndeterminate = false
    // },
    handleCheckedCitiesChange(value) {
      // const checkedCount = value.length
      // this.checkAll = checkedCount === this.cities.length
      // console.log('2:' + value)
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      this.detail = ''
      for (let i = 0; i < value.length; i++) {
        this.detail += value[i] + ';'
      }
      this.detail = this.detail.substring(0, this.detail.length - 1)
    }
  }
}
</script>

<style scoped>
/* #app-container > h1{
  text-align: left;
  font-size: 18px;
  padding: 20px 20px;
  margin: 0;
  border-bottom: 1px solid #E7E7EE;
  margin-bottom: 20px;
} */
    .Ach_basic_info , .Ach_basic_info_text , .Ach_intellectual_info ,.Ach_technological_info{
        background-color: white;
      border-bottom: 1px solid #E7E7EE;
    }
    .Ach_basic_info > h1 , .Ach_basic_info_text > h1 ,.Ach_intellectual_info > h1 , .Ach_technological_info > h1{
        margin: 0;
        padding: 20px;
        text-align: left;
        font-size: 18px;
        color: #000;
        border-bottom: 1px solid #E7E7EE;
    }
    .Ach_basic_info_text_body, .Ach_technological_info_body{
        padding: 20px;
        margin: 20px;
        background-color: #E7E7EE;
    }
    .Ach_basic_info_body{
        padding: 20px;
        margin: 20px;
        background-color: #E7E7EE;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    .Ach_basic_info_body_title{
        width: 140px;
    }
    .Ach_basic_info_body_title , .el-checkbox__label{
        font-size: 16px;
        text-align: left;
        color: #000;
    }
    .checkbox{
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    .el-form-item__label{
        font-size: 16px;
        color: #000;
    }
    .el-form-item{
        margin: 0;
    }
    /*操作按钮*/
    .Req_operation_edit{
        margin: 16px 0 32px 0;
        text-align: center;
        font-size: 16px;
      padding-bottom: 20px;
        /* right: 50%; */
    }
    .Req_operation_edit_cancel{
        padding: 14px 40px;
        margin-right: 10px;
    }
    .Req_operation_edit_submit{
        padding: 14px 40px;
        background-color: #bd8325;
        color: white;
    }
.el-form-item{
  width: 100%;
}
</style>
