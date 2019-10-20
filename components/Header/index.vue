<template>
  <header>
    <span>Logo</span>
    <span @click="login">새 글 등록</span>
  </header>
</template>

<script>
export default {
  name: 'VueHeader',
  methods: {
    login() {
      this.$store.commit('auth/SAVE_VISIBLE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: $oc-gray-9;
  padding: 1rem 3rem;
  @include media('<phone') {
    padding: 1rem;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: $oc-gray-2;
    cursor: pointer;
  }
}
</style>