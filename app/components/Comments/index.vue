<template>
  <div class="comments__container">
    <div
      class="comment__container"
      v-for="comment in comments"
      :key="comment.id"
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
        <div class="info__timestamp">{{ $moment(comment.createdAt).fromNow() }}</div>
        <p class="info__content">{{ comment.content }}</p>
        <div class="info__actions">
          <span class="action">추천</span>
          <el-divider direction="vertical" />
          <span class="action">답글</span>
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
      comments: 'comment/GET_COMMENTS'
    })
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