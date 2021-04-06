<template>
    <div class="app-container">
        <!--查询条件-->
        <div style="border: 1px solid #DFE6EC;border-radius: 4px">
            <el-form class="app-container" :inline="true" style="margin-top: 15px" :model="searchForm" size="small" label-width="140px">
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.id"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.xm"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.sfz"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.xb"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.sr"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.mz"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.dp"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.xl"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zyjszw"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.dw"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.dz"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.dh"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zjh"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.sshy"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.csxk"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zcfx"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.yjcg"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.dzyj"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.yjly"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zscq"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zjxm"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.lw"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.zlh"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
                <el-form-item label="：">
                    <el-input
                            v-model="searchForm.bz"
                            type="primary"
                            size="small"
                    />
                </el-form-item>
            </el-form>
        </div>
        <!--按钮组-->
        <el-card class="operate-container" shadow="never" style="margin-top: 10px">
            <el-button
                    type="primary"
                    @click="handleAdd"
            ><i class="el-icon-plus" />添加</el-button>
            <el-button
                    style="float:right;margin-right: 15px"
                    size="small"
                    type="primary"
                    icon="el-icon-refresh-left"
                    @click="reset()"
            >
                重置
            </el-button>
            <el-button
                    style="float:right"
                    type="primary"
                    size="small"
                    icon="el-icon-search"
                    @click="search()"
            >
                查询
            </el-button>
        </el-card>
        <!--数据表格-->
        <div class="table-container">
            <el-table
                    :loading="loading"
                    :data="tableData"
                    style="width: 100%;margin-top:30px;"
                    border
            >
                <el-table-column label="" prop="id" />
                <el-table-column label="" prop="xm" />
                <el-table-column label="" prop="sfz" />
                <el-table-column label="" prop="xb" />
                <el-table-column label="" prop="sr" />
                <el-table-column label="" prop="mz" />
                <el-table-column label="" prop="dp" />
                <el-table-column label="" prop="xl" />
                <el-table-column label="" prop="zyjszw" />
                <el-table-column label="" prop="dw" />
                <el-table-column label="" prop="dz" />
                <el-table-column label="" prop="dh" />
                <el-table-column label="" prop="zjh" />
                <el-table-column label="" prop="sshy" />
                <el-table-column label="" prop="csxk" />
                <el-table-column label="" prop="zcfx" />
                <el-table-column label="" prop="yjcg" />
                <el-table-column label="" prop="dzyj" />
                <el-table-column label="" prop="yjly" />
                <el-table-column label="" prop="zscq" />
                <el-table-column label="" prop="zjxm" />
                <el-table-column label="" prop="lw" />
                <el-table-column label="" prop="zlh" />
                <el-table-column label="" prop="bz" />
                <el-table-column
                        fixed="right"
                        align="center"
                        label="操作"
                        width="240"
                >
                    <template slot-scope="{row}">

                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(row)"
                            >
                                <i class="el-icon-edit" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">

                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(row)"
                            >
                                <i class="el-icon-delete" />
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                        style="float: right"
                        :current-page="searchForm.pageNum"
                        :page-sizes="[10, 30, 50, 100]"
                        :page-size="searchForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="searchForm.total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </div>
        </div>
        <!--新增、编辑弹窗-->
        <AddTZj
                ref="AddTZj"
                :dialog-visible="dialogVisible"
                :type="type"
                :form-data="formData"
        />
    </div>
</template>

<script>
    import * as api from '@/http/modules/tZj.js'
    import * as Msg from '@/utils/Message'

    import AddTZj from './AddTZj'

    export default {
        components: {
            AddTZj
        },
        data() {
            return {
                dialogVisible: {
                    show: false
                },
                loading: true,
                searchForm: {
                    id: null,
                    xm: null,
                    sfz: null,
                    xb: null,
                    sr: null,
                    mz: null,
                    dp: null,
                    xl: null,
                    zyjszw: null,
                    dw: null,
                    dz: null,
                    dh: null,
                    zjh: null,
                    sshy: null,
                    csxk: null,
                    zcfx: null,
                    yjcg: null,
                    dzyj: null,
                    yjly: null,
                    zscq: null,
                    zjxm: null,
                    lw: null,
                    zlh: null,
                    bz: null,
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                formData: {},
                type: null
            }
        },
        created() {
        },
        mounted() {
            this.list()
        },
        methods: {
            list() {
                this.loading = true
                const param = this.searchForm
                api.page(param).then(res => {
                    this.loading = false
                    if (res.data.code === 0) {
                        this.tableData = res.data.data.records
                        this.searchForm.total = res.data.data.total
                    } else {
                        Msg.error(res.data.msg)
                    }
                })
            },
            handleSizeChange(val) {
                this.searchForm.pageSize = val
                this.list()
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum = val
                this.list()
            },
            reset() {
                this.searchForm = {
                                    id: null,
                                    xm: null,
                                    sfz: null,
                                    xb: null,
                                    sr: null,
                                    mz: null,
                                    dp: null,
                                    xl: null,
                                    zyjszw: null,
                                    dw: null,
                                    dz: null,
                                    dh: null,
                                    zjh: null,
                                    sshy: null,
                                    csxk: null,
                                    zcfx: null,
                                    yjcg: null,
                                    dzyj: null,
                                    yjly: null,
                                    zscq: null,
                                    zjxm: null,
                                    lw: null,
                                    zlh: null,
                                    bz: null,
                            }
                this.list()
            },
            search() {
                this.list()
            },
            closeDialog() {
                this.dialogVisible.show = false
                this.list()
            },
            handleAdd() {
                this.type = 1
                this.dialogVisible.show = true
                this.$refs.AddTZj.restForm()
            },
            handleEdit(row) {
                this.type = 2
                this.dialogVisible.show = true
                this.formData = Object.assign({}, row)
                this.$refs.AddTZj.restForm()
            },
            handleDelete(row) {
                 this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.remove(row.id).then(res => {
                        if (res.data.code === 0) {
                            Msg.success(res.data.msg)
                            this.list()
                        } else {
                            Msg.error(res.data.msg)
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
