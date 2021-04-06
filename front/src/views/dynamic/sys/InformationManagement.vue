<template>
  <div class="classification">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="技术需求" name="second">
          <TechnologyCategory/>
        </el-tab-pane>
        <el-tab-pane label="技术成果" name="third">
          <TechnologyAchievementForm/>
        </el-tab-pane>
    </el-tabs>       
  </div>
</template>

<script>
import TechnologyCategory from './TechnicalRequirements/TechnologyCategory'
import TechnologyAchievementForm from './TechnologicalAchievements/TechnologyAchievementForm'
export default {
  data() {
    return {
      activeName: 'second',
    }
  },
  components:{
    // 引入标签
    TechnologyCategory,
     //引入技术成果
     TechnologyAchievementForm,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
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
  font-weight:bold;
  font-size: 14px;
}
</style>