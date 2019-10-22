<template>
  <div
    class="card__container"
    @click="cardClick"
    :class="{ left: position === 'left', right: position === 'right' }"
  >
    <div class="checkmark">
      <vue-count-to v-if="completed" :duration="3000" :endVal="endVal" />%
    </div>

    <span :style="`font-size: ${completed ? '16' : '22'}px`">{{ text }}</span>
  </div>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  name: 'VueCard',
  props: {
    position: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Read Harry Potter'
    },
    endVal: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VueCountTo
  },
  methods: {
    cardClick() {
      if (this.completed) return
      this.$emit('cardClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.card__container {
  width: 460px;
  height: 260px;
  color: white;
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