<template>
  <header>
    <span>Logo</span>
    <span>Menu</span>
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
  background: $oc-gray-8;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>