<template>
	<!--技术需求banner-->
	<div class="Technology-search">
		<div style="background-color: #FFFFFF;">
			<div style="border-bottom: 1px solid #666666;">
				<el-row>
					<el-col :span="20">
						<div class="field">
                            <el-tabs>
                                <el-tab-pane label="技术领域" name="first" disabled></el-tab-pane>
                            </el-tabs>
							<ul class="content">
								<li
									v-for="(items, index) in showList"
									:key="index"
									:class="{
                                        activeColor: index == colorHover
									}"
									@click="fn(items,index)"
								>
									{{ items.mc }}
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="btnShow" @click="showAll = !showAll">
							{{ word }}
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="Technology-category">
				<div>
					<el-row :gutter="20">
						<el-col :span="3">
							<div
								class="category"
								style="height:80px;line-height:80px;"
							>
								<el-tabs>
									<el-tab-pane
										label="技术类别"
										name="one"
										disabled
									></el-tab-pane>
								</el-tabs>
							</div>
						</el-col>
						<el-col :span="21" :pull="1">
							<div class="category_content">
								<el-tabs
									v-model="activeName1"
									@tab-click="lbsearch"
								>
									<el-tab-pane
										v-for="(item, index) in tabs"
										:key="index"
										:label="item.mc"
									></el-tab-pane>
								</el-tabs>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
        <AchievementsForm ref="getData"/>
	</div>
</template>

<script>
import AchievementsForm from './achievementsForm'
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
import * as Msg from '@/utils/Message'
export default {
	name: 'TechnologyCategory',
    components:{AchievementsForm},
	data() {
		return {
			activeName1: '1',
			activeName3: '0',
			isactive: 0, //默认第一个有样式
			colorHover: 0,
			showAll: false,
			tabs: [],
			arr: [],
			searchli: {
				pageNum: 1,
				pageSize: 100,
				total: 0,
			},
			searchTab: {
				pageNum: 1,
				pageSize: 100,
				total: 0,
			},
		}
	},
	computed: {
		//展开和收起
		showList: function() {
			if (this.showAll == false) {
				var showList = []
				if (this.arr.length > 6) {
					for (var i = 0; i < 6; i++) {
						showList.push(this.arr[i])
					}
				} else {
					showList = this.arr
				}
				return showList
			} else {
				return this.arr
			}
		},
		word: function() {
			if (this.showAll == false) {
				return '展开 ∨'
			} else {
				return '收起 ∧'
			}
		},
	},
	mounted() {
		this.lylist()
		this.lblist()
	},
	methods: {
		//父组件给子组件的传值，调用子组件的方法
		fn(items, index) {
            this.colorHover=index
			//点击切换 变量的值 赋值为 index
			this.isactive = index
			const itemsId = items.id
			if (itemsId === '0') {
				this.$refs.getData.searchForm.lyId = null
				// this.$refs.getData.list()
			} else {
				this.$refs.getData.searchForm.lyId = itemsId
			}
			this.$refs.getData.list()
		},
		lbsearch(tab, event) {
			// const itemId = item.id
			const itemId = event.target.getAttribute('id')
			const num1 = itemId.replace(/[^0-9]/gi, '')
			if (num1 === '1') {
				this.$refs.getData.searchForm.lbId = ''
				// this.$refs.getData.list()
			} else {
				this.$refs.getData.searchForm.lbId = num1
			}
			this.$refs.getData.list()
		},
		// 领域
		lylist() {
			const that = this
			this.loading = true
			const param = this.searchli
			lyapi.page(param).then((res) => {
				this.loading = false
				if (res.data.errCode == 0) {
					// console.log(res.data.data.records)
					that.arr = res.data.data.list
				}
			})
		},
		// 类别
		lblist() {
			const that = this
			this.loading = true
			const param = this.searchTab
			lbapi.page(param).then((res) => {
				this.loading = false
				if (res.data.errCode == 0) {
					// console.log(res.data.data.records)
					that.tabs = res.data.data.list
				}
			})
		},
	},
}
</script>

<style scoped>
.Technology-search {
	width: 100%;
	height: auto;
	box-sizing: border-box;
	margin-top: 20px;
}
.field /deep/ #tab-first,
.category /deep/ #tab-one {
	font-weight: normal;
}
.field /deep/ #tab-first {
	line-height: 80px;
}
.Technology-search .content >>> .el-tabs__item {
	font-weight: normal;
	color: #666666;
	justify-content: center;
}
.Technology-category .category_content >>> .el-tabs__item {
	font-weight: normal;
	color: #666666;
	line-height: 80px;
}
.field {
	display: flex;
	justify-content: space-between;
}
ul {
	list-style: none;
	margin-top: 25px;
	margin-bottom: 0;
	padding-left: 0;
	z-index: 999;
}
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-left: 30px;
}
.content > li {
	line-height: 32px;
	padding: 0 20px;
	margin-bottom: 20px;
	display: flex;
	color: #666666;
	font-size: 14px;
	flex-direction: row;
	flex-wrap: wrap;
	cursor: pointer;
}
.btnShow {
	width: 80px;
	height: 40px;
	color: #409eff;
	line-height: 40px;
	margin: 20px 40px 20px 0;
	float: right;
	cursor: pointer;
}
.content .activeColor {
	color: #bb7732;
	cursor: pointer;
}
</style>
