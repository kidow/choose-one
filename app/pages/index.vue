<template>
  <el-row>
    <el-col class="choose__container">
      <vue-card position="left" @cardClick="cardClick(1)" :completed="completed" />
      <span class="or">
        <i class="el-icon-loading" v-if="loading && !completed"></i>
        <template v-else-if="!loading && !completed">또는</template>
        <i class="el-icon-back" v-else-if="index === 1"></i>
        <i class="el-icon-right" v-else-if="index === 2"></i>
      </span>
      <vue-card position="right" @cardClick="cardClick(2)" :completed="completed" />
    </el-col>
    <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
    <el-col :lg="18" :sm="20" :xs="24">
      <div class="banner__container">
        <span class="left">{{ title }}</span>
        <span class="right">
          <i class="el-icon-star-on" @click="addStar"></i>
          <i class="el-icon-caret-left" @click="$router.back()"></i>
          <i class="el-icon-caret-right" @click="$router.push(`/post/${nextId}`)"></i>
        </span>
      </div>
      <vue-meta />
      <div class="comments__length">
        <span class="length">{{ comments.length }} comments</span>
        <span class="button" @click="onComment">댓글 등록</span>
      </div>
      <vue-comments :comments="comments" />
    </el-col>
    <el-col :lg="3" :sm="2" :xs="0" />
  </el-row>
</template>

<script>
import VueCard from '~/components/Card'
import VueMeta from '~/components/Meta'
import VueComments from '~/components/Comments'
import { mapGetters } from 'vuex'
export default {
  components: {
    VueCard,
    VueMeta,
    VueComments
  },
  head() {
    return {
      title: '츄즈원'
    }
  },
  computed: {
    ...mapGetters({
      comments: 'comment/GET_COMMENTS',
      isLoggedIn: 'auth/IS_LOGGED_IN'
    })
  },
  methods: {
    onComment() {
      if (!this.isLoggedIn) return this.$store.commit('auth/SAVE_VISIBLE', true)
    },
    async addStar() {
      console.log('addStar')
    },
    async nextQuestion() {
      console.log('nextQuestion')
    },
    async cardClick(n) {
      if (this.completed) return
      this.completed = true
      this.loading = true
      this.index = n
    }
  },
  data: _ => ({
    meta: {},
    title: '하나냐 여러개냐',
    completed: false,
    loading: false,
    index: 0,
    nextId: 0
  }),
  async asyncData({ app }) {
    try {
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.choose__container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  @include media('<phone') {
    padding: 0;
  }
  position: relative;
  background: $oc-gray-9;
  .or {
    position: absolute;
    top: 37%;
    left: auto;
    right: auto;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $oc-gray-9;
    color: $oc-gray-4;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  i {
    font-size: 22px;
    font-weight: bold;
  }
}
.sub-banner {
  height: 40px;
  color: $oc-gray-4;
}
.comments__length {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 20px;
  border-top: 1px solid $oc-gray-4;
  border-bottom: 1px solid $oc-gray-4;
  @include media('<phone') {
    padding: 15px 1rem;
  }
  .button {
    cursor: pointer;
    color: $oc-gray-7;
  }
}
.banner__container {
  height: 40px;
  border-bottom: 1px solid $oc-gray-4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  .left {
    font-weight: bold;
  }
  .right {
    cursor: pointer;
    color: $oc-gray-6;
    i {
      font-size: 32px;
      &:hover {
        color: $oc-gray-7;
      }
    }
  }
}
</style>
