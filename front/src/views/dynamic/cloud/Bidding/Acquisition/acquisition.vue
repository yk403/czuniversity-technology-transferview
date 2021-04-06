<template>
<!--技术招标：信息采集-->
    <el-container direction="vertical" style="background-color: white;width:100%; height: 100%;padding: 20px;">
    <!--新增、搜索栏-->
        <div class="Bid_acp_info">
            <el-button type="warning">+ 新增</el-button>
            <div class="Bid_acp_info_search">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
                <el-button style="margin-left: 20px;" type="warning">统一下发</el-button>
            </div>
        </div>
    <!-- 搜索条目 -->
		<div class="search_num">
			<img style="width:18px;height:18px;margin-left:20px;" src="~@/assets/remind.png" alt=""/>
			<div style="margin-left:10px;">
				已为您筛选<span style="color:#BD8325;"></span>条数据
			</div>
		</div>
    <!-- 表格 -->
		<div>
			<el-table :data="tableData" style="width: 100%;" height="400" @selection-change="tableSelected">
				<el-table-column type="selection"></el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
                <el-table-column v-if="show1" prop="id" label="条目id"></el-table-column>
				<el-table-column prop="xqmc" label="技术名称"></el-table-column>
				<el-table-column prop="lyname" label="所属领域"></el-table-column>
				<el-table-column prop="hzjg" label="发布方"></el-table-column>
				<el-table-column prop="lxrdh" label="联系方式"></el-table-column>
				<el-table-column prop="address" label="协议管理"></el-table-column>
				<el-table-column prop="fbshzt" label="当前状态">
					<template slot-scope="scope">
						<span v-if="scope.row.fbshzt == 1" style="color:red">待审批</span>
						<span v-if="scope.row.fbshzt == 2" style="color:green">审核通过</span>
						<span v-if="scope.row.fbshzt == 3" style="color:yellow">整改</span>
						<span v-if="scope.row.fbshzt == 4" style="color:orange">拒绝</span>
					</template>
				</el-table-column>
				<el-table-column prop="cjsj" label="录入时间"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" @click="audit(scope.index, scope.row)" style="width:24px;height:24px;">
							<img style="width:16px;height:16px;" src="~@/assets/examine.png" alt=""/>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
        <!--分页-->
            <div style="margin-top: 18px;">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="searchForm.pageNum" :page-size="searchForm.pageSize" 
                    :total="searchForm.total" layout="prev, pager, next"></el-pagination>
			</div>
		</div>
    </el-container>
</template>

<script>
import * as api from '@/http/modules/tJsXq.js'
export default {
    data(){
        return{
            input:'',
            show: false,
            loading:false,
            tableData: [],
            searchForm: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				lyId: '',
				lbId: '',
				fbshzt: 1,
				mc: '',
				xqmc: '',
				cgmc: '',
			},
            form:{

            }
        }
    },
    mounted(){
        this.list()
    },
    methods:{
		list() {
			const that = this
			this.loading = true
			const param = this.searchForm
			api.page(param).then((res) => {
				this.loading = false
				that.tableData = res.data.data.list
				that.searchForm.total = res.data.data.total
			})
		},
        //表格序号
		indexMethod(index) {
			return (
				(this.searchForm.pageNum - 1) * this.searchForm.pageSize +
				index + 1
			)
		},
        //获取选中的id
		tableSelected(val) {
			this.ids = []
			for (let selectedItem of val) {
				this.ids.push(selectedItem.id)
			}
		},
        // 分页
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.searchForm.pageSize = val
			this.cglist()
		},
        handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.searchForm.pageNum = val
			this.cglist()
		},
    }
}
</script>

<style scoped>
    .Bid_acp_info{
        margin-bottom: 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .Bid_acp_info_search{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }
    .search_num {
        height: 54px;
        line-height: 54px;
        background: rgba(189, 131, 37, 0.1);
        border: 1px solid #bd8325;
        opacity: 0.3;
        border-radius: 4px;
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>