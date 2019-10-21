<template>
  <div
    class="button__container"
    :class="{ facebook: type === 'facebook', kakao: type === 'kakao', naver: type === 'naver' }"
  >
    <img :src="src" :alt="type" @click="$emit('login')" />
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'VueButton',
  props: {
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    src() {
      if (this.type === 'facebook') return '~/assets/icons/facebook.png'
      else if (this.type === 'naver') return '~/assets/icons/naver.png'
      else if (this.type === 'kakao') return '~/assets/icons/kakao.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.button__container {
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  padding: 8px;
  text-align: center;
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.95);
  }
  &.facebook {
    background: #3b5998;
    color: #f7f7f7;
  }
  &.naver {
    color: #f7f7f7;
    margin-top: 6px;
    background: #3eaf0e;
  }
  &.kakao {
    background: #ffcd00;
    margin-top: 6px;
    color: #1e1e1e;
  }
}
</style>