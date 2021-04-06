<template>
    <!--
        v-loading、element-loading-text、element-loading-background、element-loading-spinner 用于定义加载的样式
     -->
    <el-container class="container" v-loading="false" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)"
     element-loading-spinner="el-icon-loading" direction="vertical">
        <!--头部导航栏 -->
        <Header/>
        <!--内容 -->
        <div id="main_container">
            <router-view></router-view>
        </div>
        <!-- footer -->
        <Footer/>
    </el-container>
</template>

<script>
    import Header from '@/views/home/Header.vue'
    import Footer from '@/views/home/Footer.vue'
    export default {
        data() {
            return {
                foldAside: true
            }
        },
        components: {
            Header,
            Footer
        },
        created() {
            //在页面加载时读取localStorage里的状态信息
            if (localStorage.getItem("store") ) {
                this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))))
            }
            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("store",JSON.stringify(this.$store.state))
            })
        },
        methods: {
            foldOrOpen(data) {
                this.foldAside = data
            }
        }
    }
</script>
<style>
    body{
        margin:0;
    }
    .main_container{
        width: 100%;
    }
</style>
