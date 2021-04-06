<template>
    <!--拍卖申请-->
    <el-container direction='vertical'>
        <!--顶部-->
        <div class="Ach_top">
            <UserLogin/>
            <!--LOGO-->
            <div class="Ach_logo">
                <img src="~@/assets/titlelogo2.png">
            </div>
        </div>
        <!--面包屑导航-->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">平台门户</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Achievements'}">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>技术成果拍卖申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="140px" label-position='left'>
            <!--成果基本情况:选择-->
            <div class="Ach_basic_info">
                <h1>技术成果情况：选项</h1>
                <div class="Ach_basic_info_body">
                    <div class="Ach_basic_info_body_title">
                        <span style="color: red;">*</span> 资助情况：
                    </div>
                    <div class="checkbox">
                      <el-checkbox style="margin: 10px;" v-model="checklist" v-for="(items, index) in zzqk" :label="items.name" :key="index" @change="checkChange()">{{items.name}}</el-checkbox>
                    </div>
                </div>
                <div class="Ach_basic_info_body">
                    <div class="Ach_basic_info_body_title">
                        <span style="color: red;">*</span> 成果获得方式：
                    </div>
                    <div class="checkbox">
                      <el-checkbox style="margin: 10px;" v-model="checklist2" v-for="(items, index) in cghqfs" :label="items.name" :key="index" @change="checkChange2()">{{items.name}}</el-checkbox>
                    </div>
                </div>
                <div class="Ach_basic_info_body">
                    <div class="Ach_basic_info_body_title">
                        <span style="color: red;">*</span> 技术成熟度：
                    </div>
                    <div class="checkbox">
                      <el-checkbox style="margin: 10px;" v-model="checklist3" v-for="(items, index) in jscsd" :label="items.name" :key="index" @change="checkChange3()">{{items.name}}</el-checkbox>
                    </div>
                </div>
            </div>
            <!--成果基本情况:文本-->
            <div class="Ach_basic_info_text">
                <h1>成果基本情况:文本</h1>
                <div class="Ach_basic_info_text_body">
                    <el-form-item label="获奖情况：" prop="hjqk">
                        <el-input type="textarea" :rows="4" v-model="formData.hjqk"></el-input>
                    </el-form-item>
                </div>
            </div>
            <!--知识产权情况-->
            <div class="Ach_intellectual_info">
                <h1>知识产权情况：选项</h1>
                <div class="Ach_basic_info_body">
                    <div class="Ach_basic_info_body_title">
                        <span style="color: red;">*</span> 技术成熟度：
                    </div>
                    <div class="checkbox">
                      <el-checkbox style="margin: 10px;" v-model="checklist4" v-for="(items, index) in zscqxs" :label="items.name" :key="index" @change="checkChange4()">{{items.name}}</el-checkbox>
                    </div>
                </div>
            </div>
            <!--技术成果：文本-->
            <div class="Ach_technological_info">
                <h1>技术成果:文本</h1>
                <div class="Ach_technological_info_body" >
                    <el-form-item label="成果简介：" prop='cgjs'>
                        <el-input type="textarea" :rows="4" v-model="formData.cgjs"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="技术指标：" prop='jszb'>
                        <el-input type="textarea" :rows="4" v-model="formData.jszb"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="商业分析：" prop='syfx'>
                        <el-input type="textarea" :rows="4" v-model="formData.syfx"></el-input>
                    </el-form-item>
                </div>
                <div class="Ach_technological_info_body">
                    <el-form-item label="备注：" prop='bz'>
                        <el-input type="textarea" :rows="4" v-model="formData.bz"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <!--成果视频上传-->
<!--        <div style="padding: 0 40px; margin:20px 0;">
            <div class="Ach_img" style="background-color: white;border: 1px solid #E7E7EE;">
                <h1>成果视频</h1>
                <div class="Ach_img_body">
                    <div class="Ach_fields_text">
                        <span style="color: red;">*</span>选择你需要上传的图片
                        <span>(视频不能超过<span style="color:red;">500M</span>)</span>
                    </div>
                    <div class="Ach_img_upload">
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
                    </div>
                </div>
            </div>
        </div>-->
        <!--操作按钮-->
        <div style="margin: 16px 0 32px 0; font-size: 16px;">
            <el-button style="padding: 14px 40px;margin-right: 10px;">取消</el-button>
            <el-button style="padding: 14px 40px;background-color: #bd8325;color: white;" @click="makeSure()">提交</el-button>
        </div>
        <Footer/>
    </el-container>
</template>

<script>
    import UserLogin from '@/views/home/UserLogin.vue'
    import * as fileApi from '@/http/modules/fileUtils.js'
    import * as api from '@/http/modules/tJsCg.js'
    import Footer from '@/views/home/Footer.vue'
    import * as Msg from '@/utils/Message'
    export default {
        data(){
            return{
              jylx: 0,
              formData: {
                zzqk:'',//资助情况
                cghqfs:'',//成果获得方式
                jscsd:'',//技术成熟度
                zscqxs:'',//知识产权形式
                hjqk:'',//获奖情况
                id:'',//成果id
                jszb:'',//技术指标
                bz:'',//备注
                cgjs:'',//成果简介
                syfx:''//商业分析
              },
                rules:{
                  hjqk: [
                        { required: true, message: '此为必填项不能为空', trigger: 'blur' },
                    ],
                  jszb: [
                    { required: true, message: '此为必填项不能为空', trigger: 'blur' },
                  ],
                  bz: [
                    { required: true, message: '此为必填项不能为空', trigger: 'blur' },
                  ],
                  cgjs: [
                    { required: true, message: '此为必填项不能为空', trigger: 'blur' },
                  ],
                  syfx: [
                    { required: true, message: '此为必填项不能为空', trigger: 'blur' },
                  ]
                },
              checklist:[],
              checklist2:[],
              checklist3:[],
              checklist4:[],
              zzqk: [{
                name: '国家'
              },
                {
                  name: '省内'
                },
                {
                  name: '横向（企业/社会团体/基金等）'
                }
              ],
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
                }
              ],
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
                  name:'规模化生产'
                },
                {
                  name:'小试'
                }
              ],
              zscqxs: [
                {
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
                  name: '国际一级中药保护品种'
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
                },


              ]
            }
        },
        components:{
            UserLogin,
            Footer
        },
      mounted() {
        this.formData = {
          zzqk:this.$route.query.zzqk,//资助情况
          cghqfs:this.$route.query.cghqfs,//成果获得方式
          jscsd:this.$route.query.jscsd,//技术成熟度
          zscqxs:this.$route.query.zscqxs,//知识产权形式
          hjqk:this.$route.query.hjqk,//获奖情况
          id:this.$route.query.id,//成果id
          jszb:this.$route.query.jszb,//技术指标
          bz:this.$route.query.bz,//备注
          cgjs:this.$route.query.cgjs,//成果简介
          syfx:this.$route.query.syfx//商业分析
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
            console.log(data);
            data.zzqk=this.checklist[0]
            data.cghqfs=this.checklist2[0]
            data.jscsd=this.checklist3[0]
            data.zscqxs=this.checklist4[0]
            data.jylx=this.jylx
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
            // 视频上传
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
/*顶部*/
    .Ach_top{
        width: 100%;
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 10;
        font-size: 16px;
    }
    .Ach_logo{
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
    .Ach_logo img{
		  height: 40px;
	  }
/*面包屑导航*/
    .breadcrumb{
        margin-top: 210px;
        padding: 0 40px;
    }
    .breadcrumb > .el-breadcrumb{
        font-size: 16px;
        color: #666;
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
        font-weight: normal;
    }
/*成果基本情况*/
    .Ach_basic_info , .Ach_basic_info_text , .Ach_intellectual_info ,.Ach_technological_info{
        background-color: white;
        border: 1px solid #E7E7EE;
        margin: 20px 40px 0 40px;
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
    
/*成果视频*/
    .Ach_img>h1{
        text-align: left;
        font-size: 18px;
        color: #000;
        padding: 20px 20px;
        margin: 0;
        border-bottom: 1px solid #E7E7EE;
        margin-bottom: 20px;
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
        width: 180px;
        font-size: 16px;
        color: #000;
        margin-right: 10px;
    }
</style>