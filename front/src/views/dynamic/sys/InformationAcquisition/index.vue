<template>
    <!-- 审批管理 -->
  <div class="classification">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="技术需求" name="first" >
            <CollectionXq/>
        </el-tab-pane>
        <el-tab-pane label="技术成果" name="second">
            <CollectionCg/>
        </el-tab-pane>
    </el-tabs>       
  </div>
</template>

<script>
import CollectionXq from './collectionXq'
import CollectionCg from './collectionCg'
export default {
    components:{
        CollectionXq,
        CollectionCg
    },
    data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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