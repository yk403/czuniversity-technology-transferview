<template>
    <div class="Technology-search">
        <div class="technical-field">
            <span class="field">技术领域</span>
            <div class="Domain-classification">
                <ul>
                    <li v-for="(items,index) in arr" :key="index" :class='{active:index==isactive,unactive:index!=isactive}' 
                        @click='fn(index)'>{{items}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isactive:0, //默认第一个有样式
            colorHover: 0,
            arr:['电子信息','生物医药','航天航空','新材料','高新技术','新能源及节能','高端装备','先进制造','化学工程','现代农业与食品产业','资源与环境工程']
        }
    },
    methods: {
        fn(index){
            //点击切换 变量的值 赋值为 index
            this.isactive = index; 
        },
    }
}
</script>

<style scoped>
    .Technology-search{
        width: 100%;
        height: 180px;
        box-sizing: border-box; 
    }
    .Technology-search .technical-field{
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        border-bottom: 1px solid #EBEEF5;
        font-size: 14px;
        position: relative;
        display: flex;
    }
    .technical-field .field{
        display: block;
        width: 96px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 20%;
        margin-left: 20px;
        transform: translate(0, -20%);
    }
    .technical-field .Domain-classification{
        position: absolute;
        margin-left: 40px;
    }
    ul{
        list-style: none;
    }
    .Domain-classification>ul{
        width: 600px;
        display: flex;
        margin-left: 35px;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .Domain-classification>ul>li{
        line-height: 32px;
        padding: 5px 20px;
        border-radius: 4px;
        margin-bottom: 20px;
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