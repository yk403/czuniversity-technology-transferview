<template>
	<div>
		<el-aside
			class="aside"
			:width="asideWidth"
			:class="'icon-size-' + iconSize"
		>
			<el-scrollbar style="height: 85%; width: 100%;">
				<!--引入菜单-->
				<Menu />
			</el-scrollbar>
		</el-aside>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { isURL } from '@/utils/validate.js'
import Menu from '@/views/home/Menu.vue'
export default {
	name: 'Aside',
	props: ['foldAside'],
	data() {
		return {
			// 保存当前选中的菜单
			// menuActiveName: 'home',
			// 保存当前侧边栏的宽度
			asideWidth: '240px',
			// 用于拼接当前图标的 class 样式
			iconSize: 'true',
		}
	},
	components: {
		Menu,
	},
	computed: {
		...mapState('common', ['menuActiveName', 'mainTabs', 'dynamicRoutes']),
		// 国际化
		language() {
			return {
				adminCenter: this.$t('aside.adminCenter'),
				admin: this.$t('aside.admin'),
				homePage: this.$t('aside.homePage'),
			}
		},
	},
	methods: {
		...mapActions('common', [
			'updateMenuActiveName',
			'updateMainTabs',
			'updateMainTabsActiveName',
		]),
	},
	watch: {
		// 监视是否折叠侧边栏，折叠则宽度为 64px。
		foldAside(val) {
			this.asideWidth = val ? '240px' : '64px'
			this.iconSize = val
		},
		// 监视路由的变化，每次点击菜单项时会触发
		$route(route) {
			// 路由变化时，修改当前选中的菜单项
			this.updateMenuActiveName(route.name)
			// 是否显示标签页
			if (route.meta.isTab) {
				// 判断当前标签页数组中是否存在当前选中的标签，根据标签名匹配
				let tab = this.mainTabs.filter(
					(item) => item.name === route.name
				)[0]
				// 若当前标签页数组不存在该标签，则向数组中添加标签
				if (!tab) {
					// 设置标签页数据
					tab = {
						name: route.name,
						params: route.params,
						query: route.query,
						type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
						iframeUrl: route.meta.iframeUrl || '',
					}
					// 将数据保存到标签页数组中
					this.updateMainTabs(this.mainTabs.concat(tab))
				}
				// 保存标签页中当前选中的标签名
				this.updateMainTabsActiveName(route.name)
			}
		},
	},
}
</script>

<style scoped>

.aside {
    overflow: hidden;
	position: fixed;
	left: 0;
	height: 100%;
	background-color: #333333;
	text-align: left;
}

.el-submenu .el-menu-item {
	max-width: 280px !important;
}
.el-menu {
	border-right: 0px !important;
}
.el-scrollbar /deep/ .el-scrollbar__wrap {
	overflow: hidden !important;
}
.icon-size-false i {
	font-size: 30px !important;
}
.icon-size-true i {
	font-size: 18px !important;
}
</style>
