<template>
  <a-layout class="mainPage layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          主页
        </a-menu-item>
        <a-menu-item key="2">
          人物系统
        </a-menu-item>
        <a-menu-item key="3">
          战局
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 0px">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Caster Of Dice ©2020 Created by 乌尔古
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'Main',
  components: {
  },
  data () {
    return {
      
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
<style type="text/css">

</style>
