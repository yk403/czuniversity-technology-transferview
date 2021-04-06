<template>
    <!--技术成果-->
    <div class="Technology-search">
        <div>
                <!-- <span class="field">技术领域</span>
                <div class="Domain-classification">
                    <ul>
                        <li v-for="(items,index) in showList" :key='index'  :class='{active:index == isactive, unactive:index != isactive}' 
                        @click='fn(index,items)'>{{items.mc}}</li>
                    </ul>
                </div> -->
                <div>
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <el-tabs>
                                <el-tab-pane label="技术领域" name="first" disabled></el-tab-pane>
                            </el-tabs>
                        </el-col>
                        <el-col :span="21" :pull="1">
                            <el-tabs v-model="activeName3" @tab-click="fn">
                                <el-tab-pane v-for="(items,index) in arr" :key="index" :label="items.mc"></el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="Technology-category">
                <!-- <el-tabs class="category" v-model="activeName" @tab-click="handleClick">
                    禁用技术类别
                    <el-tab-pane label="技术类别" name="one" disabled></el-tab-pane>
                    <el-tab-pane v-for="(item,index) in tabs " :key="index" :label="item.mc" :name="item.id" @tab-click="lbsearch(item,index)"
                    ></el-tab-pane>
                </el-tabs> -->
                <div>
                    <el-row :gutter="20">
                            <el-col :span="3">
                                <el-tabs>
                                    <el-tab-pane label="技术类别" name="one" disabled></el-tab-pane>
                                </el-tabs>
                            </el-col>
                            <el-col :span="18" :pull="1">
                                <el-tabs v-model='activeName1' @tab-click="lbsearch">
                                    <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.mc"></el-tab-pane>
                                </el-tabs>
                            </el-col>
                    </el-row>
                </div>
            </div>
        <AchievementsForm ref="getData"></AchievementsForm>
    </div>
</template>

<script>
import AchievementsForm from "@/components/ImportNew/achievementsForm"
import * as lyapi from '@/http/modules/tJsLy.js'
import * as lbapi from '@/http/modules/tJsLb.js'
export default {
    name:"TechnologyAchievementForm",
    data() {
        return {
            activeName1: '1',
            activeName3: '0',
            isactive:0, //默认第一个有样式
            colorHover: 0,
            showAll:false,
            tabs:[],
            arr:[],
            searchli:{
                pageNum: 1,
                pageSize: 100,
                total: 0
            },
            searchTab:{
                pageNum: 1,
                pageSize: 100,
                total: 0
            }
        }
    },
    components:{AchievementsForm},
    computed:{
        //展开和收起
        // showList:function(){
        //     if(this.showAll ==false){
        //         var showList =[];
        //         if(this.arr.length>6){
        //             for(var i=0;i<6;i++){
        //                 showList.push(this.arr[i])
        //             }
        //         }else{
        //             showList = this.arr
        //         }
        //         return showList
        //     }else{
        //         return this.arr;
        //     }
        // },
        // word:function(){
        //     if(this.showAll==false){
        //         return '展开 ∨'
        //     }else{
        //         return '收起 ∧'
        //     }
        // }
    },
    mounted(){
        this.lylist()
        this.lblist()
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //父组件获取子组件的属性，调用子组件的方法
        fn(tab,event){
            const itemsId = event.target.getAttribute('id')
            const num = itemsId.replace(/[^0-9]/ig,"")
            if(num === "0"){
                this.$refs.getData.searchForm.lyId = null 
            // this.$refs.getData.list()
            }else{
                this.$refs.getData.searchForm.lyId = num
            }
                this.$refs.getData.list()
        },
        lbsearch(tab,event){
            const itemId = event.target.getAttribute('id')
            const num1 =itemId.replace(/[^0-9]/ig,"");
            if(num1 === "1"){
                this.$refs.getData.searchForm.lbId = null 
            // this.$refs.getData.list()
            }else{
                this.$refs.getData.searchForm.lbId = num1
            }
                this.$refs.getData.list()
        },
        // 领域
        lylist(){
            const that = this
            this.loading = true
            const param = this.searchli
            lyapi.page(param).then(res =>{
                this.loading = false
                if(res.data.errCode==0){
                    // console.log(res.data.data.records)
                    that.arr=res.data.data.list
                    
                }
            })
        },
        // 类别
        lblist(){
            const that = this
            this.loading = true
            const param = this.searchTab
            lbapi.page(param).then(res =>{
                this.loading = false
                if(res.data.errCode==0){
                    // console.log(res.data.data.records)
                    that.tabs=res.data.data.list
            
                }
            })
        }
    }
}
</script>

<style scoped>
    .Technology-search{
        width: 100%;
        height: auto;
        box-sizing: border-box; 
    }
    .Technology-search .Technology-category{
        width: 100%;
        height: auto;
        border: 1px solid #EBEEF5;
        border-width: 1px 0;
        box-sizing: border-box;
    }
    .technical-field{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        border-bottom: 1px solid #EBEEF5;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .technical-field .field{
        width: 80px;
        height: 40px;
        line-height: 40px;
        margin: 20px 0 20px 20px;
        padding-left: 8px;
    }
    ul{
        list-style: none;
        margin-top: 20px;
        margin-bottom: 0;
        padding-left: 0;
    }
    .Domain-classification>ul{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .Domain-classification>ul>li{
        line-height: 32px;
        padding: 5px 20px;
        border-radius: 4px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .technical-field .Domain-classification{
        width: 80.5%;
    }
    .btnShow{
        width: 80px;
        height: 40px;
        color: #409EFF;
        line-height: 40px;
        margin: 20px 40px 20px 0;
        float: right;
        cursor:pointer;
    }
    .bg{
        background-color: rgb(49, 144, 255);
        color: #FFFFFF;
        cursor: pointer;
    }
    .active{
        background-color: rgb(49, 144, 255);
        color: #FFFFFF;
        cursor: pointer;
    }
    .unactive:hover{
        color: rgb(49, 144, 255);
        cursor:pointer;
    }
</style>