<template>
  <a-layout class="mainPage layout">
    <header-nav></header-nav>
    <a-layout-content style="padding: 0 0px">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Caster Of Dice ©2020 Created by 乌尔古
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
export default {
  name: 'Main',
  components: {
    'headerNav': HeaderNav
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
