<template>
  <el-container direction='vertical'>
    <!--顶部-->
    <div class="Ach_top" >
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
        <el-breadcrumb-item :to="{path:'/Achievements'}">技术交易市场</el-breadcrumb-item>
        <el-breadcrumb-item>技术成果发布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <FormCg/>
    </div>
  </el-container>
</template>

<script>
  import UserLogin from '@/views/home/UserLogin.vue'
  import FormCg from '@/views/dynamic/technologicalAchievements/assembly/FormCg.vue'
  import Footer from '@/views/home/Footer.vue'
  export default {
    components: {
      UserLogin,
      FormCg,
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
    background: url("../../../../assets/top_xqbg.png") center center;
    background-Repeat: "no-repeat";
    background-size: cover;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .Ach_logo img{
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