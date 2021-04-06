<template>
    <!--招标申请-->
    <el-container direction='vertical'>
        <!--顶部-->
        <div class="Req_top">
            <UserLogin/>
            <!--LOGO-->
            <div class="Req_logo">
                <img src="~@/assets/titlelogo2.png">
            </div>
        </div>
        <!--面包屑导航-->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">平台门户</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Achievements'}">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>技术需求招标申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--form 表单-->
        <div style="padding: 0 40px;">
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="110px" label-position='left'>
                <div class='Req_info_text'>
                    <h1>技术需求文本：文本</h1>
                        <div class="Req_info_body">
                            <div class="Req_info_body_first">
                                <el-form-item label="需求详情" prop="xqxq">
                                    <el-input v-model="formData.xqxq" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </div>
                            <div class="Req_info_body_first">
                                <el-form-item label="技术指标" prop="jszb">
                                    <el-input v-model="formData.jszb" type="textarea" :rows="4" placeholder="主要技术指标与参数，500字以内"></el-input>
                                </el-form-item>
                            </div>
                          <div class="Req_info_body_first">
                            <el-form-item label="需求简介" prop="introduction">
                              <el-input v-model="formData.introduction" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
                            </el-form-item>
                          </div>
                            <div class="Req_info_body_first">
                                <el-form-item label="备注" prop="remarks">
                                    <el-input v-model="formData.remarks" type="textarea" :rows="4" placeholder="备注"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
            </el-form>
        </div>
<!--        <div style="padding: 0 40px; margin:20px 0;">
            <div class="Req_img" style="background-color: white;border: 1px solid #E7E7EE;">
                <h1>成果视频</h1>
                <div class="Req_img_body">
                    <div class="Req_fields_text">
                        <span style="color: red;">*</span>选择你需要上传的图片
                        <span>(视频不能超过<span style="color:red;">500M</span>)</span>
                    </div>
                    <div class="Req_img_upload">
                        <el-upload
                            ref="upload"
                            class="avatar-uploader"
                            action=""
                            :on-exceed="exceed"
                            :show-file-list="false"
                            :on-change="handleChange"
                            :http-request="httpRequest">
                            <img src="../../assets/video.png" class="avatar">
                        </el-upload>
                        &lt;!&ndash; <el-form-item label="车辆照片路径" prop="carImg" hidden>
                            <el-input v-model="car.carImg" clearable></el-input>
                        </el-form-item> &ndash;&gt;
                    </div>
                </div>
            </div>
        </div>-->
        <div style="margin:16px 0 36px 0;font-size:16px;">
            <el-button style="padding: 14px 40px;margin-right: 10px;font-size: 16px;">取消</el-button>
            <el-button style="padding: 14px 40px;font-size: 16px; background-color: #bd8325;color: white;" @click="makeSure()">提交</el-button>
        </div>
        <Footer/>
    </el-container>
</template>

<script>
import UserLogin from '@/views/home/UserLogin.vue'
import * as fileApi from '@/http/modules/fileUtils.js'
import * as api from '@/http/modules/tJsXq.js'
import Footer from '@/views/home/Footer.vue'
import * as Msg from '@/utils/Message'
export default {
    components:{
        UserLogin,
        Footer
    },
    data() {
        return {
            car:{
                carImg: ''
              },
          jylx: 1,
            tempUrl: '',
            formData: {
                jszb:'',//技术指标
                remarks:'',//备注
                xqxq:'',//需求详情
              introduction:'',//需求简介
              id:'',//需求id
            },
            rules: {
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
                },
        }
    },
  mounted() {
    this.formData = {
      jszb:this.$route.query.jszb,//技术指标
      remarks:this.$route.query.remarks,//备注
      xqxq:this.$route.query.xqxq,//需求详情
      id:this.$route.query.id,//需求id
      introduction:this.$route.query.introduction,//需求简介
    }
  },
  methods:{
        //提交
        makeSure() {
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    this.save(this.formData)
                }
            })
        },
        save(data){
          var that = this;
          data.jylx=this.jylx;
            console.log(data);
            api.assistanceUpdate(data).then(res => {
                const data = res.data
                switch (data.errCode) {
                case 0:
                      Msg.success(data.errMsg);
                    that.$router.push("/perCenter");
                break
                case 500:
                    Msg.error(data.errMsg);
                break
                default:
                break
                }
            })
        },
        exceed() {
            //重复选择文件,弹出错误弹窗
            this.$alert("最多仅支持上传一个视频文件")
        },
        //将上传视频的原路径赋值给临时路径
        handleChange(file, fileList) {
            this.tempUrl = URL.createObjectURL(file.raw);
        },
        //实现视频上传
        httpRequest(item){
            const isLt2M = item.file.size / 1024 / 1024 < 500;
            if (!isLt2M) {
                this.$message.error('上传视频大小不能超过 2MB!');
                //图片格式大小信息没问题 执行上传图片的方法
                if (isLt2M == true) {
                    // post上传图片
                    let App = this;
                    //定义FormData对象 存储文件
                    let mf = new FormData();
                    //将图片文件放入mf
                    mf.append('file', item.file);
                    var that=this;
                    fileApi.upload(mf).then(res => {
                        const data = res.data;
                        switch (data.code) {
                            case 0:
                                Msg.success(data.msg);
                            //将临时文件路径赋值给显示图片路径（前端显示的图片）
                                console.log(data);
                            //将后台传来的数据库图片路径赋值给car对象的图片路径
                            //that.car.carImg = result.imgUrl;
                            break
                            case 500:
                                Msg.error(data.msg);
                            break
                            default:
                            break
                        }
                    })
                }
            }
        }   
    }
}
</script>

<style>
    .Req_top{
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 10;
        font-size: 16px;
    }
    .Req_logo{
        width: 100%;
        height: 126px;
        padding: 0 40px;
        box-shadow: 0 2px 4px #ddd;
        background: url("../../assets/top_xqbg.png") center center;
        background-Repeat: "no-repeat";
        background-size: cover;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .Req_logo img{
		  height: 40px;
	  }
    .breadcrumb{
        margin-top: 210px;
        padding: 0 40px;
    }
    .breadcrumb > .el-breadcrumb{
        font-size: 16px;
        color: #666;
    }
    .breadcrumb > .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        font-weight: normal;
    }   
   .Req_info_text{
        margin-top: 20px;
        width: 100%;
        background-color: white;
        border: 1px solid #E7E7EE;
    }
   .Req_info_text > h1,.Req_img>h1{
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
    .el-form-item{
        margin-bottom: 0;
    }
    .Req_img_body{
        margin: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
    }
    .Req_fields_text{
        text-align: left; 
        width: 168px;
        text-align: center;
        font-size: 16px;
        color: #000;
        margin-right: 16px;
    }
    .avatar-uploader{
        width: 100px;
        height: 100px;
    }
    .el-form-item__label{
        font-size: 16px;
        color: #000;
    }
</style>