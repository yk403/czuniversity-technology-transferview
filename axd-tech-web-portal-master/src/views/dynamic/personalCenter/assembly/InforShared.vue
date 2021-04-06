<template>
    <el-container direction='vertical' class="person">
        <!-- 个人信息 -->
		<div id="perInfo">
            <!--个人信息-->
			<div id="per_infoBody">
				<div id="per_infobox">
					<img id="per_photo" src="~@/assets/personPhotos.png"/>
					<div id="per_infotext" v-for="(item, index) in perInfo" :key="index">
						<div id="per_username">
                            {{ item.usename }}
                            <div id="per_vipbg">
                                <img src="~@/assets/vip.png">
                                <span id="per_vipbg_text">铂金会员</span>
                            </div>
                        </div>
                        <div id="per_text">
                            <span>姓 名：
                                <span style="color: #000;">{{ item.name }}</span>
                            </span>
                            <span>当前职称：
                                <span style="color: #000;">{{ item.title }}</span>
                            </span>
                            <span>联系方式：
                                <span style="color: #000;">{{ item.telephone }}</span>
                            </span>
                            <span>专业领域：
                                <span style="color: #000;">{{ item.field }}</span>
                            </span>
                            <span>电子邮箱：
                                <span style="color: #000;">{{ item.email }}</span>
                            </span>
                        </div>
					</div>
				</div>
				<div id="per_edit">修改个人信息</div>
			</div>
            <!--tab菜单-->
            <div id="per_operation">
                <el-menu :default-active="active" mode="horizontal" @select="handleSelect" class="menu_demo"
                    background-color="white" text-color="#000" active-text-color="#BD8325" router>
					<el-menu-item index="/InforAcquisition">信息采集</el-menu-item>
					<el-menu-item index="/InforDelivery">信息发布</el-menu-item>
					<el-menu-item index="/InforAuction">技术拍卖</el-menu-item>
					<el-menu-item index="/InforBidding">难题竞标</el-menu-item>
					<el-menu-item index="/InforListing">技术挂牌</el-menu-item>
                    <el-menu-item index="/">参与活动</el-menu-item>
                    <el-menu-item index="/">账单管理</el-menu-item>
                    <el-menu-item index="/">消息通知</el-menu-item>
				</el-menu>
            <!--查询搜索-->
                <div>
                    <el-input id="CgSearch_form" placeholder="请输入查询内容" suffix-icon="el-icon-search" ></el-input>
                </div>
            </div>
		</div>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                perInfo: [
                    {
                        usename: '用户名',
                        name: '张某某',
                        title: '中级技术经纪人',
                        telephone: '13813881388',
                        field: '电子信息技术',
                        email: '....@163.com',
                    },
                    
                ],
                // 当前选种 menu 的路径值
                active : this.$route.path
            }
	    },
        watch:{
			// 监听url的变化
			'$route'(to, from){
				this.active = to.path
			}
		},
        methods:{
			handleSelect(key, keyVal) {
				this.active =  key
			},
		}
    }
</script>
<style scoped>
    #person {
        background-color: #F6F6F6;
    }
    #perInfo {
        padding: 20px 20px 0 20px;
        margin: 240px 40px 0px 40px;
        border-radius: 4px;
        background-color: white;
        border: 1px solid #E7E7EE;
    }
    #per_infoBody{
        border-bottom: solid 1px #E7E7EE;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    #per_infobox{
        font-size: 16px;
        color: #333;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;
    }
    #per_photo{
        width: 14.4%;
        position: absolute;
        top: -40px;
    }
    #per_infotext{
        margin-left: 170px;
        margin-bottom: 10px;
    }
    #per_username{
        font-weight: bold;
        font-size: 24px;
        color: #000;
        margin: 24px 0 24px 0;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
    }
    #per_text{
        font-size: 16px;
        color: #666666;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    #per_text > span{
        width: 33.33%;
        text-align: left;
        margin-bottom: 20px;
    }
    #per_vipbg{
        width: 110px;
        margin: 0 auto;
        margin-left: 16px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 24px;
        background: url("../../../../assets/vipbg.png") center center;
        background-Repeat: "no-repeat";
        background-size: cover;
    }
    #per_vipbg_text{
        font-size: 14px; 
        font-weight: normal; 
        color: #CEA55C;
        margin-left: 8px;
    }
    #per_edit{
        height: 100%;
        margin: 20px 20px 0 0;
        font-size: 16px;
        color: #BD8325;
    }
    #per_edit:hover{
        cursor: pointer;
    }
    .el-menu-item{
        font-size: 16px;
        color: #000;
    }
    .menu_demo > .el-menu-item:hover{
		background: white !important;
		color: #BD8325 !important;
	}
    #per_operation{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>