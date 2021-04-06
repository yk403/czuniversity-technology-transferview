<template>
<!-- 技术需求界面 -->
    <div style="padding:0">
        <Introduce/>
        <ScreenXq/>
    </div>
</template>

<script>
import Introduce from './assembly/BannerXq.vue'
import ScreenXq from './assembly/ScreenXq.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        ScreenXq,
        Introduce,
    }
}
</script>

<style>

</style>