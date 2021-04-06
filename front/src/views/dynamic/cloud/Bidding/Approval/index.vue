<template>
    <!-- 审批管理 -->
  <div class="classification">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审批" name="first" >
            <Approval ref="Approval1" :type1="type1"/>
        </el-tab-pane>
        <el-tab-pane label="整改" name="second">
          <Approval ref="Approval2" :type1="type1"/>
        </el-tab-pane>
        <el-tab-pane label="通过" name="third">
          <Approval ref="Approval3" :type1="type1"/>
        </el-tab-pane>
        <el-tab-pane label="拒绝" name="forth">
          <Approval ref="Approval4" :type1="type1"/>
        </el-tab-pane>
    </el-tabs>       
  </div>
</template>

<script>
import Approval from './approval'
export default {
    components:{
        Approval
    },
    data() {
    return {
      type1: 1,
      activeName: 'first',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.index === "0") {
        //网络请求1
        this.type1= 1;
        this.$refs.Approval1.typeClick(this.type1)
      } else if (tab.index === "1") {
        //网络请求2
        this.type1= 3;
        this.$refs.Approval2.typeClick(this.type1)
      } else if (tab.index === "2"){
        //网络请求3
        this.type1= 2;
        this.$refs.Approval3.typeClick(this.type1)
      }else{
        this.type1= 4;
        this.$refs.Approval4.typeClick(this.type1)
      }
    },
  }
};
</script>

<style scoped>
  .classification{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .el-tabs__header{
    padding-left: 20px;
    margin: 0;
  }
  /* 选中的背景色 */
  .classification /deep/.el-tabs__item.is-active{
      color: #bb7732;
  }
  /* 禁用 技术采集*/
  .classification /deep/.el-tabs__item.is-disabled{
    color: black;
  }
  .classification /deep/.el-tabs__nav-wrap::after{
    height: 0;
  }
  /*去除底部蓝线*/
  .classification /deep/.el-tabs__active-bar{
    background-color: #bb7732;
  }
.classification /deep/ .el-tabs__item{
  color: #000000;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
}
</style>