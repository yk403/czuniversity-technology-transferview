<template>
    <!--LOGO 用户设置  menu 等 -->
	<div id="header_top">
        <!--欢迎 -->
		<p id="welcome">欢迎来到江苏省技术转移公共服务平台！</p>
        <!--用户设置 -->
			<el-menu :default-active="activeIndex" id="header_menu" mode="horizontal" @select="handleSelect">
				<el-submenu index="1" id="header_menu_user">
					<template slot="title">
						<img src="~@/assets/headPortrait.png" style="margin-right: 10px;">{{ userName }}
					</template>
					<el-menu-item index="1-1" @click="perCenter">个人中心</el-menu-item>
					<el-menu-item index="1-2" @click="showPasswordBox">{{language.updatePassword}}</el-menu-item>
					<el-menu-item index="1-3" @click="showSetup">{{language.setUp}}</el-menu-item>
					<el-menu-item index="1-4" @click="logout">{{language.logOut}}</el-menu-item>
				</el-submenu>
			</el-menu>
        <!--密码修改框 -->
		<UpdatePassword v-if="updatePasswordVisible" ref="updatePassowrd"></UpdatePassword>
        <!--设置框 -->
		<Setup v-if="setUpVisible" ref="setUp"></Setup>
	</div>
</template>

<script>
    import {mapState} from 'vuex';
	import UpdatePassword from '@/views/home/UpdatePassword.vue';
	import Setup from '@/views/home/Setup.vue';
	import router from "@/router";
	import Menu from '@/views/home/Menu.vue'
	export default {
		prompt:{
			active:{
				type: String,
				required: true
			}
		},
		data() {
			return {
				// 默认用户名
				// userName: 'admin',
				// 是否展开密码框
				updatePasswordVisible: false,
				// 是否展开设置框
				setUpVisible: false,
				//默认选中
				activeIndex: "1"
			}
		},
		components: {
			// 引入密码框组件
			UpdatePassword,
			// 引入设置框组件
			Setup,
			Menu
		},
		computed: {
			// ...mapState('user', {userName: 'userName'}),
			...mapState('user', ['userName']),
			// 定义国际化显示
			language() {
				return {
					foldAside: this.$t("header.foldAside"),
					unFoldAside: this.$t("header.unFoldAside"),
					setUp: this.$t("header.setUp"),
					blogAddress: this.$t("header.blogAddress"),
					codeAddress: this.$t("header.codeAddress"),
					userSetUp: this.$t("header.userSetUp"),
					updatePassword: this.$t("header.updatePassword"),
					logOut: this.$t("header.logOut")
				}
			}
		},
		methods: {
			handleSelect(key, keyPath){
				this.$emit('update: active', key)
			},
			// 展开设置框
			showSetup() {
				this.setUpVisible = true;
				this.$nextTick(() => {
					this.$refs.setUp.init()
				})
			},
			//个人中心
			perCenter(){
				const { href } =this.$router.resolve({path:'/perCenter'})
				window.open(href,'_blank')
			},
			// 展开密码修改框
			showPasswordBox() {
				this.updatePasswordVisible = true;
				// this.$nextTick 表示数据渲染后，执行密码框初始化
				this.$nextTick(() => {
					this.$refs.updatePassowrd.init()
				})
			},
			// 退出登录，回到登录界面
			logout() {
				// TODO：退出逻辑待完成
				alert("退出逻辑完成");
        		router.options.isAddDynamicMenuRoutes = false;
				this.$router.push({
					name: "Login"
				})
			}
		}
	}
</script>

<style>
	#header_top{
		width: 100%;
		height: 63px;
		background-color: #26292f;
	}
	#welcome{
		font-size: 18px; 
		color:white; 
		float:left;
		margin-left: 40px;
	}
	#header_menu {
		float: right;
		margin-right: 40px;
		background-color: #26292f;
	}
	#header_menu_user{
		width: 184px;
	}
	.el-menu--horizontal>.el-submenu .el-submenu__title{
		height: 63px;
		line-height: 63px;
	}
	.el-menu.el-menu--horizontal{
		border-bottom: 0px;
	}
	.el-menu--horizontal>.el-submenu .el-submenu__title:hover{
		background-color: #BD8325;
	}
	.el-menu--horizontal>.el-submenu:hover .el-submenu__title{
		color: white;
	}
	.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
		border-bottom: 0;
		color: #fff;
	}
	.el-menu--horizontal>.el-submenu .el-submenu__title{
		border-bottom: 0;
		color: #fff;
	}
</style>>