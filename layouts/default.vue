<template>
  <div>
    <vue-header />
    <nuxt />
    <!-- <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
      <el-col :lg="18" :sm="20" :xs="24">
      </el-col>
    <el-col :lg="3" :sm="2" :xs="0" />-->
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
export default {
  components: {
    VueHeader
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>