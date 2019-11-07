<template>
  <div
    class="card__container"
    @click="$emit('cardClick')"
    :class="{ left: position === 'left', right: position === 'right' }"
  >
    <div class="card__box">
      <div class="checkmark" v-if="completed">
        <vue-count-to :duration="3000" :endVal="leftPercentage" />
        <span>%</span>
      </div>
      <div class="total-votes" v-if="completed">
        <vue-count-to :duration="2500" :endVal="rightPercentage"></vue-count-to>
      </div>

      <span :style="`font-size: ${completed ? '16' : '22'}px`">{{ text }}</span>
    </div>
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
      default: ''
    },
    leftPercentage: {
      type: Number,
      default: 0
    },
    rightPercentage: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueCountTo
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
  justify-content: center;
  align-items: center;
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
  .card__box {
    text-align: center;
    padding: 30px;
    .checkmark {
      font-size: 60px;
      @include media('<phone') {
        font-size: 45px;
      }
    }
    .total-votes {
      font-size: 20px;
      margin: 3px 0 15px;
    }
  }
}
</style>