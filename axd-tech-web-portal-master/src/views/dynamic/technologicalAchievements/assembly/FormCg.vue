<template>
    <el-container direction='vertical'>
        <!--表格数据-->
        <div id="Ach_form">
        <!--单位基本情况-->
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="110px" label-position='left'>
                <div id="company_info">
                <h1>单位基本情况</h1>
                <div id="company_info_body">
                    <el-form-item label="单位名称:" prop="dwmc">
                        <el-input v-model="formData.dwmc"></el-input>
                    </el-form-item>
                    <el-form-item label="组织机构代码:" >
                        <el-input v-model="formData.zzjgdm"></el-input>
                    </el-form-item>
                    <el-form-item label="联 系 人:" prop="dwmc">
                        <el-input v-model="formData.contracts"></el-input>
                    </el-form-item>
                    <el-form-item label="法人:">
                        <el-input v-model="formData.fr"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码:" prop="dwmc">
                        <el-input v-model="formData.lxrdh"></el-input>
                    </el-form-item>
                    <el-form-item label="座机号码:">
                        <el-input v-model="formData.zj"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱:">
                        <el-input v-model="formData.dzyx"></el-input>
                    </el-form-item>
                    <el-form-item label="单位地址:" prop="dwmc" style="width:calc(66.66% - 20px)">
                        <el-input v-model="formData.dwdz"></el-input>
                    </el-form-item>
                </div>
                </div>
                <!--成果基本情况：文本-->
                <div id='Ach_info_text'>
                <h1>成果基本情况：文本</h1>
                <div id="Ach_info_body">
                    <el-form-item label="成果权属人" label-width="120px" prop="dwmc">
                        <el-input v-model="formData.cgqsr"></el-input>
                    </el-form-item>
                    <el-form-item label="权属人联系电话" label-width="120px" prop="dwmc">
                        <el-input v-model="formData.qsrlxdh"></el-input>
                    </el-form-item>
                    <el-form-item label="成果名称" label-width="120px" prop="dwmc">
                        <el-input v-model="formData.cgmc"></el-input>
                    </el-form-item>
                    <el-form-item label="关键词" label-width="120px" >
                        <el-input v-model="formData.gjc"></el-input>
                    </el-form-item>
                    <el-form-item label="成果完成时间" label-width="120px" prop="dwmc">
                        <el-input v-model="formData.cgwcsj"></el-input>
                    </el-form-item>
                    <el-form-item label="合作价格(万元)" label-width="120px" prop="dwmc">
                        <el-input v-model="formData.hzjg"></el-input>
                    </el-form-item>
                </div>
                </div>
                <!--成果基本情况：选项-->
                <div id="Ach_info_option">
                    <h1>成果基本情况：选项</h1>
                    <div id="Ach_info_option_body">
                        <div id="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>技术成果领域
                        </div>
                        <div id="checkbox">
                            <el-checkbox style="margin: 10px;" v-model="checklist2" v-for="(items, index) in arr.slice(1, )" :label="items.id" :key="index" @change="checkChange()">{{items.mc}}</el-checkbox>
                        </div>
                    </div>
                    <div id="Ach_info_option_body">
                        <div id="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>技术成果类别
                        </div>
                        <div id="checkbox">
                            <el-checkbox style="margin: 10px;" v-model="checklist" v-for="(items, index) in tabs.slice(1, )" :label="items.id" :key="index" @change="checkChange2()">{{items.mc}}</el-checkbox>
                        </div>
                    </div>
                    <div id="Ach_info_option_body">
                        <div id="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>合作方式
                        </div>
                        <div id="checkbox">
                            <el-checkbox style="margin: 10px;" v-model="checklist3" v-for="(items, index) in hzfs" :label="items.name" :key="index" @change="checkChange3()">{{items.name}}</el-checkbox>
                        </div>
                    </div>
                </div>
                <!--成果简介-->
                <div id="Ach_info_textarea">
                    <h1>成果简介</h1>
                    <div id="Ach_info_textareaBody">
                        <el-form-item label="成果简介" >
                            <el-col :span="24">
                            <el-input type="textarea" v-model="formData.cgjs" :rows="8"></el-input>
                            </el-col>
                        </el-form-item>
                    </div>
                </div>
                <!--成果图片上传-->
                <div id="Ach_img">
                    <h1>成果图片</h1>
                    <div id="Ach_img_body">
                    <div id="Ach_fields_text">
                        <span style="color: red;">*</span>选择你需要上传的图片
                    </div>
                    <div id="Ach_img_upload">
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
                        <el-input v-model="formData.cgtp" clearable></el-input>
                        </el-form-item>
                    </div>
                    </div>
                </div>

                <el-row id="Form_operation" style="margin-top:48px; margin-bottom: 56px;">
                    <el-button>取消</el-button>
                    <el-button type="warning" @click="makeSure()">提交</el-button>
                </el-row>
            </el-form>
        </div>
    </el-container>
</template>

<script>
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
import * as fileApi from '@/http/modules/fileUtils.js'
import * as api from '@/http/modules/tJsCg.js'
import UserLogin from '@/views/home/UserLogin.vue'
import Footer from '@/views/home/Footer.vue'
import * as Msg from '@/utils/Message'
export default {
  data() {
    return {
      imageUrl: '',
      tempUrl: '',
      car:{
        carImg: ''
      },
      form: {
        fileName: '',
      },
      uploadUrl: '/file/upload',
      fileList: [],
      loading:true,
      checklist: [],
      checklist2:[],
      checklist3:[],
      checked: false,
      arr: [],
      tabs: [],
      formData: {
        dwmc: '',
        zzjgdm: '',
        contracts: '',
        fr: '',
        sjhm: '',
        zj: '',
        dzyx: '',
        dwdz: '',
        cgqsr: '',
        qsrlxdh: '',
        cgmc: '',
        gjc: '',
        cgwcsj: '',
        hzjg: '',
        lyId: '',
        lbId: '',
        hzfs: '',
        cgjs: '',
        cgtp: ''
      },
      searchli: {
        pageNum: 1,
        pageSize: 100,
        total: 0,
      },
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
      rules: {
        dwmc: [
          { required: true, message: '此为必填项不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        zzjgdm: [
          { required: true, message: '此为必填项不能为空', trigger: 'blur' }
        ]
      },
      searchTab: {
        pageNum: 1,
        pageSize: 100,
        total: 0,
      },
    };
  },
  mounted() {
    this.lylist()
    this.lblist()
  },
  methods: {
    //测试下载文件(注意web的上下文)
    handleDownLoad() {
      window.location.href = `/file/download?fileName=` + this.form.fileName
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleUploadError(error, file) {

      this.$notify.error({
        title: 'error',
        message: '上传出错:' +  error,
        type: 'error',
        position: 'bottom-right'
      })
    },
    //测试上传文件(注意web的上下文)
    handleBeforeUpload(file){
      this.uploadUrl =`/file/upload`
    },
    checkChange() {

      if (this.checklist2.length > 1) {
        this.checklist2.shift();
      }
    },
    checkChange2() {

      if (this.checklist.length > 1) {
        this.checklist.shift();
      }
    },
    checkChange3() {

      if (this.checklist3.length > 1) {
        this.checklist3.shift();
      }
    },
    //领域
    lylist(){
      const that = this
      this.loading = true
      const param = this.searchli
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
      const param = this.searchTab
      lbapi.page(param).then(res =>{
        this.loading = false
        if(res.data.errCode==0){
          // console.log(res.data.data.records)
          that.tabs=res.data.data.list
        }
      })
    },
    //提交
    makeSure() {
      this.$refs['ruleForm'].validate((valid) => {
        if(valid){
          this.save(this.formData)
        }
      })
    },
    save(data) {
      // console.log(data.gaoXin)
      //data.hangyeDetail = this.detail
      data.lyId=this.checklist2[0]
      data.lbId=this.checklist[0]
      data.hzfs=this.checklist3[0]
      if(data.cgtp == ''){
        data.cgtp='http://172.21.25.2:11000/group1/M00/00/00/rBUZAmBkMdqAFRKkAABj3gPWca0000.png'
      }
      console.log(data)
      api.save(data).then(res => {
        const data = res.data
        switch (data.code) {
          case 0:
            Msg.success(data.msg);
            this.$router.push("/perCenter");
            break
          case 500:
            Msg.error(data.msg);
            break
          default:
            break
        }
      })
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
              that.formData.cgtp = data.data;
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

  },
  components: {
    UserLogin,
    Footer
  }
}
</script>

<style scoped>
    #Ach_form{
      padding: 0 40px;
    }
    #company_info , #Ach_info_text , #Ach_info_option , #Ach_img , #Ach_info_textarea{
        margin-top: 20px;
        width: 100%;
        background-color: white;
        border: 1px solid #E7E7EE;
    }
    #company_info > h1 , #Ach_info_text > h1 , #Ach_info_option > h1, #Ach_img > h1,#Ach_info_textarea > h1{
        text-align: left;
        font-size: 18px;
        padding: 20px 20px;
        margin: 0;
        border-bottom: 1px solid #E7E7EE;
        margin-bottom: 20px;
    }
    #company_info_body , #Ach_info_body , #Ach_img_body, #Ach_info_textareaBody{
        margin: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    #company_info_body, #Ach_info_body{
        margin: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    #Ach_info_body{
        background-color: #E7E7EE;
        padding: 20px 0 0 20px;
    }

    label.checkName::before {
        content: '* ';
        color: red;
    }
    #Ach_info_body{
        background-color: #E7E7EE;
        padding: 20px;
    }
    #Ach_info_option_body{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin: 20px;
        background-color: #E7E7EE;
        padding: 20px;
    }
    #checkbox{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
    }
    #Ach_fields_text{
        text-align: left;
        width: 200px;
    }
    #Ach_img_upload{
        border-radius: 6px;
        padding: 20px;
    }
    #Form_operation > .el-button{
        width: 108px;
        height: 40px;
        font-size: 16px;
    }
    #Ach_info_textareaBody .el-form-item__label{
        font-size: 16px;
    }
    #Ach_info_textareaBody .el-form-item{
        width: 100%;
    }
    .el-form-item{
        width: calc(33.33% - 20px);
        padding-right: 20px;
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
        display: block;
    }
</style>