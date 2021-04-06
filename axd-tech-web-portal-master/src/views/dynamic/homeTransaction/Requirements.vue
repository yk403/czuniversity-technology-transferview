<template>
    <!--技术需求-->
    <el-container direction='vertical' class="body">
        <!--title-->
        <div class="Req_title">
            <div class="Req_title_left">
                <span class="border"></span>
                <span class="Req_title_paragraph">专业技术，应有尽有！</span>
                <span class="Req_title_title">技术需求</span>
            </div>
            <div class="Req_title_more">查看更多 >></div>
        </div>
        <!--卡片-->
        <el-row :gutter="20" class="Req_body" type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row; justify-content: flex-start;">
            <el-col  :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-for="(iteam, index) in alldemand.slice(0, 6)" :key="index">
                <div class="Req_project">
                    <img :src="iteam.xqtp" style="width:100%; height: 264.75px; border-radius: 8px;">
                    <div class="Req_project_body">
                        <div class="Req_body_price">
                            <span style="color: #333A49;">价格：</span>
                            <span class="Req_body_price_money">{{ iteam.hzjg }}</span>
                        </div>
                        <div class="Req_body_title">{{ iteam.xqmc }}</div>
                        <div class="Req_body_TA">
                            <span style="color:#333A49;"><img src="~@/assets/time.png">{{ iteam.cjsj }}</span>
                            <span style="color:#333A49;"><img src="~@/assets/address.png">{{ iteam.dz}}</span>
                        </div>
                        <div class="Req_body_line"></div>
                        <div class="Req_body_button" @click="ViewDetails">查看详情</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import * as xqapi from '@/http/modules/tJsXq.js'
    import * as Msg from '@/utils/Message'
    export default {
        data(){
            return {
                activeName: 'first',
                loading:true,
                searchForm:{
                    pageNum:1,
                    pageSize:10,
                    total:0
                },
                alldemand:[],
                xqtp:''
            }
        },
        mounted(){
            this.load()
        },
        methods: {
            //查看需求详情
			ViewDetails(){
				const { href } =this.$router.resolve({path:'/TechAchInformation'})
            	window.open(href,'_blank')
			},
            //需求数据
            load(){
                const that = this
                this.loading = true
                const param1 = {}
                xqapi.page(param1).then(res =>{
                    that.loading = false
                    if(res.data.errCode==0){
                        that.alldemand = res.data.data.list
                    }else{
                        Msg.error(res.data.msg)
                    }
                })
            },
            showImg(){
                this.xqtp =this.$route.query.xqtp;
            }
        },
    }
</script>

<style>
    .body{
        width: 100%;
        background-color: #f6f6f6;
        padding: 48px 40px 24px 40px;
    }

    /*-----title样式-----*/

    .Req_title{
        margin-bottom: 32px;
    }
    .Req_title_left{
        position: relative;
    }
    .border{
        width: 64px;
        height: 4px;
        background-color: #BD8325;
        float: left;
        position: absolute;
        left: 0;
        top: 7px;
    }
    .Req_title_paragraph{
        float: left;
        font-size: 18px;
        position: absolute;
        left: 80px;
        top: 0px;
    }
    .Req_title_title{
        font-size: 46px;
        color: #000;
        float: left;
        position: absolute;
        left: 0;
        top: 21px;
    }
    .Req_title_more{
        width: 212px;
        height: 78px;
        background-color: none;
        margin-right: 10px;
        color: #BD8325;
        float: right;
        top: 0;
        border-radius: 6px;
        font-size: 20px;
        line-height: 78px;
    }
    .Req_title_more:hover{
        cursor: pointer;
    }

    /*-----卡片样式-----*/
    .Req_project{
        background-color: white;
    }
    .Req_project_body{
        padding: 40px 24px;
        background-color: white;
        border: 1px solid #fce7f6;
        border-top: 0px;
        margin-bottom: 24px;
    }
    .Req_project_body:hover{
        box-shadow: 0 4px 6px #ddd;
    }
    .Req_body_price{
        font-size: 16px;
        color: #333A49;
        text-align: left;
        margin-bottom: 24px;
        display: flex;
        align-items: flex-end;
    }
    .Req_body_price_text{
        font-size: 16px;
        color: #333A49;
    }
    .Req_body_price_money{
        font-size: 24px;
        color:#E6253C;
    }
    .Req_body_title{
        font-size: 24px;
        color: #000;
        text-align: left;
        margin-bottom: 24px;
    }
    .Req_body_title:hover{
        color: #BD8325;
        cursor: pointer;
    }
    .Req_body_TA{
        text-align: left;
        font-size: 16px;
        color: #333a49;
        margin-bottom: 32px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }
    .Req_body_TA > span{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        margin-right: 20px;
    }
    .Req_body_TA > span > img{
        margin-right: 16px;
    }
    .Req_body_line{
        width:100%; 
        height:2px; 
        background-color:#fce7c6; 
        margin-bottom: 24px;
    }
    .Req_body_button{
        width: 100%;
        height: 63px;
        text-align: center;
        background-color: #26292F;
        border-radius: 6px;
        color: white;
        font-size: 20px;
        line-height: 63px;
    }
    .Req_body_button:hover{
        background-color: #BD8325;
        cursor: pointer;
    }
</style>>