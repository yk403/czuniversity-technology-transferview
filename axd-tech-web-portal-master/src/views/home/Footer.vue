<template>
	<el-footer style="height: 285px;width:100%;background-color: #3d444c; padding:0 40px;">
        <diV class="footer">
		<div class="footer_menu">
				<ul>
					<li>技术支持</li>
					<li>技术经纪人</li>
					<li>技术经理人</li>
				</ul>
				<ul>
					<li>技术服务</li>
					<li>技术招标</li>
					<li>技术拍卖</li>
					<li>技术挂牌</li>
				</ul>
				<ul>
					<li>双创路演</li>
					<li>预约报名</li>
					<li>路演安排</li>
				</ul>
				<ul>
					<li>关于我们</li>
				</ul>
				<ul>
					<li>联系我们</li>
				</ul>
			</div>
			<div class="footer_qrcode">
				<span
					><img
						style="width: 120px;height: 120px;"
						src="~@/assets/qrcode.png"
				/></span>
				<span
					><img
						style="width: 120px;height: 120px;"
						src="~@/assets/qrcode.png"
				/></span>
			</div>
        </diV>
		<diV class="border"></diV>
            <ul class="footnote">
                <li>Copyright©2007-2020</li>
                <li>常州大学研究院版权所有运营商</li>
                <li>苏ICP备999999999号-9</li>
                <li>苏公网安备99999999999999</li>
            </ul>
	</el-footer>
</template>

<script>
export default {}
</script>

<style scoped>
ul{
    list-style: none;
}
.footer {
	left: 0;
	bottom: 0;
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
    margin-top: 10px;
}
.border{
    border-bottom:1px solid #505050;
}
.footer_menu {
	display: flex;
	justify-content: space-between;
}
.footer_menu ul {
	list-style: none;
	margin-top: 24px;
    padding: 0;
}
.el-footer ul li {
	margin-bottom: 10px;
	text-align: left;
	font-size: 16px;
	color: #a7a7a7;
    margin-right: 80px;
}
.el-footer .footer_menu ul li:nth-child(1) {
	color: #ffffff;
	font-size: 24px;
}
.el-footer .footer_menu ul li:nth-child(2) {
	padding-top: 10px;
}
.footnote {
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin-top: 20px;
    align-items: baseline;
}
.el-footer {
	padding: 0;
}
</style>
