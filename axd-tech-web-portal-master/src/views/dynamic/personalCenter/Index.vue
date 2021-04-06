<template>
    <el-container direction='vertical' class="person">
        <!-- 个人信息 -->
		<div id="perInfo">
            <perInfo/>
		</div>
        <!--tab路由-->
        <div style="margin-top: 20px;">
            <router-view></router-view>
        </div>
    </el-container>
</template>

<script>
    import perInfo from '@/views/dynamic/personalCenter/assembly/InforShared.vue'
    export default {
        components: {
            perInfo
        }
    }
</script>

<style>
    body{
        margin: 0;
        background-color: #F7F6F6;
    }
    
</style>