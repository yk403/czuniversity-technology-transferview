<template>
    <el-container direction="vertical">
        <Header/>
        <!--面包屑导航-->
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">平台门户</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/Achievements'}">技术交易市场</el-breadcrumb-item>
                <el-breadcrumb-item>技术发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--标签切换-->
        <div class="acquisition_tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="技术需求" name="first">
                    <FormXq/>
                </el-tab-pane>
                <el-tab-pane label="技术成果" name="second">
                    <FormCg/>
                </el-tab-pane>
            </el-tabs>
        </div>
        <Footer/>
    </el-container>
</template>

<script>
    import Header from '@/views/home/Header.vue'
    import FormXq from '@/views/dynamic/technicalRequiremenets/assembly/FormXq.vue'
    import FormCg from '@/views/dynamic/technologicalAchievements/assembly/FormCg.vue'
    import Footer from '@/views/home/Footer.vue'
    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        components:{
            Header,
            Footer,
            FormXq,
            FormCg
        },
    }
</script>

<style>
    body{
        padding: 0;
        margin: 0;
    }
    .el-tabs__nav-scroll{
        padding: 0 40px;
    }
    /*去掉el-tab-pane底部灰色线条*/
    .acquisition_tabs .el-tabs__nav-wrap::after{
        height: 0;
    }
    /*去掉el-tab-pane切换时的蓝色下划线*/
    .acquisition_tabs .el-tabs__active-bar{
        background: #BD8325;
    }
    .acquisition_tabs{
        margin-top: 20px;
    }
    .el-tabs__item:hover {
        color: #BD8325;
    }
    .el-tabs__item.is-active {
        color: #BD8325;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 20px;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child {
        padding-right: 20px;
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