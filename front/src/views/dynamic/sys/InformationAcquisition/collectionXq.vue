<template>
<!--技术招标：信息采集-->
    <el-container direction="vertical" style="background-color: white;width:100%; height: 100%;margin-top:20px;">
    <!--新增、搜索栏-->
        <div class="Bid_acp_info">
            <div class="Bid_acp_info_button">
                <el-button type="warning" @click="addXq">+ 新增</el-button>
            </div>
            <div class="Bid_acp_info_search">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
                <el-button style="margin-left: 20px;" type="warning" plain @click="dialogFormVisible = true">导 入</el-button>
                <el-button style="margin-left: 20px;" type="warning" plain @click="distribution">发 布</el-button>
            </div>
        </div>
    <!-- 搜索条目 -->
		<div class="search_num">
			<img style="width:18px;height:18px;margin-left:20px;" src="~@/assets/remind.png" alt=""/>
			<div style="margin-left:10px;">
				已为您筛选<span style="color:#BD8325;">{{searchForm.total}}</span>条数据
			</div>
		</div>
    <!-- 表格 -->
		<div style="margin: 0 20px 20px 20px;">
			<el-table :data="tableData" style="width: 100%;" height="520" @selection-change="tableSelected">
				<el-table-column type="selection"></el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
				<el-table-column v-if="show1=false" prop="id" label="条目id"></el-table-column>
				<el-table-column prop="xqmc" label="名称"></el-table-column>
				<el-table-column prop="hzjg" label="合作价格(万元)"></el-table-column>
				<el-table-column prop="contracts" label="联系方式"></el-table-column>
				<el-table-column prop="dz" label="所属地区"></el-table-column>
				<el-table-column prop="releaseStatus" label="当前状态">
					<template slot-scope="scope">
						<span v-if="scope.row.releaseStatus == 1" style="color:red">待发布</span>
						<span v-if="scope.row.releaseStatus == 2" style="color:green">已发布</span>
					</template>
				</el-table-column>
				<el-table-column prop="cjsj" label="录入时间"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button
							size="small"
							@click="handlgetById(scope.index, scope.row)"
							icon="el-icon-edit"
						></el-button>
						<el-button
							size="small"
							icon="el-icon-delete"
							@click="remove(scope.row.id)"
						></el-button>
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
        <!-- 新增编辑 -->
        <Addrequirements
            ref="Addrequirements"
            :dialog-visible1="dialogVisible1"
            :type1="type1"
            :form-data="form"
        />
		<!-- 导入 -->
		<el-dialog
			title="导入"
			:visible.sync="dialogFormVisible"
			center
			@closed="clearFiles"
		>
			<el-upload
				ref="upload"
				align="center"
				class="upload-demo"
				:multiple="false"
				:auto-upload="true"
				list-type="text"
				:on-exceed="handleExceed"
				:http-request="uploadFile"
				:limit="1"
				:show-file-list="true"
				:before-upload="beforeUpload"
				drag
				action=""
			>
				<i class="el-icon-upload" />
				<div class="el-upload__text">
					将文件拖到此处，或<em>点击上传</em>
				</div>
			</el-upload>
		</el-dialog>
    </el-container>
</template>

<script>
import Addrequirements from './Addrequirements'
import * as api from '@/http/modules/tJsXq.js'
import * as Msg from '@/utils/Message'
export default {
    components:{
        Addrequirements
    },
    data(){
        return{
            input:'',
			type1: 1,
            show: false,
            dialogFormVisible:false,
            dialogVisible1:{
                show:false
            },
            tableData: [],
            searchForm: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				lyId: '',
				lbId: '',
				mc: '',
				xqmc: '',
				cgmc: '',
                type:1
			},
            // 添加
            form: {
                id:'',
                dwmc: '',
                zzjgdm: '',
                contracts: '',
                fr: '',
                lxrdh: '',
                zj: '',
                dzyx: '',
                dz: '',
                xqmc: '',
                cgmc:'',
                cgjs:'',
                yxq: '',
                gjz: '',
                introduction:'',
                fbshbz:'',
                hzjg: '',
                lyId: '',
                lbId: '',
                hzfs: '',
                yxhzdw: '',
                yxhzzj: '',
                xqtp:''
            },
            ids:[]
        }
    },
    mounted(){
        this.list()
    },
    methods:{
		//链接表格数据
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
        // 分页
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.searchForm.pageSize = val
			this.list()
		},
        handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.searchForm.pageNum = val
			this.list()
		},
		// 导入上传
		beforeUpload(file) {
			if (!this.isExcel(file)) {
				this.$message.error(
					'请上传.xlsx, .xls, .xlsm, .xltx, .csv等格式的Excel文件'
				)
				return false
			}
			// const size = file.size / 1024 / 1024
			// if (size > 5) {
			//   this.$message.error('图片大小必须小于5M')
			//   return false
			// }
			// console.log('beforeUpload')
			// console.log(file.type)
			const isText = file.type === 'application/vnd.ms-excel'
			const isTextComputer =
				file.type ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			return isText | isTextComputer
		},
		isExcel(file) {
			return /\.(xlsx|xls|csv)$/.test(file.name)
		},
		clearFiles() {
			this.$refs['upload'].clearFiles()
		},
		// 上传文件个数超过定义的数量
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
		},
		uploadFile(item) {
            const that = this
			const fileObj = item.file
			const form = new FormData()
			form.append('file', fileObj)
			form.append('headRowNumber', 1)
			api.importXq(form).then((res) => {
				const data = res.data
				switch (data.code) {
					case 0:
						Msg.success(data.msg)
						that.dialogFormVisible = false
                        that.list()
						break
					case 500:
						Msg.error(data.msg)
						break
					default:
						break
				}
			})
		},
        addXq(){
            this.dialogVisible1.show=true
			this.form = {}
			this.type1=1
        },
		handlgetById(index, row) {
			this.dialogVisible1.show = true
			this.form = {
				...row,
			}
				this.$refs.Addrequirements.checklist[0]= Number(this.form.lyId)
				this.$refs.Addrequirements.checklist2[0]= Number(this.form.lbId)
				this.$refs.Addrequirements.checklist3[0]= this.form.hzfs
				this.$refs.Addrequirements.checklist4[0]= this.form.yxhzdw
				this.$refs.Addrequirements.checklist5[0]= this.form.yxhzzj
				this.$refs.Addrequirements.initImage(this.form.xqtp)
			console.log(this.form)
			this.type1 = 2
		},
		remove(id) {
            const that =this
			this.$confirm('确认删除？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
					// console.log(id)
					api.remove(id).then((res) => {
						const data = res.data
						switch (data.errCode) {
							case 0:
								Msg.success(data.errMsg)
								that.list()
								break
							case 500:
								Msg.error(data.errMsg)
								break
							default:
								break
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除',
					})
				})
		},
        //获取选中的id
		tableSelected(val) {
			this.ids = []
			for (let selectedItem of val) {
				this.ids.push(selectedItem.id)
			}
		},
		//统一下发
		distribution() {
            const that = this
			api.issueBatch(that.ids).then((res) => {
				if (res.data.errCode == 0) {
                    Msg.success(res.data.errMsg)
					that.list()
				} else {
					Msg.error(res.data.errMsg)
				}
			})
		},
    }
}
</script>

<style scoped>
    .Bid_acp_info{
        margin: 20px 20px 0 20px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .Bid_acp_info_button{
        display: flex;
        flex-wrap: nowrap;
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
        margin: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>