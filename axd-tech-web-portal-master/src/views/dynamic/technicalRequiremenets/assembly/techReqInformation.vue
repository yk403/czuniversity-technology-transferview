<template>
<!-- 需求信息详情 -->
<div>
    <Header/>
    <el-container direction="vertical" style="margin:220px 40px 24px 40px;">
      <!--面包屑导航-->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">平台门户</el-breadcrumb-item>
          <el-breadcrumb-item>技术交易市场</el-breadcrumb-item>
          <el-breadcrumb-item>技术需求</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.query.xqmc }}需求详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <div class="form_info">
            <!-- 技术基础信息 -->
            <div>
                <div class="tech_basic">
                    <img :src="xqtp" style="width: 400px;">
                    <div class="tech_basic_info">
                        <h1>{{ this.$route.query.xqmc }}</h1>
                        <div class="tech_basic_info_body">
                            <div>行业类型：{{ this.$route.query.lbName }}</div>
                            <div>交易价格：{{ this.$route.query.hzjg }}</div>
                            <div>需求领域：{{ this.$route.query.lyName }}</div>
                            <div>合作方式：{{ this.$route.query.hzfs }}</div>
                            <div>求购方：{{ this.$route.query.yxhzdw }}</div>
                            <div>发布时间：{{ this.$route.query.cjsj }}</div>
                        </div>
                    </div>
                </div>
                <!--公司信息 --> 
                <div class="Company_info">
                    <h1>单位基本信息</h1>
                    <div class="Company_info_body">
                        <div>单位名称：{{ this.$route.query.dwmc }}</div>
                        <div>地址：{{ this.$route.query.fr }}</div>
                        <div>组织机构代码：{{ this.$route.query.zzjgdm }}</div>
                        <div>联系人：{{ this.$route.query.contracts }}</div>
                        <div>手机：{{ this.$route.query.sjhm }}</div>
                        <div>座机：{{ this.$route.query.zj }}</div>
                        <div>电子邮箱：{{ this.$route.query.dzyx }}</div>
                    </div>
                  <h1>需求基本情况</h1>
                  <div class="Company_info_body">
                    <div>需求名称：{{ this.$route.query.xqmc }}</div>
                    <div>有效期：{{ this.$route.query.yxq }}</div>
                    <div>需求类别：{{ this.$route.query.lbName }}</div>
                    <div>需求领域：{{ this.$route.query.lyName }}</div>
                    <div>合作价格：{{ this.$route.query.hzjg }}</div>
                    <div>合作方式：{{ this.$route.query.hzfs }}</div>
                  </div>
                  <h1>需求简介</h1>
                  <div class="Company_info_body">
                    <p style="font-size: 16px;text-align: left; margin-bottom: 20px;line-height: 32px;">
                      <!--                                随着科学技术的不断发展，有些农作物是一年一熟，现在都能做到一年两熟，甚至是一年三熟，现在很多农户为
                                                    了满足市场的需求，都会提前做好播种栽培蔬菜的准备，只为了迎合大众市场,人们对于反季节的南瓜的需求在
                                                    不断地提高，如果在冬季种植南瓜，就需要开始在八九月的时候进行播种，这样到了冬季才可以进行栽培和管理，
                                                    南瓜的经济价值是非常大，而且经常吃南瓜对人体也是有很大的帮助。-->
                      {{ this.$route.query.introduction }}
                    </p>
                  </div>
                </div>
                <!--需求信息-->
                <div class="Ach_info">
                    <!--技术需求详情 -->
                    <div class="Ach_business_analysis">
                        <h1>技术需求详情</h1>
                        <div class="Ach_business_analysis_info">
                            <p style="font-size: 16px;text-align: left; margin-top: 20px;line-height: 32px;">
<!--                                随着科学技术的不断发展，有些农作物是一年一熟，现在都能做到一年两熟，甚至是一年三熟，现在很多农户
                                为了满足市场的需求，都会提前做好播种栽培蔬菜的准备，只为了迎合大众市场,人们对于反季节的南瓜的需求
                                在不断地提高，如果在冬季种植南瓜，就需要开始在八九月的时候进行播种，这样到了冬季才可以进行栽培和管
                                理，南瓜的经济价值是非常大，而且经常吃南瓜对人体也是有很大的帮助，很多人都会在自己的庭院里选择种上
                                几亩南瓜，一来看着好看，二来南瓜确实是一个不错的种植点。本公司刚成立不久，对于南瓜种植技术还不是很
                                成熟,希望有相关专业人士提出专业的意见和建议。-->
                              {{ this.$route.query.xqxq }}
                            </p>
                            <img src="~@/assets/u31.jpg" style="width: 100%;margin-bottom:20px;">
                            <img src="~@/assets/u32.jpg" style="width: 100%;margin-bottom:20px;">
                        </div>
                    </div>
                </div>
            </div>
            <!--最新技术需求-->
            <div class="newest">
                <h1>最新技术需求</h1>
                <!--信息列表-->
                <div class="newest_body" v-for="(iteam, index) in allprojects" :key="index">
                    <div class="newest_info">
                        <img :src="iteam.xqtp" width="200px">
                        <div class="newest_info_body">
                            <div style="font-weight:bold; margin-bottom: 20px;">{{ iteam.xqmc }}</div>
                            <div>行业领域：{{iteam.lyName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-container>
    <Footer/>
</div>
</template>

<script>
import * as xqapi from '@/http/modules/tJsXq.js'
    import Header from '@/views/home/Header.vue'
    import Footer from '@/views/home/Footer.vue'
import * as Msg from '@/utils/Message'
    export default {
        components: { Header,Footer },
      data(){
        return{
          allprojects:[],
          xqtp: ''
        }
      },
      mounted() {
        this.list();
        this.showImg();
      },
      methods:{
        //成果数据
        list() {
          const that = this
          this.loading = true
          const param = {}
          xqapi.page(param).then(res => {
            if (res.data.errCode==0) {
              that.allprojects = res.data.data.list
            } else {
              Msg.error(res.data.msg)
            }
          })
        },
        showImg(){
          this.xqtp =this.$route.query.xqtp;
        }
      }

    }
</script>

<style>
    .breadcrumb{
      padding: 0 0 32px 0;
    }
    .breadcrumb > .el-breadcrumb{
      font-size: 16px;
      color: #666;
    }
    body{
        margin: 0;
        padding: 0;
        background:#F7F6F6;
    }

    .form_info{
        display: flex;
        flex-wrap: nowrap;
    }
    /** 基础信息 */

    .tech_basic{
        background: #FFFFFF;
        border: 1px solid #E7E7EE;
        border-radius: 6px;
        padding: 20px;
        margin-right: 10px;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .tech_basic_info{
        padding: 20px;
        text-align: left;
        font-size: 16px;
    }
    .tech_basic_info > h1{
        margin-top: 0;
        margin-bottom: 24px;
    }
    .tech_basic_info_body{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .tech_basic_info_body > div{
        width: 50%;
        margin-bottom: 16px;
    }

    /**公司信息 */

    .Company_info{
        background: #FFFFFF;
        border: 1px solid #E7E7EE;
        border-radius: 6px;
        margin-right: 10px;
        margin-bottom: 20px;
    }
    .Company_info > h1 {
        font-size: 18px;
        text-align: left;
        margin: 0;
        padding: 20px;
       /* border-bottom: 1px solid #E7E7EE;*/
    }
    .Company_info_body{
        padding: 0 20px 0 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      border-bottom: 1px solid #E7E7EE;
    }
    .Company_info_body > div , .Ach_info_body_info > div{
        width: 50%;
        text-align: left;
        font-size: 14px;
        margin-bottom: 20px;
    }

    /**需求信息 */

    .Ach_info{
        background: #FFFFFF;
        border: 1px solid #E7E7EE;
        border-radius: 6px;
        margin-right: 10px;
    }
    .Ach_info_body > h1 , .Ach_info_introduction > h1 , .Ach_business_analysis > h1 , .Ach_info_technical > h1{
        font-size: 18px;
        text-align: left;
        margin: 0;
        padding: 20px;
      border-bottom: 1px solid #E7E7EE;
    }
    .Ach_info_body_info{
        margin: 0 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        border-bottom: 1px solid #E7E7EE;
    }

    /**需求简介 */

    .Ach_info_introduction_info , .Ach_business_analysis_info , .Ach_info_technical_info{
        font-size: 16px;
        text-align: left;
        padding: 0 20px;
    }
    .Ach_info_introduction_info > p , .Ach_info_technical_info > p{
        margin: 0;
        line-height: 32px;
        padding-bottom: 16px;
        border-bottom: 1px solid #E7E7EE;
    }
    .Ach_business_analysis_info > p {
        margin: 0;
        line-height: 32px;
        padding-bottom: 16px;
    }

    /* 最新技术成果样式 */
    
    .newest{
        width: 50%;
        height: 100%;
        background-color: white;
        border: #E7E7EE 1px solid;
        border-radius: 6px;
        margin-left: 10px;
    }
    .newest > h1{
        font-size: 18px;
        margin: 0;
        padding: 20px 0 20px 20px;
        text-align: left;
        border-bottom: 1px solid #E7E7EE;
    }
    .newest_body{
        padding: 20px;
    }
    .newest_info{
        text-align: left;
        display: flex;
        align-items: center;
    }
    .newest_info_body{
        margin-left: 16px;
        font-size: 16px;
    }
    
</style>