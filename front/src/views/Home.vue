<template>
	<!-- 
        v-loading、element-loading-text、element-loading-background、element-loading-spinner 用于定义加载的样式
    -->
	<el-container class="container">
		<el-header width="100%" style="height:85px">
            <Header />
        </el-header>
		<el-container style="height: calc(100% - 85px);">
			<el-aside width="240px">
                <Aside />
            </el-aside>
			<el-main style="padding: 10px 20px 20px 20px;">
                <Content />
            </el-main>
		</el-container>
	</el-container>
</template>

<script>
import Header from '@/views/home/Header.vue'
import Aside from '@/views/home/Aside.vue'
import Content from '@/views/home/Content.vue'

export default {
	name: 'Home',
	components: {
		Header,
		Aside,
		Content,
	},
	data() {
		return {
			foldAside: true,
		}
	},
	methods: {
		foldOrOpen(data) {
			this.foldAside = data
		},
	}
}
</script>

<style>
    .container {
        height: 100%;
        width: 100%;
    }
    .el-header {
        padding: 0;
        height: 85px;
    }

</style>
