<template>
  <div class="banner__container">
    <span class="left">banner</span>
    <span class="right">
      <i class="el-icon-star-on" @click="addStar"></i>
      <i class="el-icon-caret-left" @click="prevQuestion"></i>
      <i class="el-icon-caret-right" @click="nextQuestion"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VueBanner',
  methods: {
    async addStar() {
      console.log('addStar')
    },
    async prevQuestion() {
      console.log('prevQuestion')
    },
    async nextQuestion() {
      console.log('nextQuestion')
    }
  }
}
</script>

<style lang="scss" scoped>
.banner__container {
  height: 40px;
  border-bottom: 1px solid $oc-gray-4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  .right {
    cursor: pointer;
    color: $oc-gray-6;
    i {
      font-size: 32px;
      &:hover {
        color: $oc-gray-7;
      }
    }
  }
}
</style>