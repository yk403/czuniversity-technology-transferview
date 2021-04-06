<template>
    <el-main style="background-color: white; padding:0;">
        <!--banner-->
        <div class="banner">
            <div class="banner_box">
                <span class="banner_text">
                    <h1>技术交易市场</h1>
                    <p>为技术买卖方提供技术交易服务包括技术难题招标服务、技术拍卖服务、技术挂牌服务、交易公示服务等，
                    打造标准化、特色化、品牌化的技术交易流程及服务机制。</p>
                    <div class="banner_button" @click="TechnicalRelease">技术发布</div>
                </span>
                <img class="banner_img" src="~@/assets/banner_border.png">
            </div>
        </div>
        <!--技术成果-->
        <div class="technological_Achievements">
            <Achievements/>
        </div>
        <!--技术需求-->
        <div class="technical_Requirements">
            <Requirements/>
        </div>
        <!--双创路演
        <div class="roadShow">
            <div class="tech_Road_title" style="display: flex; justify-content: space-between; align-items: center; padding:0px 44px;">
                <span>
                    <h2 class="Ach_title" style="float: left; font-size: 24px; border-top: 2px solid #409EFF; padding-top: 10px;">双创路演</h2>
                    <p style="float: left; margin-left: 20px;margin-top: 24px; font-size: 14px; color:#999;">专业技术，应有尽有！</p>
                </span>
                <div>查看更多 >></div>
            </div>

          <el-row  class="Ach_body" v-for="(iteam, index) of allprojects" :key="index">
              <el-col class="Ach_project" :span="4">
                  <el-card class="grid-content bg-purple">
                      <img src="~@/assets/achievement_pic1.png" style="width: 100%;">
                      <div class="Ach_title">{{iteam.pname}}</div>
                      <div class="Ach_content">行业领域：{{iteam.pcname}}</div>
                      <div class="Ach_content">预算：{{iteam.pprice}}</div>
                      <div class="Ach_content">{{iteam.paddess}}</div>
                      <div class="Ach_content">提交时间：{{iteam.pdatesave}}</div>
                      <div class="Ach_button">了解详情</div>
                  </el-card >
              </el-col>
          </el-row>
      </div>
      -->
    </el-main>
</template>

<script>
    import Achievements from '@/views/dynamic/homeTransaction/Achievements.vue'
    import Requirements from '@/views/dynamic/homeTransaction/Requirements.vue'
    export default {
        components:{
            Requirements,
            Achievements
        },
        methods:{
            //技术发布
			TechnicalRelease(){
				const { href } =this.$router.resolve({path:'/TechnicalRelease'})
            	window.open(href,'_blank')
			},
        }
    }
</script>

<style scoped>
    .banner{
        width: 100%;
        height: 560px;
        margin-top: 189px;
        display: block;
        background: url("../../assets/banner.png") center center;
        background-Repeat: "no-repeat";
        background-size: cover;
        overflow: hidden;
    }
    .banner_box{
        position: relative;
        margin: 0 auto;
    }
    .banner_text{
        color: white;
        position: absolute;
        left: 50%;
        margin-left: -448px;
        margin-top: 72px;
        z-index: 10;
    }
    .banner_text > h1{
        font-size: 40px;
        text-align: left;
    }
    .banner_text > p{
        text-indent: 38px;
        font-size: 18px;
        text-align: left;
        width: 620px;
        line-height: 40px;
        margin-top: 28px;
        margin-bottom: 28px;
    }
    .banner_button{
        width:163px;
        height: 50px;
        background-color: #BD8325;
        color: white;
        font-size: 18px;
        border-radius: 6px;
        line-height: 50px;
    }
    .banner_button:hover{
        cursor: pointer;
    }
    .banner_img{
        position: absolute;
        left: 50%;
        margin-left: -500px;
        margin-top: 132px;
    }
    .technological_Achievements , .technical_Requirements{
        width: 100%;
    }
    .Achievement_tabs /deep/.el-tabs__nav-wrap::after{
        height: 0;
    }
</style>
