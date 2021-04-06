<template>
	<div class="header">
		<!-- 设置、文档、用户设置等 -->
		<div class="header_menu">
			<!-- 系统 Logo -->
			<el-aside class="header-logo" style="width:260px;">
				<img src="@/assets/titlelogo.png" class="imgStyle" />
			</el-aside>

			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane
					label="技术转移人才培养管理"
					name="first"
				></el-tab-pane>
				<el-tab-pane
					label="先进制造仿真实训平台管理"
					name="second"
				></el-tab-pane>
				<el-tab-pane label="消费管理" name="third"></el-tab-pane>
				<el-tab-pane
					label="技术交易市场管理"
					name="fourth"
				></el-tab-pane>
				<el-tab-pane
					label="统一认证用户管理"
					name="fifth"
				></el-tab-pane>
			</el-tabs>
		</div>
		<div class="header_right">
			<img
				src="~@/assets/message.png"
				alt=""
				style="width:24px;height:24px;line-height:24px;margin-right:20px;"
			/>
			<el-menu mode="horizontal" class="header-menu-submenu">
				<!-- 用户设置 -->
				<el-submenu :title="language.userSetUp" index="3">
					<template slot="title">
						<span class="header-span">
							<img
								src="~@/assets/avatar.gif"
								:alt="userName"
								style="width:36px;height:36px;"
							/>
							{{ userName }}
						</span>
					</template>
					<el-menu-item index="3-1" @click="showPasswordBox">
						<i class="el-icon-edit"></i
						>{{ language.updatePassword }}
					</el-menu-item>
					<el-menu-item index="3-2" @click="logout">
						<i class="el-icon-close"></i>{{ language.logOut }}
					</el-menu-item>
				</el-submenu>
			</el-menu>
			<img
				src="~@/assets/exit.png"
				alt=""
				style="width:22px;height:18px;line-height:24px;margin:0 20px;"
			/>
		</div>
		<!-- 密码修改框 -->
		<UpdatePassword
			v-if="updatePasswordVisible"
			ref="updatePassowrd"
		></UpdatePassword>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import UpdatePassword from '@/views/home/UpdatePassword.vue'
import Setup from '@/views/home/Setup.vue'
import router from '@/router'
export default {
	name: 'Header',
	data() {
		return {
			// 是否展开侧边栏
			foldAside: true,
			// 默认用户名
			// userName: 'admin',
			// 是否展开密码框
			updatePasswordVisible: false,
			// 是否展开设置框
			setUpVisible: false,

			activeName: 'second',
		}
	},
	components: {
		// 引入密码框组件
		UpdatePassword,
		// 引入设置框组件
		Setup,
	},
	computed: {
		// ...mapState('user', {userName: 'userName'}),
		...mapState('user', ['userName']),
		// 定义国际化显示
		language() {
			return {
				foldAside: this.$t('header.foldAside'),
				unFoldAside: this.$t('header.unFoldAside'),
				setUp: this.$t('header.setUp'),
				help: this.$t('header.help'),
				blogAddress: this.$t('header.blogAddress'),
				codeAddress: this.$t('header.codeAddress'),
				userSetUp: this.$t('header.userSetUp'),
				updatePassword: this.$t('header.updatePassword'),
				logOut: this.$t('header.logOut'),
			}
		},
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event)
		},
		// 展开设置框
		showSetup() {
			this.setUpVisible = true
			this.$nextTick(() => {
				this.$refs.setUp.init()
			})
		},
		// 展开密码修改框
		showPasswordBox() {
			this.updatePasswordVisible = true
			// this.$nextTick 表示数据渲染后，执行密码框初始化
			this.$nextTick(() => {
				this.$refs.updatePassowrd.init()
			})
		},
		// 展开、折叠侧边栏
		foldOrOpen() {
			this.foldAside = !this.foldAside
			// this.$emit 用于触发父组件的方法，并传递参数值
			this.$emit('foldOrOpenAside', this.foldAside)
		},
		// 退出登录，回到登录界面
		logout() {
			// TODO：退出逻辑待完成
			alert('退出逻辑完成')
			router.options.isAddDynamicMenuRoutes = false
			this.$router.push({
				name: 'Login',
			})
		},
	},
}
</script>

<style>
.header {
	line-height: 85px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #535352;
	box-shadow: 0px 4px 4px 0px rgba(38, 41, 47, 0.25);
}
.header_menu {
	line-height: 85px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.el-tabs__header {
	margin: 0;
	padding-left: 56px;
}
.el-tabs__item {
	color: #afafaf;
}
.el-tabs__item.is-active {
	color: #bb7732;
}
.el-tabs__active-bar {
	background-color: #bb7732;
}
.el-tabs__nav-wrap::after {
	height: 0;
}
.el-tabs__header{
    padding-left: 20px;
}
.header-logo {
	text-align: center;
	height: 85px;
	line-height: 85px;
	width: auto;
	font-size: 18px;
	color: #fff;
	font-weight: bold;
	margin-bottom: 0;
	/* cursor: pointer; */
}
.imgStyle {
	width: auto;
	height: auto;
	max-width: 200px;
	max-height: 100%;
	display: block;
	margin: 0 auto;
	padding-top: 30px;
}
.el-menu {
	background-color: transparent;
}
.el-menu.el-menu--horizontal {
	border-bottom: none;
}
.header_right {
	display: flex;
	justify-content: space-between;
	align-items: center;
	vertical-align: middle;
}
.header-title {
	height: 50px;
	width: 50px;
	float: left;
	font-size: 50px;
	cursor: pointer;
}

.header-menu-submenu {
	float: right;
	line-height: 85px;
}
</style>
