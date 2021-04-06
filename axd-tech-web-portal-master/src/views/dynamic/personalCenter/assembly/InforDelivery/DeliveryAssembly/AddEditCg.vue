<template>
  <!--编辑需求信息-->
  <el-dialog
    :close-on-click-modal="false"
    :title="formData.cgmc"
    top="0vh"
    :visible.sync="dialogVisible2.show"
    width="75%"
    center
    @close="closeClear()"
  >
            <el-form :model="formData" :rules="formRules" ref="ruleForm" label-width="100px" label-position='right'>
              <!--成果基本情况：选项-->
              <div class="Ach_choice_info">
                <h1>成果基本情况：选项</h1>
                <!--资助情况-->
                <div class="Ach_choice_info_body">
                  <div class="fields_text" style="text-align: left; width:120px;">
                    <span style="color: red;">*</span>资助情况
                  </div>
                  <div class="checkbox">
                    <el-checkbox style="margin: 10px;" v-model="checklist" v-for="(items, index) in zzqk" :label="items.name" :key="index" @change="checkChange()">{{items.name}}</el-checkbox>
                  </div>
                </div>
                <!--成果获得方式-->
                <div class="Ach_choice_info_body">
                  <div class="fields_text" style="text-align: left; width:120px;">
                    <span style="color: red;">*</span>成果获得方式
                  </div>
                  <div class="checkbox">
                    <el-checkbox style="margin: 10px;" v-model="checklist2" v-for="(items, index) in cghqfs" :label="items.name" :key="index" @change="checkChange2()">{{items.name}}</el-checkbox>
                  </div>
                </div>
                <!--技术成熟度-->
                <div class="Ach_choice_info_body">
                  <div class="fields_text" style="text-align: left; width:120px;">
                    <span style="color: red;">*</span>技术成熟度
                  </div>
                  <div class="checkbox">
                    <el-checkbox style="margin: 10px;" v-model="checklist3" v-for="(items, index) in jscsd" :label="items.name" :key="index" @change="checkChange3()">{{items.name}}</el-checkbox>
                  </div>
                </div>
              </div>
                <!--成果基本情况：文本-->
                <div class="Ach_basic_info">
                    <h1>成果基本情况：文本</h1>
                    <div class="Ach_basic_info_body">
                        <el-form-item label="获奖情况：" prop="hjqk">
                            <el-input v-model="formData.hjqk"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--知识产权情况：选项-->
                <div class="Ach_choice_info">
                    <h1>知识产权情况：选项</h1>
                <!--成果领域-->
                    <div class="Ach_choice_info_body">
                        <div class="fields_text" style="text-align: left; width:120px;">
                            <span style="color: red;">*</span>知识产权形式
                        </div>
                        <div class="checkbox">
                          <el-checkbox style="margin: 10px;" v-model="checklist4" v-for="(items, index) in zscqxs" :label="items.name" :key="index" @change="checkChange4()">{{items.name}}</el-checkbox>
                        </div>
                    </div>
                  <!--技术成果：文本-->
                  <div class="Ach_textArea_info">
                    <h1>技术成果：文本</h1>
                    <div class="Ach_textArea_info_body">
                      <el-form-item label="成果简介：" prop='cgjs'>
                        <el-input v-model="formData.cgjs" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </div>
                    <div class="Ach_textArea_info_body">
                      <el-form-item label="技术指标：" prop='jszb'>
                        <el-input v-model="formData.jszb" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </div>
                    <div class="Ach_textArea_info_body">
                      <el-form-item label="商业分析：" prop='syfx'>
                        <el-input v-model="formData.syfx" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </div>
                    <div class="Ach_textArea_info_body">
                      <el-form-item label="备注：" prop='bz'>
                        <el-input v-model="formData.bz" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
        <!--成果图片-->
<!--            <div class="Ach_img">
                <h1>成果图片</h1>
                <div class="Ach_img_body">
                  <div class="Ach_fields_text">
                    <span style="color: red;">*</span>选择你需要上传的图片：
                  </div>
                  <div class="Ach_img_upload">
                    &lt;!&ndash;            <img src="~@/assets/image.png">&ndash;&gt;
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
            </div>-->
        </el-form>
        <div class="Ach_operation_edit">
            <el-button class="Ach_operation_edit_cancel">取消</el-button>
            <el-button class="Ach_operation_edit_submit" type="warning" @click="makeSure()">提交</el-button>
        </div>
  </el-dialog>
</template>

<script>
import * as Msg from '@/utils/Message'
import { error } from '@/utils/Message'
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
import * as fileApi from '@/http/modules/fileUtils.js'
import * as api from '@/http/modules/tJsCg.js'

export default {
  props: ['dialogVisible2','formData'],
  data() {
    return {
      imageUrl: '',
      tempUrl: '',
      detail: '',
      checklist:[],
      checklist2:[],
      checklist3:[],
      checklist4:[],
      checklist5:[],
      zzqk: [{
        name: '国家'
      },
        {
          name: '省内'
        },
        {
          name: '横向（企业/社会团体/基金等）'
        }],
      cghqfs: [{
        name: '自主研发'
      },
        {
          name: '合作开发'
        },
        {
          name: '委托开发'
        },
        {
          name: '购买'
        },
        {
          name: '其他'
        }],
      jscsd: [{
        name: '在研'
      },
        {
          name: '专利'
        },
        {
          name: '实验室成果（样机/原型）'
        },
        {
          name: '规模化生产'
        },
        {
          name: '小试'
        },
        {
          name: '中试'
        },
        {
          name: '小批量'
        }
      ],
      zscqxs: [{
        name: '专利'
      },
        {
          name: '商标'
        },
        {
          name: '版权'
        },
        {
          name: '植物新品种'
        },
        {
          name: '国家新药'
        },
        {
          name: '标准'
        },
        {
          name: '国家一级中药保护品种'
        },
        {
          name: '集成电路布图设计'
        },
        {
          name: '软件著作权'
        },
        {
          name: '论文'
        },
        {
          name: '专著'
        },
        {
          name: '其他'
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
        hjqk: [
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        cgjs:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        jszb:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        syfx:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ],
        bz:[
          {
            required: true, message: '填写内容不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
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
    closeClear() {
      this.formData.hangyeName = ''
    },
    save(data) {
      var that =this;
      data.zzqk=this.checklist[0];
      data.cghqfs=this.checklist2[0];
      data.jscsd=this.checklist3[0];
      data.zscqxs=this.checklist4[0];
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
            that.$parent.$parent.list();
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
          this.save(this.formData);
        }
      })
    },
    cancel() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible2.show = false
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
    .company_info > h1 , .Ach_basic_info > h1 , .Ach_choice_info > h1 , .Ach_img > h1 , .Ach_textArea_info > h1{
      font-size: 18px;
      color: #000;
      padding: 24px;
      border: 1px solid #E7E7EE;
      margin: 0;
    }
    .company_info_body , .Ach_basic_info_body , .Ach_textArea_info_body{
      padding: 20px 0 0 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
    }
    .Ach_choice_info_body{
      padding: 20px 0 0 20px;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      background-color: #E7E7EE;
      margin: 20px;
      margin-bottom: 20px;
      align-items: center;
      padding: 20px;
    }
    .Ach_basic_info_body{
      background-color: #E7E7EE;
      margin: 20px;
    }
    .Ach_textArea_info_body{
      background-color: #E7E7EE;
      margin: 20px;
    }
    .Ach_textArea_info_body >.el-form-item{
      width: 100%;
    }
    .checkbox{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
    }
    .el-form-item{
        width: calc(33.33% - 20px);
        padding-right: 20px;
    }
    .Ach_img_body{
      margin: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
    .Ach_fields_text{
      font-size: 16px;
      color: #000;
      margin-right: 10px;
    }

    /*操作按钮*/
    .Ach_operation_edit{
        padding: 16px 0 32px 0;
        text-align: center;
        font-size: 16px;
        /* right: 50%; */
    }
    .Ach_operation_edit_cancel{
        padding: 14px 40px;
        margin-right: 10px;
    }
    .Ach_operation_edit_submit{
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
