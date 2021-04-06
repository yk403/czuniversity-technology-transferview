<template>
    <!--侧边栏菜单-->
    <el-container direction='vertical'>
        <el-menu  :default-active="active" class="aside_menu" @open="handleOpen" @close="handleClose" @select="handleSelect"
        background-color="#333333" text-color="#fff" active-text-color="#409EFF" router>
            <el-submenu index='1'>
                <template slot="title">
                    <span>信息采集管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/ApprovalManagement">审批管理</el-menu-item>
                    <el-menu-item index="/InformationAcquisition">信息采集</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="/LabelManagement">标签字段管理</el-menu-item> -->
            <el-submenu index='2'>
                <template slot="title">
                    <span>技术招标</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/Acquisition">信息采集</el-menu-item>
                    <el-menu-item index="/Approval">审批管理</el-menu-item>
                    <el-menu-item index="/Activity">活动管理</el-menu-item>
                    <el-menu-item index="/FileGd">归档清算管理</el-menu-item>
                    <el-menu-item index="/Venue">活动会场管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index='3'>
                <template slot="title">
                    <span>技术拍卖</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/AcquisitionPM">信息采集</el-menu-item>
                    <el-menu-item index="/ApprovalPM">审批管理</el-menu-item>
                    <el-menu-item index="/ActivityPM">活动管理</el-menu-item>
                    <el-menu-item index="/FileGdPM">归档清算管理</el-menu-item>
                    <el-menu-item index="/VenuePM">活动会场管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index='4'>
                <template slot="title">
                    <span>技术挂牌</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/AcquisitionGP">信息采集</el-menu-item>
                    <el-menu-item index="/ApprovalGP">审批管理</el-menu-item>
                    <el-menu-item index="/ActivityGP">活动管理</el-menu-item>
                    <el-menu-item index="/FileGdGP">归档清算管理</el-menu-item>
                    <el-menu-item index="/VenueGP">活动会场管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/TraningCenter">双创在线路演</el-menu-item>
        </el-menu>
    </el-container>
</template>

<script>
    export default {
        data(){
			return{
				// 当前选种 menu 的路径值
				active : this.$route.path
			}
		},
        watch:{
			// 监听url的变化
			'$route'(to, from){
				this.active = to.path
			}
		},
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
			handleSelect(key, keyVal) {
				this.active =  key ;
                console.log(key, keyVal);
		    }
        }
    }
</script>

<style scoped>
    .aside_menu{
        width: 240px;
    }
    .el-aside element.style{
        height: 100%;
    }
</style>