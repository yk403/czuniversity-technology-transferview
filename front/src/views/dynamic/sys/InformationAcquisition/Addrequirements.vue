<template>
  <!--编辑需求信息-->
  <el-dialog
    :close-on-click-modal="false"
    :title="type1 == 1?'添加技术需求':'编辑技术需求'"
    top="9vh"
    :visible.sync="dialogVisible1.show"
    width="75%"
    center
    @close="closeClear()"
  >
            <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="100px" label-position='right'>
                <!--单位基本情况-->
                <div class="company_info">
                    <h1>单位基本情况</h1>
                    <div class="company_info_body">
                        <el-form-item label="单位名称：" prop="dwmc">
                            <el-input v-model="formData.dwmc"></el-input>
                        </el-form-item>
                        <el-form-item label="机构代码：" prop="zzjgdm">
                            <el-input v-model="formData.zzjgdm"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：" prop="contracts">
                            <el-input v-model="formData.contracts"></el-input>
                        </el-form-item>
                        <el-form-item label="法人：">
                            <el-input v-model="formData.fr"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码：" prop="lxrdh">
                            <el-input v-model="formData.lxrdh"></el-input>
                        </el-form-item>
                        <el-form-item label="座机号码：">
                            <el-input v-model="formData.zj"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱：">
                            <el-input v-model="formData.dzyx"></el-input>
                        </el-form-item>
                        <el-form-item label="单位地址：" prop="dz" style="width:calc(66.66% - 20px)">
                            <el-input v-model="formData.dz"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--需求基本情况：文本-->
                <div class="Req_basic_info">
                    <h1>需求基本情况：文本</h1>
                    <div class="Req_basic_info_body">
                        <el-form-item label="需求名称：" prop="xqmc">
                            <el-input v-model="formData.xqmc"></el-input>
                        </el-form-item>
                        <el-form-item label="关键词：" prop="gjz">
                            <el-input v-model="formData.gjz"></el-input>
                        </el-form-item>
                        <el-form-item label="有效期：" prop="yxq">
                            <el-input v-model="formData.yxq"></el-input>
                        </el-form-item>
                        <el-form-item label="合作价格：" prop="hzjg">
                            <el-input v-model="formData.hzjg" ></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--需求基本情况：选项-->
                <div class="Req_choice_info">
                    <h1>需求基本情况：选项</h1>
                    
                <!--需求领域-->
                    <div class="Req_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>需求领域
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist" v-for="(items, index) in arr.slice(1, )" :label="items.id" :key="index" @change="checkChange()">{{items.mc}}</el-checkbox>
                        </div>
                    </div>
                <!--需求类别-->
                    <div class="Req_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>需求类别
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist2" v-for="(items, index) in tabs.slice(1, )" :label="items.id" :key="index" @change="checkChange2()">{{items.mc}}</el-checkbox>
                        </div>
                    </div>
                <!--合作方式-->
                    <div class="Req_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>合作方式
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist3" v-for="(items, index) in hzfs" :label="items.name" :key="index" @change="checkChange3()">{{items.name}}</el-checkbox>
                        </div>
                    </div>
                <!--意向合作单位-->
                    <div class="Req_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>意向合作单位
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist4" v-for="(items, index) in yxhzdw" :label="items.name" :key="index" @change="checkChange4()">{{items.name}}</el-checkbox>
                        </div>
                    </div>
                <!--意向合作专家-->
                    <div class="Req_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>意向合作专家
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist5" v-for="(items, index) in yxhzzj" :label="items.name" :key="index" @change="checkChange5()">{{items.name}}</el-checkbox>
                        </div>
                    </div>
                </div>
        <!--需求图片-->
            <div class="Req_img">
                <h1>需求图片</h1>
                <div class="Req_img_body">
                  <div class="Req_fields_text">
                    <span style="color: red;">*</span>选择你需要上传的图片：
                  </div>
                  <div class="Req_img_upload">
                    <!--            <img src="~@/assets/image.png">-->
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-change="handleChange"
                        :http-request="httpRequest">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form-item label="车辆照片路径" prop="carImg" hidden>
                      <el-input v-model="formData.xqtp" clearable></el-input>
                    </el-form-item>
                  </div>
                </div>
            </div>
        </el-form>
        <div class="Req_operation_edit">
            <el-button class="Req_operation_edit_cancel" @click="cancel">取消</el-button>
            <el-button class="Req_operation_edit_submit" type="warning" @click="makeSure()">提交</el-button>
        </div>
  </el-dialog>
</template>

<script>
import * as Msg from '@/utils/Message'
import { error } from '@/utils/Message'
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
import * as fileApi from '@/http/modules/fileUtils.js'
import * as api from '@/http/modules/tJsXq.js'

export default {
  props: ['dialogVisible1','formData',"type1"],
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkcompanyFaren = (rule, value, callback) => {
      if (!value) {
        callback(new Error('法人代表不能为空'))
      }
      callback()
    }
    var checkcompanyRemark = (rule, value, callback) => {
      if (!value) {
        callback(new Error('单位电话不能为空'))
      }
      callback()
    }
    var checkshuikuName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('税库名称不能为空'))
      }
      callback()
    }
    var checkcompanyRenshu = (rule, value, callback) => {
      if (!value) {
        callback(new Error('企业人数不能为空'))
      }
      if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'))
      }
      callback()
    }

    return {
      imageUrl: '',
      tempUrl: '',
      detail: '',
      checklist:[],
      checklist2:[],
      checklist3:[],
      checklist4:[],
      checklist5:[],
      arr: [],
      tabs: [],
      hzfs: [{
        name: '技术转让'
      },
        {
          name: '技术许可'
        },
        {
          name: '技术入股'
        },
        {
          name: '其他'
        }
      ],
      yxhzdw: [{
        name: '有'
      },
        {
          name: '无'
        }
      ],
      yxhzzj: [{
        name: '有'
      },
        {
          name: '无'
        }
      ],
      optionsNum: [{
        value: 1,
        label: '是'
      }, {
        value: 0,
        label: '否'
      }],
      formRules: {
        dwmc: [
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        contracts:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        lxrdh:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        dz:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        xqmc:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        yxq:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        hzjg:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.lylist();
    this.lblist();
    console.log(this.formData);
  },
  methods: {
    checkChange() {
      if (this.checklist.length > 1) {
        this.checklist.shift();
      }
    },
    checkChange2() {
      if (this.checklist2.length > 1) {
        this.checklist2.shift();
      }
    },
    checkChange3() {
      if (this.checklist3.length > 1) {
        this.checklist3.shift();
      }
    },
    checkChange4() {
      if (this.checklist4.length > 1) {
        this.checklist4.shift();
      }
    },
    checkChange5() {
      if (this.checklist5.length > 1) {
        this.checklist5.shift();
      }
    },
    //领域
    lylist(){
      const that = this
      this.loading = true
      const param = {}
      lyapi.page(param).then(res =>{
        this.loading = false
        if(res.data.errCode==0){
          // console.log(res.data.data.records)
          that.arr=res.data.data.list
        }
      })
    },
    // 类别
    lblist(){
      const that = this
      this.loading = true
      const param = {}
      lbapi.page(param).then(res =>{
        this.loading = false
        if(res.data.errCode==0){
          // console.log(res.data.data.records)
          that.tabs=res.data.data.list
        }
      })
    },
    closeClear() {
      this.formData.hangyeName = ''
    },
    save(data) {
        const  that =this
      data.lyId=this.checklist[0]
      data.lbId=this.checklist2[0]
      data.hzfs=this.checklist3[0]
      data.yxhzdw=this.checklist4[0]
      data.yxhzzj=this.checklist5[0]
      if(data.xqtp == ''){
        data.xqtp='http://172.21.25.2:11000/group1/M00/00/00/rBUZAmBkMdqAFRKkAABj3gPWca0000.png'
      }
      if (typeof(this.formData.id) == "undefined") {
        api.save(this.formData).then((res) => {
          that.cancel()
          Msg.success(res.data.errMsg)
        })
      } else if (parseFloat(this.formData.id).toString() != "NaN") {
        api.update(this.formData).then((res) => {
          that.cancel()
          Msg.success(res.data.errMsg)
        })
      }
    },
    makeSure() {
      this.$refs['ruleForm'].validate((valid) => {
        // console.log('1111:' + this.type1)
        // console.log(this.formData)
        if (valid) {
          this.save(this.formData)
        }
      })
    },
    cancel() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible1.show = false
      this.$parent.$parent.list()
    },
    initImage(imgPath){
      this.imageUrl=imgPath;
    },
    //将上传图片的原路径赋值给临时路径
    handleChange(file, fileList) {
      this.tempUrl = URL.createObjectURL(file.raw);
    },
    //实现图片上传功能
    httpRequest(item) {
      //验证图片格式大小信息
      const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png';
      const isLt2M = item.file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      //图片格式大小信息没问题 执行上传图片的方法
      if (isJPG && isLt2M == true) {
        // post上传图片
        let App = this;
        //定义FormData对象 存储文件
        let mf = new FormData();
        //将图片文件放入mf
        mf.append('file', item.file);
        var that=this;
        fileApi.upload(mf).then(res => {
          const data = res.data;
          switch (data.errCode) {
            case 0:
              Msg.success(data.errMsg);
              //将临时文件路径赋值给显示图片路径（前端显示的图片）
              that.imageUrl = that.tempUrl;
              console.log(data);
              //将后台传来的数据库图片路径赋值给car对象的图片路径
              that.formData.xqtp = data.data;
              break
            case 500:
              Msg.error(data.errMsg);
              break
            default:
              break
          }
        })
      }
    }

  }
}
</script>

<style>
    .el-dialog--center .el-dialog__body{
      padding: 0;
    }

    .company_info > h1 , .Req_basic_info > h1 , .Req_choice_info > h1 , .Req_img > h1{
      font-size: 18px;
      color: #000;
      padding:  24px 0px 24px 21px;
      border: 1px solid #E7E7EE;
      margin: 0;
	  display:flex;
	  justify-content: flex-start;
    }
    .company_info_body , .Req_basic_info_body{
      padding: 20px 0 0 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
    }
    .Req_choice_info_body{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;
    }
    .Req_basic_info_body , .Req_choice_info_body{
      background-color: #E7E7EE;
      margin: 20px;
    }
    .checkbox{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
    }
    .Req_choice_info_body{
      margin-bottom: 20px;
      align-items: center;
      padding: 20px;
    }
    .el-form-item{
        width: calc(33.33% - 20px);
        padding-right: 20px;
    }
	.Req_img{
		border-bottom: 1px solid #E7E7EE;
	}
    .Req_img_body{
      margin: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
	  padding-bottom: 20px;
    }
    .Req_fields_text{
      font-size: 16px;
      color: #000;
      margin-right: 10px;
    }
	.Req_fields_text > span{
		padding-left: 19px;
	}

    /*操作按钮*/
    .Req_operation_edit{
        padding: 41px 0;
        text-align: center;
        font-size: 16px;
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
    .avatar-uploader {
      margin-top: 20px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 178px;
      height: 178px;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: flex;
    }

</style>
