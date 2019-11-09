<template>
  <el-row>
    <el-col class="choose__container">
      <vue-card
        :text="post.optionOne"
        position="left"
        @cardClick="cardClick(1)"
        :completed="completed"
        :totalVote="post.voteOne"
        :percent="leftPercent"
      />
      <span class="or">
        <i class="el-icon-loading" v-if="loading && !completed"></i>
        <template v-else-if="!loading && !completed">또는</template>
        <i class="el-icon-back" v-else-if="index === 1"></i>
        <i class="el-icon-right" v-else-if="index === 2"></i>
      </span>
      <vue-card
        :text="post.optionTwo"
        position="right"
        @cardClick="cardClick(2)"
        :completed="completed"
        :totalVote="post.voteTwo"
        :percent="rightPercent"
      />
    </el-col>
    <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
    <el-col :lg="18" :sm="20" :xs="24">
      <div class="banner__container">
        <span class="left">{{ post.title }}</span>
        <span class="right">
          <i class="el-icon-star-on" @click="addStar"></i>
          <i class="el-icon-caret-left" @click="$router.back()"></i>
          <i class="el-icon-caret-right" @click="$router.push(`/post/${post.nextId}`)"></i>
        </span>
      </div>
      <vue-meta />
      <div class="comments__length">
        <span class="length">{{ comments.length }} 개의 댓글</span>
        <span class="button" @click="createComment">댓글 등록</span>
      </div>
      <vue-comments />
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
  name: 'VuePost',
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/IS_LOGGED_IN',
      postId: 'post/GET_POST_ID',
      comments: 'comment/GET_COMMENTS',
      post: 'post/GET_POST',
      user: 'auth/GET_USER'
    }),
    leftPercent() {
      const { voteOne, voteTwo } = this.post
      return Math.floor((voteOne / (voteOne + voteTwo)) * 100)
    },
    rightPercent() {
      return 100 - this.leftPercent
    }
  },
  components: {
    VueCard,
    VueMeta,
    VueComments
  },
  data: _ => ({
    loading: false,
    completed: false,
    index: 0
  }),
  methods: {
    async cardClick(position) {
      let options = {}
      if (position === 1) options.voteOne = this.post.voteOne + 1
      else if (position === 2) options.voteTwo = this.post.voteTwo + 1
      if (this.completed) return
      this.loading = true
      try {
        await this.$firestore
          .collection('posts')
          .doc(this.postId)
          .update(options)
        this.completed = true
      } catch (err) {
        console.log(err)
        this.notifyError()
      } finally {
        this.loading = false
      }
    },
    async addStar() {
      if (!this.isLoggedIn) return this.$store.commit('auth/SAVE_VISIBLE', true)
      try {
        const likeSnapshot = await this.$firestore
          .collection('likes')
          .where('postId', '==', this.postId)
          .where('userId', '==', this.user.uid)
          .get()

        if (likeSnapshot.empty) {
          await Promise.all([
            this.$firestore.collection('likes').add({
              postId: this.postId,
              userId: this.user.uid
            }),
            this.$firestore
              .collection('posts')
              .doc(this.postId)
              .update({ likes: this.post.likes + 1 })
          ])
          this.messageSuccess('추천하였습니다.')
        } else {
          const { id } = likeSnapshot.docs[0]
          await Promise.all([
            this.$firestore
              .collection('likes')
              .doc(id)
              .delete(),
            this.$firestore
              .collection('posts')
              .doc(this.postId)
              .update({ likes: this.post.likes - 1 })
          ])
          this.messageSuccess('추천을 취소하였습니다.')
        }
      } catch (err) {
        console.log(err)
      }
    },
    createComment() {
      if (!this.isLoggedIn) this.$store.commit('auth/SAVE_VISIBLE', true)
      else this.$store.commit('comment/SAVE_VISIBLE', true)
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