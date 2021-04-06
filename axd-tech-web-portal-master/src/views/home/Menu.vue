<template>
    <!--	菜单-->
    <el-container direction='vertical' class="menu" style="flex-direction: row;">
        <!--LOGO-->
		<span class="menu_logo">
			<img src="~@/assets/titlelogo2.png">
		</span>
        <!--menu-->
		<span class="menu_tabs" style="font-size: 18px;">
			<div>
				<el-menu :default-active="active" mode="horizontal" class="menu_demo"
					@select="handleSelect" background-color="white" text-color="#000" active-text-color="#BD8325" router>
					<el-menu-item index="/Content">首页</el-menu-item>
					<el-menu-item index="/Achievements">技术商品交易</el-menu-item>
					<el-menu-item index="/Requirements">技术资源需求</el-menu-item>
					<el-menu-item index="/Trading">技术交易大厅</el-menu-item>
					<el-menu-item index="/RoadShow">双创路演大厅</el-menu-item>
				</el-menu>
			</div>
			<div class="search_icon">
				<img src="~@/assets/search.png">
			</div>
		</span>
		
    </el-container>
</template>

<script>
    export default{
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
        methods:{
			handleSelect(key, keyVal) {
				this.active =  key
			},
		}
	}
</script>

<style scoped>
	.menu{
		width: 100%;
		height: 126px;
		background-color: white;
        padding:0 40px;
		display: flex;
        flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.menu_logo img{
		height: 40px;
	}
	.menu_tabs{
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.search_icon{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #F9F9F9;
		border: 1px solid #E7E7EE;
		margin-left: 20px;
	}
	.search_icon > img{
		width:20px; 
		height: 20px; 
		margin-top: 20px;
	}
    .menu_tabs /deep/ .el-menu.el-menu--horizontal{
        height: 0;
    }
	.menu_demo > .el-menu-item{
		border-bottom-color:#ffffff!important;
		font-size: 20px;
	}
	.menu_demo > .el-menu-item:hover{
		background: white !important;
		color: #BD8325 !important;
	}
</style>