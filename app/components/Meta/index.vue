<template>
  <div class="meta__container">
    <div class="row">
      <i class="fas fa-poll"></i>
      총 {{ this.post.voteOne + this.post.voteTwo }} 투표
    </div>
    <br />
    <div class="row">
      <i class="far fa-thumbs-up"></i>
      {{ this.post.likes }} 추천
    </div>
    <br />
    <el-popover placement="right" trigger="click">
      <div class="row pointer" slot="reference">
        <i class="fas fa-link"></i> 공유
      </div>
      <div class="actions">
        <img src="~/assets/icons/facebook.png" @click="shareFacebook" alt="facebook" />
        <img src="~/assets/icons/twitter.png" @click="shareTwitter" alt="twitter" />
        <!-- <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>-->
        <i class="fas fa-copy" @click="onCopy"></i>
      </div>
    </el-popover>
    <br />
    <div class="row pointer report" @click="onReport">
      <i class="fas fa-bell"></i> 신고
    </div>
    <br />
    <div class="row">
      <i class="fas fa-tags"></i>
      <el-tag
        v-for="(tag, i) in tags"
        :key="i"
        @click="$router.push(`/tags/${tag}`)"
        type="info"
        size="mini"
        style="margin-right: 4px"
      >{{ tag }}</el-tag>
    </div>
  </div>
</template> 

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueMeta',
  methods: {
    async onCopy() {
      try {
        this.$copyText(location.href)
        this.notifySuccess('성공적으로 복사되었습니다.')
      } catch (err) {
        console.log(err)
      }
    },
    onReport() {
      if (!this.isLoggedIn) this.$store.commit('auth/SAVE_VISIBLE', true)
      else this.$store.commit('report/SAVE_VISIBLE', true)
    },
    shareFacebook() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      const url = `http://www.facebook.com/sharer/sharer.php?u=${location.href}`
      window.open(url, 'share', 'menubar=1, resizable=1, width=800, height=500')
    },
    shareTwitter() {
      const { BASE_URL } = process.env
      const { path } = this.$route
      const url = `https://twitter.com/intent/tweet?text=TEXT&url=${location.href}`
      window.open(url, 'share', 'menubar=1, resizable=1, width=800, height=500')
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      post: 'post/GET_POST'
    })
  },
  data: _ => ({
    tags: ['category', 'category2']
  })
}
</script>

<style lang="scss" scoped>
.meta__container {
  border-radius: 5px;
  padding: 10px 10px 15px;
  margin: 10px 10px 15px;
  background: $oc-gray-4;
  color: $oc-gray-7;
  .row {
    display: inline-block;
    &:hover {
      color: $oc-gray-8;
    }
    &.pointer {
      cursor: pointer;
    }
    &.report {
      &:hover {
        color: $oc-red-5;
      }
    }
  }
}
.actions {
  font-size: 28px;
  i {
    cursor: pointer;
    &:hover {
      filter: brightness(1.15);
    }
    &:active {
      filter: brightness(0.85);
    }
  }
  img {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
  .fa-facebook-square {
    color: #3b5998;
  }
  .fa-twitter-square {
    color: #00acee;
  }
  .fa-copy {
    color: $oc-gray-7;
  }
}
</style>