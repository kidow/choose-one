<template>
  <header>
    <span>Logo</span>
    <input v-model="search" placeholder="검색..." @keyup.enter="onSearch" />
    <el-dropdown v-if="isLoggedIn" @command="command">
      <i class="fas fa-user-circle"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">로그아웃</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span v-else @click="rightClick">새 주제</span>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueHeader',
  methods: {
    rightClick() {
      if (!this.isLoggedIn) return this.$store.commit('auth/SAVE_VISIBLE', true)
    },
    async logout() {
      console.log('logout')
    },
    command(item) {
      if (item === '1') this.logout()
    },
    onSearch() {
      if (this.search) this.$router.push(`/search?s=${this.search}`)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  data: _ => ({
    search: ''
  })
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 3;
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
  span,
  i {
    color: $oc-gray-2;
    cursor: pointer;
  }
  i {
    font-size: 36px;
  }
  input {
    background: transparent;
    border: 1px solid $oc-gray-7;
    color: $oc-gray-2;
    width: 180px;
    padding: 8px;
    border-radius: 4px;
    font-size: 1rem;
    &::placeholder {
      color: $oc-gray-2;
    }
  }
}
</style>