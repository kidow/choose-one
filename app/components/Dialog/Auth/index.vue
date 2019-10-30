<template>
  <vue-dialog
    submitText="로그인"
    title="로그인"
    :visible="visible"
    @close="$store.commit('auth/SAVE_VISIBLE', false)"
    width="25%"
    :showFooter="false"
  >
    <div class="button__container facebook">
      <img src="~/assets/icons/facebook.png" alt="facebook" />
      <span>페이스북으로 로그인</span>
    </div>
    <div class="button__container naver">
      <img src="~/assets/icons/naver.png" alt="naver" />
      <span>네이버로 로그인</span>
    </div>
    <div class="button__container kakao">
      <img src="~/assets/icons/kakao.png" alt="kakao" />
      <span>카카오로 로그인</span>
    </div>
    <div class="desc">
      <nuxt-link to="/terms" target="_blank">이용 약관</nuxt-link>과
      <nuxt-link to="/privacy" target="_blank">개인정보처리방침</nuxt-link>에 동의합니다.
    </div>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
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
    VueDialog
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
.button__container {
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    filter: brightness(0.95);
  }
  &.facebook {
    border: 1px solid #3b5998;
    color: #3b5998;
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
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>