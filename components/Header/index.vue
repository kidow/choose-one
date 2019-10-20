<template>
  <header>
    <span>Logo</span>
    <span @click="$store.commit('SAVE_VISIBLE', true)">새 글 등록</span>
  </header>
</template>

<script>
export default {
  name: 'VueHeader'
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