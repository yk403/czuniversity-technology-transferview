<template>
    <!--技术成果-->
    <el-container direction='vertical' class="body">
        <!--title-->
        <div class="Ach_title">
            <span>
                <p class="Ach_title_paragraph">专业技术，应有尽有！</p>
                <h2 class="Ach_title_title">技术成果</h2>
                <div class="Ach_title_border"></div>
            </span>
            <div class="Ach_title_selection">
                <el-tag class="selection" :class="{clickSelect : index == selectionColor}" 
                v-for="(item,index) in fields" :key="index" :type="item.type" @click.native="select(item,index)">
                    {{ item.mc }}</el-tag>
            </div>
        </div>
        <!--卡片-->
        <el-row :gutter="20" class="Ach_body" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row; justify-content: flex-start;">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-for="(iteam, index) in allprojects.slice(0, 6)" :key="index">
                <div class="Ach_project">
                    <img :src="iteam.cgtp" style="width:100%; height: 264.75px; border-radius: 8px;">
                    <div class="Ach_project_body">
                        <div class="Ach_body_title">信息技术</div>
                        <div class="Ach_content">详情介绍</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>
<script>
    import * as cgapi from '@/http/modules/tJsCg.js'
    import * as Msg from '@/utils/Message'
    import * as lyapi from '@/http/modules/tJsLy.js'
    import * as lbapi from '@/http/modules/tJsLb.js'
    export default {
        data(){
            return {
                activeName: 'first',
                loading:true,
                selectionColor:0,
                allprojects: [],
                allproject:[],
                searchForm:{
                    lbId:'',
                    pageNum:1,
                    pageSize:10,
                    total:0
                },
                alldemand:[],
                fields:[],
                items:[
                    { type: '', label: '全部' },
                    { type: '', label: '技术研发' },
                    { type: '', label: '产品研发' },
                    { type: '', label: '技术改造' }
                ],
                cgtp:''
            }
        },
        mounted(){
            this.list()
            this.lblist()
        },
        methods: {
            //成果数据
             list(){
                let that =this
                that.loading = true
                const param = that.searchForm
                cgapi.page(param).then(res =>{
                    that.loading = false
                    if(res.data.errCode==0){
                        that.allprojects=res.data.data.list;
                        that.allproject =that.allprojects.slice(0,6)
                        // console.log(that.allproject);
                    }else{
                        Msg.error(res.data.msg)
                    }     
                })
            },
            //类别数据
            lblist(){
                const that = this
                that.loading = true
                const param1 = that.searchForm
                lbapi.page(param1).then(res =>{
                    that.loading =false
                    if(res.data.errCode==0){
                        that.fields=res.data.data.list
                        console.log(that.fields);
                    }else{
                        Msg.error(res.data.msg)
                    }
                })
            },
            select(item,index){
                this.selectionColor = index
                this.selection = index
                const Id = item.id
                this.searchForm.lbId = Id
                this.list()
            },
            showImg(){
                this.cgtp = this.$roter.query.cgtp
            }
        },
    }
</script>

<style scoped>
    .body{
        width: 100%;
        margin: 0 auto;
        display: block;
        background-Repeat: "no-repeat";
        background: url("../../../assets/bgbg.png") center center;
        background-size: cover;
        overflow: hidden;
        padding: 0 40px 20px 40px;
    }
    
    /*-------title样式------*/

    .Ach_title_paragraph{
        font-size: 18px;
        color: #BD8325;
        margin-top: 48px;
    }
    .Ach_title_title{
        font-size: 46px;
        margin-top: 20px;
        color: #000;
        margin-bottom: 32px;
    }
    .Ach_title_border{
        width: 80px;
        height: 4px;
        background-color: #BD8325;
        margin: 0 auto;
        margin-bottom: 48px;
    }
    .Ach_title_selection{
        height: 36px;
        margin-bottom: 36px;
    }
    .selection{
        height: 36px;
        font-size: 18px;
        padding: 2px 20px 0 20px;
        margin: 0 8px 16px 8px;
        border: 0;
        color: #000;
    }
    .el-tag{
        background-color: transparent;
    }
    .selection:hover{
        background-color: #BD8325;
        color: white;
        cursor: pointer;
    }
    .clickSelect{
        background-color: #BD8325;
        color: white;
    }

    /*卡片样式*/
    .Ach_project{
        background-color: white;
    }
    .Ach_project_body{
        padding: 32px 24px;
        background-color: white;
        border: 1px solid #fce7f6;
        border-top: 0px;
        margin-bottom: 32px;
    }
    .Ach_project_body:hover{
        box-shadow: 0 4px 6px #ddd;
    }
    .Ach_body_title{
        text-align: center;
        font-size: 24px;
        color: #000;
        margin-bottom: 24px;
    }
    .Ach_body_title:hover{
        color: #BD8325;
        cursor: pointer;
    }
    .Ach_content{
        font-size: 16px; 
        text-align: center; 
        color: #333A49; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        
    }
</style>
