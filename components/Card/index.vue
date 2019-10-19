<template>
  <div
    class="card__container"
    :class="{ left: position === 'left', right: position === 'right' }"
  >card</div>
</template>

<script>
export default {
  name: 'VueCard',
  props: {
    position: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card__container {
  width: 460px;
  height: 260px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.95);
  }
  &.left {
    background: $oc-indigo-5;
  }
  &.right {
    background: $oc-red-5;
  }
}
</style>