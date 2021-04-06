<template>
    <!--新增需求-->
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
                <el-breadcrumb-item :to="{path:'/Achievements'}">技术交易市场</el-breadcrumb-item>
                <el-breadcrumb-item>技术需求发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--form 表单-->
        <div>
            <FormXq/>
        </div>
        <Footer/>
    </el-container>
</template>

<script>
import UserLogin from '@/views/home/UserLogin.vue'
import FormXq from '@/views/dynamic/technicalRequiremenets/assembly/FormXq.vue'
import Footer from '@/views/home/Footer.vue'
export default {
    components:{
        FormXq,
        UserLogin,
        Footer
    }
}
</script>

<style>
    body{
        padding: 0;
        margin: 0;
        background-color: #F7F6F6;
    }
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
        background: url("../../../../assets/top_xqbg.png") center center;
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
     .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
      font-weight: normal;
  }
</style>