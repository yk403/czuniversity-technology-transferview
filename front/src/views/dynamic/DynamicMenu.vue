<template>
 <div>
    <el-submenu v-if="menu.meta.menuType === 0" :index="menu.name">
        <template slot="title">
            <i :class="menu.meta.icon"></i>
            <span>{{$i18n.locale === 'zh' ? menu.meta.name_zh : menu.meta.name_en}}</span>
        </template>
        <el-menu-item v-for="subMenu in menu.children" :key="subMenu.meta.menuId" :index="subMenu.name" @click="$router.push({ name: subMenu.name })">
            <i :class="subMenu.meta.icon"></i>
            <span slot="title">{{$i18n.locale === 'zh' ? subMenu.meta.name_zh : subMenu.meta.name_en}}</span>
        </el-menu-item>
    </el-submenu>
    <el-menu-item v-if="menu.meta.menuType === 1" :index="menu.name" @click="onclick()">
      <i :class="menu.meta.icon"></i>
      <span slot="title">{{$i18n.locale === 'zh' ? menu.meta.name_zh : menu.meta.name_en}}</span>
    </el-menu-item>
  </div>
</template>

<script>
    export default {
        name: 'DynamicMenu',
        props: {
            menu: {
                type: Object,
                required: true
            }
        },
      mounted() {
      },
      methods:{
          onclick(){
            //$router.push({ name: menu.name })
            console.log(this.menu.name,'menu');
            this.$router.push({ name: this.menu.children[0].name })
          }
      }
    }
</script>

<style>
</style>