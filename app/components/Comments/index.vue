<template>
  <div class="comments__container">
    <div
      class="comment__container"
      v-for="(comment, i) in comments"
      :key="i"
      :class="{ child: !!comment.parentId }"
    >
      <el-badge :value="comment.likes">
        <el-avatar
          shape="circle"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
      </el-badge>
      <div class="comment__info">
        <div class="info__name">{{ comment.displayName }}</div>
        <div class="info__timestamp">{{ $moment(comment.createdAt).format('YYYY-MM-DD hh:mm:ss') }}</div>
        <p class="info__content">{{ comment.content }}</p>
        <div class="info__actions">
          <span class="action" @click="addCommentStar(comment)">추천</span>
          <el-divider direction="vertical" />
          <span class="action" @click="openReply">답글</span>
          <template v-if="comment.userId === user.uid">
            <el-divider direction="vertical" />
            <span class="action" @click="openEdit(comment.id)">수정</span>
            <el-divider direction="vertical" />
            <span class="action" @click="onDelete(comment.id)">삭제</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueComments',
  computed: {
    ...mapGetters({
      comments: 'comment/GET_COMMENTS',
      user: 'auth/GET_USER',
      isLoggedIn: 'auth/IS_LOGGED_IN',
      post: 'post/GET_POST'
    })
  },
  methods: {
    async addCommentStar(comment) {
      if (!this.isLoggedIn) return this.$store.commit('auth/SAVE_VISIBLE', true)
      try {
        const likeSnapshot = await this.$firestore
          .collection('likes')
          .where('commentId', '==', comment.id)
          .where('userId', '==', this.user.uid)
          .get()

        if (likeSnapshot.empty) {
          await Promise.all([
            this.$firestore.collection('likes').add({
              commentId: comment.id,
              userId: this.user.uid
            }),
            this.$firestore
              .collection('comments')
              .doc(comment.id)
              .update({ likes: comment.likes + 1 })
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
              .collection('comments')
              .doc(comment.id)
              .update({ likes: comment.likes - 1 })
          ])

          this.messageSuccess('추천을 취소하였습니다.')
        }
        // onSnapshot
        await this.$store.dispatch('comment/ON_SNAPSHOT', this.post.id)
      } catch (err) {
        console.log(err)
      }
    },
    openReply(commentId) {
      if (!this.isLoggedIn) return this.$store.commit('auth/SAVE_VISIBLE', true)
      this.$store.commit('comment/SAVE_VISIBLE', true)
      this.$store.commit('comment/SAVE_COMMENT_ID', commentId)
      this.$store.commit('comment/SAVE_MODE', 3)
    },
    openEdit(commentId) {
      this.$store.commit('comment/SAVE_VISIBLE', true)
      this.$store.commit('comment/SAVE_COMMENT_ID', commentId)
      this.$store.commit('comment/SAVE_MODE', 2)
    },
    async onDelete(commentId) {
      try {
        await this.$firestore
          .collection('comments')
          .doc(commentId)
          .delete()

        // onSnapshot
        await this.$store.dispatch('comment/ON_SNAPSHOT', this.post.id)
        this.messageSuccess('삭제되었습니다.')
      } catch (err) {
        console.log(err)
        this.notifyError()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comments__container {
  @include media('<phone') {
    padding: 0 1rem;
  }
  margin-bottom: 4rem;
  .comment__container {
    display: flex;
    padding-bottom: 1rem;
    &.child {
      margin-left: 60px;
    }
    .comment__info {
      margin-left: 20px;
      .info__name {
        font-size: 15px;
        font-weight: bold;
      }
      .info__timestamp {
        font-size: 12px;
        font-weight: 400;
        margin: 3px 0 5px;
        color: $oc-gray-5;
      }
      .info__content {
        margin: 0;
        font-size: 12px;
      }
      .info__actions {
        display: flex;
        margin-top: 5px;
        .action {
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
}
</style>