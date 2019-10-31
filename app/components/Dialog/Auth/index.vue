<template>
  <vue-dialog
    submitText="로그인"
    :title="path"
    :visible="visible"
    @close="$store.commit('auth/SAVE_VISIBLE', false)"
    width="30%"
    :showFooter="false"
  >
    <!-- <div class="button__container facebook">
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
    </div>-->
    <template v-if="path === '로그인'">
      <form @submit.prevent="onLogin">
        <el-input v-model="email" placeholder="이메일" />
        <el-input v-model="password" placeholder="패스워드 (8 ~ 16자)" type="password" />
        <div style="display:flex; justify-content:space-between">
          <span @click="path = '비밀번호 찾기'" style="cursor:pointer">비밀번호 찾기</span>
          <span @click="path = '회원가입'" style="cursor:pointer">회원가입</span>
        </div>
        <el-button native-type="submit">로그인</el-button>
      </form>
    </template>
    <template v-else-if="path === '회원가입'">
      <form @submit.prevent="onSignup">
        <el-input v-model="email" placeholder="이메일" />
        <el-input v-model="password" placeholder="패스워드 (8 ~ 16자)" type="password" />
        <div style="text-align:right; cursor:pointer" @click="path = '로그인'">로그인</div>
        <el-button native-type="submit">회원가입</el-button>
      </form>
      <el-divider />
      <div class="desc">
        <nuxt-link to="/terms" target="_blank">이용약관</nuxt-link>과
        <nuxt-link to="/privacy" target="_blank">개인정보처리방침</nuxt-link>에 동의합니다.
      </div>
    </template>
    <template v-else-if="path === '비밀번호 찾기'">
      <form @submit.prevent="onSendEmail">
        <el-input v-model="email" placeholder="이메일" />
        <div style="cursor:pointer; text-align:right" @click="path ='로그인'">로그인</div>
        <el-button native-type="submit">메일 전송</el-button>
      </form>
    </template>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogAuth',
  data: _ => ({
    loading: false,
    email: '',
    password: '',
    path: '로그인'
  }),
  computed: {
    ...mapGetters({
      visible: 'auth/GET_VISIBLE'
    })
  },
  components: {
    VueDialog
  },
  methods: {
    async onLogin() {
      console.log('onLogin')
    },
    async onSignup() {
      console.log('onSignup')
    },
    async onSendEmail() {
      console.log('onSendEmail')
    }
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