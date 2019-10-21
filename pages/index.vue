<template>
  <el-row>
    <el-col class="choose__container">
      <vue-card position="left" />
      <span class="or">또는</span>
      <vue-card position="right" />
    </el-col>
    <div>
      <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
      <el-col :lg="18" :sm="20" :xs="24">
        <vue-banner />
        <vue-meta />
        <div class="comments__length">
          <span class="length">{{ comments.length }} comments</span>
          <span class="button" @click="onComment">댓글 등록</span>
        </div>
        <vue-comments :comments="comments" />
      </el-col>
      <el-col :lg="3" :sm="2" :xs="0" />
    </div>
  </el-row>
</template>

<script>
import VueCard from '~/components/Card'
import VueBanner from '~/components/Banner'
import VueMeta from '~/components/Meta'
import VueComments from '~/components/Comments'
import { mapGetters } from 'vuex'
export default {
  components: {
    VueCard,
    VueBanner,
    VueMeta,
    VueComments
  },
  head() {
    return {
      title: 'TITLE'
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
</style>
