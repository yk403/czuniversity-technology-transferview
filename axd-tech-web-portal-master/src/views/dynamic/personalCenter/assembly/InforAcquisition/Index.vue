<template>
    <!--信息采集-->
    <el-container style="margin: 0 60px;">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="acquisition_tabs">
            <el-tab-pane label="技术需求" name="first">
                <ScreenXq/>
            </el-tab-pane>
            <el-tab-pane label="技术成果" name="second">
                <ScreenCg/>
            </el-tab-pane>
        
        </el-tabs>
    </el-container>
</template>

<script>
    import ScreenXq from '@/views/dynamic/personalCenter/assembly/InforAcquisition/AcquisitionAssembly/ScreenXq.vue'
    import ScreenCg from '@/views/dynamic/personalCenter/assembly/InforAcquisition/AcquisitionAssembly/ScreenCg.vue'
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
            ScreenXq,
            ScreenCg
        },
    }
</script>

<style>
    .acquisition_tabs{
        width: 100%;
    }
    .acquisition_tabs{
        width: 100%;
    }
    /*去掉el-tab-pane底部灰色线条*/
    .acquisition_tabs .el-tabs__nav-wrap::after{
        height: 0;
    }
    /*去掉el-tab-pane切换时的蓝色下划线*/
    .acquisition_tabs .el-tabs__active-bar{
    background: transparent;
    }
    .el-tabs__item:hover {
        color: #BD8325;
    }
    .el-tabs__item.is-active {
        color: white;
        background-color: #BD8325;
        border-radius: 6px;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 20px;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child {
        padding-right: 20px;
    }
</style>