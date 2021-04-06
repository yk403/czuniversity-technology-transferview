<template>
    <div class="banner">
        <div class="banner_box">
            <span class="banner_text">
                <h1>技术交易市场</h1>
                <p>为技术买卖方提供技术交易服务包括技术难题招标服务、技术拍卖服务、技术挂牌服务、交易公示服务等，
                打造标准化、特色化、品牌化的技术交易流程及服务机制。</p>
                <div class="banner_button" @click="RequirementsForm">需求发布</div>
            </span>
            <img class="banner_img" src="~@/assets/banner_border.png">
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        //需求表单
        RequirementsForm(){
            const { href } =this.$router.resolve({path:'/RequirementsForm'})
            window.open(href,'_blank')
        }
    }
}
</script>

<style>
    .banner{
        width: 100%;
        height: 560px;
        margin-top: 189px;
        display: block;
        background: url("../../../../assets/banner.png") center center;
        background-Repeat: "no-repeat";
        background-size: cover;
        overflow: hidden;
    }
    .banner_box{
        position: relative;
        margin: 0 auto;
    }
    .banner_text{
        color: white;
        position: absolute;
        left: 50%;
        margin-left: -448px;
        margin-top: 72px;
        z-index: 10;
    }
    .banner_text > h1{
        font-size: 40px;
        text-align: left;
    }
    .banner_text > p{
        font-size: 18px;
        text-align: left;
        width: 590px;
        line-height: 40px;
        margin-top: 28px;
        margin-bottom: 28px;
    }
    .banner_button{
        width:163px;
        height: 50px;
        background-color: #BD8325;
        color: white;
        font-size: 18px;
        border-radius: 6px;
        line-height: 50px;
    }
    .banner_button:hover{
        cursor: pointer;
    }
    .banner_img{
        position: absolute;
        left: 50%;
        margin-left: -500px;
        margin-top: 132px;
    }
</style>