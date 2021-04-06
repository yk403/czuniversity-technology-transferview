<template>
	<el-container  direction='vertical' style="color:white;">
        <el-header class="header_top" router>
            <span style="font-size:14px;width:180px;text-align:left">欢迎来到<span style="margin-left:4px;font-size:16px">技术交易大厅！</span></span>
            <div id="nav">
                <router-link class="nav-item" to="/Bidding" tag="li">招标大厅</router-link>
                <router-link class="nav-item" to="/Auction" tag="li">拍卖大厅</router-link>
                <router-link class="nav-item" to="/Listing" tag="li">挂牌大厅</router-link>
            </div>
            <span style="width:180px;text-align:right">用户</span>
        </el-header>
        <el-main style="padding:20px 40px; height: 100%;" >
            <router-view></router-view>
        </el-main>
	</el-container>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
        },
    }
</script>

<style>
    html, body{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    body{
        background-color: #3d444c;
    }
    .header_top {
        line-height: 60px;
        height: 100%;
        line-height: 60px;
        padding: 0 40px;
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    li{
        float: left;
    }
    #nav > .nav-item{
        margin: 0 40px;
    }
    li:hover{
        cursor: pointer;
        color: #409Eff;
    }
    .router-link-active{
        color:#409EFF;
        border-bottom: 2px solid #409eff;
    }
</style>
