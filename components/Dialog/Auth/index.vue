<template>
  <vue-dialog
    submitText="로그인"
    title="로그인"
    :visible="visible"
    @close="$store.commit('auth/SAVE_VISIBLE', false)"
    width="25%"
    :showFooter="false"
  >
    <vue-button type="facebook">페이스북으로 로그인</vue-button>
    <vue-button type="naver">네이버로 로그인</vue-button>
    <vue-button type="kakao">카카오로 로그인</vue-button>
    <div class="desc">
      <nuxt-link to="/terms" target="_blank">이용 약관</nuxt-link>과
      <nuxt-link to="/privacy" target="_blank">개인정보처리방침</nuxt-link>에 동의합니다.
    </div>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import VueButton from '~/components/Button'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogAuth',
  data: _ => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      visible: 'auth/GET_VISIBLE'
    })
  },
  components: {
    VueDialog,
    VueButton
  }
}
</script>

<style lang="scss" scoped>
.desc {
  text-align: center;
  margin-top: 1rem;
  word-break: keep-all;
  a {
    font-weight: bold;
    color: $oc-gray-8;
  }
}
</style>