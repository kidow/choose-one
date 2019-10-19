<template>
  <el-row style="margin-top: 80px">
    <el-col class="choose__container">
      <vue-card position="left" />
      <span class="or">또는</span>
      <vue-card position="right" />
    </el-col>
    <div class="sub-banner">banner</div>
  </el-row>
</template>

<script>
import VueCard from '~/components/Card'
export default {
  components: {
    VueCard
  }
}
</script>

<style lang="scss" scoped>
.choose__container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  @include media('<phone') {
    padding: 0;
  }
  position: relative;
  background: $oc-gray-9;
  .or {
    position: absolute;
    top: 37%;
    left: 41%;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $oc-gray-9;
    color: $oc-gray-4;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
.sub-banner {
  height: 40px;
  color: $oc-gray-4;
}
</style>
