<template>
  <div>
    <vue-header />
    <nuxt />
    <!-- <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
    <el-col :lg="18" :sm="20" :xs="24"></el-col>
    <el-col :lg="3" :sm="2" :xs="0" />-->
    <vue-dialog-auth />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueDialogAuth from '~/components/Dialog/Auth'
export default {
  components: {
    VueHeader,
    VueDialogAuth
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>