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
      <form @submit.prevent="onLogin" v-loading="loading">
        <el-input v-model="email" placeholder="이메일" type="email" />
        <el-input v-model="password" placeholder="패스워드 (8 ~ 16자)" type="password" />
        <div style="display:flex; justify-content:space-between">
          <span @click="path = '비밀번호 찾기'" style="cursor:pointer">비밀번호 찾기</span>
          <span @click="path = '회원가입'" style="cursor:pointer">회원가입</span>
        </div>
        <el-button native-type="submit">로그인</el-button>
      </form>
    </template>
    <template v-else-if="path === '회원가입'">
      <form @submit.prevent="onSignup" v-loading="loading">
        <el-input v-model="displayName" placeholder="닉네임 (최대 9자)" />
        <el-input v-model="email" placeholder="이메일" type="email" />
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
      <form @submit.prevent="onSendResetEmail" v-loading="loading">
        <el-input v-model="email" placeholder="이메일" type="email" />
        <div style="cursor:pointer; text-align:right" @click="path ='로그인'">로그인</div>
        <el-button native-type="submit">메일 전송</el-button>
      </form>
    </template>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
export default {
  name: 'VueDialogAuth',
  data: _ => ({
    loading: false,
    email: '',
    password: '',
    path: '로그인',
    displayName: ''
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
      if (!this.email) return this.notifyWarning('이메일을 입력하세요.')
      if (!this.password) return this.notifyWarning('비밀번호를 입력해 주세요.')
      if (!isEmail(this.email))
        return this.notifyWarning('올바른 이메일을 입력해주세요.')
      if (!isLength(this.password, { min: 8, max: 16 }))
        return this.notifyWarning('비밀번호는 8 ~ 16자 사이로 입력해 주세요.')

      this.loading = true
      try {
        await this.$store.dispatch('auth/LOG_IN', {
          email: this.email,
          password: this.password
        })
        this.messageSuccess('로그인되었습니다.')
      } catch (err) {
        console.log(err)
        this.errorHandler(err.code)
      } finally {
        this.loading = false
      }
    },
    async onSignup() {
      if (!this.email) return this.notifyWarning('이메일을 입력하세요.')
      if (!this.password) return this.notifyWarning('비밀번호를 입력해 주세요.')
      if (!this.displayName)
        return this.notifyWarning('닉네임을 입력해 주세요.')
      if (!isEmail(this.email))
        return this.notifyWarning('올바른 이메일을 입력해주세요.')
      if (!isLength(this.password, { min: 8, max: 16 }))
        return this.notifyWarning('비밀번호는 8 ~ 16자 사이로 입력해 주세요.')
      if (!isLength(this.displayName, { max: 9 }))
        return this.notifyWarning('닉네임은 최대 9자로 지어주세요.')

      this.loading = true
      try {
        await this.$store.dispatch('auth/SIGN_UP', {
          email: this.email,
          password: this.password,
          displayName: this.displayName
        })
        this.messageSuccess('성공적으로 회원가입되었습니다.')
      } catch (err) {
        console.log(err)
        this.errorHandler(err.code)
      } finally {
        this.loading = false
      }
    },
    async onSendResetEmail() {
      if (!this.email) return
      if (!isEmail(this.email))
        return this.notifyWarning('올바른 이메일을 입력하세요.')

      this.loading = true
      try {
        await this.$store.dispatch('auth/SEND_RESET_EMAIL', this.email)
        this.notifySuccess('이메일을 전송했습니다. 확인바랍니다.')
      } catch (err) {
        console.log(err)
        this.errorHandler(err.code)
      } finally {
        this.loading = false
      }
    },
    errorHandler(code) {
      switch (code) {
        case 'auth/invalid-email':
          this.notifyInfo('유효하지 않은 이메일입니다.')
          break
        case 'auth/email-already-in-use':
          this.notifyInfo('이미 존재하는 이메일입니다.')
          break
        case 'auth/operation-not-allowed':
          this.notifyError()
          break
        case 'auth/weak-password':
          this.notifyWarning('너무 취약한 비밀번호입니다.')
          break
        case 'auth/provider-already-linked':
          this.notifyError()
          break
        case 'auth/operation-not-allowed':
          this.notifyError()
          break
        case 'auth/user-not-found':
          this.notifyInfo('존재하지 않는 계정입니다.')
          break
        case 'auth/user-disabled':
          this.notifyWarning(
            '해당 계정은 정지되었습니다. 자세한 사항은 고객센터로 문의바랍니다.'
          )
          break
        case 'auth/wrong-password':
          this.notifyWarning('아이디 혹은 비밀번호가 맞지 않습니다.')
          break
        case 'auth/user-token-expired':
          this.notifyError()
          break
        default:
          this.notifyError()
      }
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