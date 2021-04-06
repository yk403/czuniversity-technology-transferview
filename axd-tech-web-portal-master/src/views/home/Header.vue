<!--suppress ALL -->
<template>
	<div class="header">
		<!--LOGO / 用户设置等 -->
		<UserLogin/>
		<!--菜单-->
		<Menu/>
	</div>
</template>

<script>
	import UserLogin from '@/views/home/UserLogin.vue'
	import Menu from '@/views/home/Menu.vue'
	export default {
		components: {
			UserLogin,
			Menu
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: auto;
		position: fixed;
		box-shadow: 0 2px 4px #999;
		top: 0;
		left: 0;
		z-index: 999;
	}
</style>
