<template>
<!-- 技术成果页面 -->
    <div style="padding:0">
        <Introduce/>
        <ScreenCg/>
    </div>
</template>

<script>
import ScreenCg from './assembly/ScreenCg.vue'
import Introduce from './assembly/BannerCg.vue'
export default {
    components:{
        ScreenCg,
        Introduce,
    }
}
</script>

<style>

</style>