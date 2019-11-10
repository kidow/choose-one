<template>
  <vue-dialog
    :title="title"
    :submitText="submitText"
    :visible="visible"
    @close="$store.commit('comment/SAVE_VISIBLE', false)"
    @ok="selectMethod"
  >
    <el-input v-model="content" placeholder="댓글 입력" v-loading="loading" />
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogComment',
  data: _ => ({
    content: '',
    loading: false
  }),
  computed: {
    ...mapGetters({
      visible: 'comment/GET_VISIBLE',
      post: 'post/GET_POST',
      user: 'auth/GET_USER',
      commentId: 'comment/GET_COMMENT_ID',
      mode: 'comment/GET_MODE'
    }),
    title() {
      if (this.mode === 1) return '댓글 등록'
      else if (this.mode === 2) return '댓글 수정'
      else if (this.mode === 3) return '답글 등록'
      else return '댓글 등록'
    },
    submitText() {
      if (this.mode === 2) return '수정'
      else return '등록'
    }
  },
  components: {
    VueDialog
  },
  methods: {
    async createComment() {
      if (!this.post.id) return
      if (!this.content) return this.notifyInfo('댓글을 입력해주세요.')
      this.loading = true
      let data = {
        postId: this.post.id,
        content: this.content,
        userId: this.user.uid,
        displayName: this.user.displayName,
        createdAt: new Date(),
        likes: 0,
        parentId: ''
      }
      try {
        const { id } = await this.$firestore.collection('comments').add(data)
        // snapSHot
        this.$store.commit('comment/SAVE_VISIBLE', false)
        this.messageSuccess('성공적으로 작성되었습니다.')
      } catch (err) {
        console.log(err)
        this.notifyError()
      } finally {
        this.loading = false
      }
    },
    selectMethod() {
      if (this.mode === 2) this.updateComment()
      else if (this.mode === 3) this.addReply()
      else this.createComment()
    },
    async updateComment() {
      if (!this.post.id) return
      if (!this.content) return this.notifyWarning('댓글을 입력해주세요.')
      this.loading = true
      try {
        await this.$firestore
          .collection('comments')
          .doc(this.commentId)
          .update({
            content: this.content
          })
        this.messageSuccess('성공적으로 수정되었습니다.')
        this.content = ''
      } catch (err) {
        console.log(err)
        this.notifyError()
      } finally {
        this.loading = false
      }
    },
    async addReply() {
      if (!this.post.id || !this.commentId) return
      if (!this.content) return this.notifyWarning('댓글을 입력해주세요.')
      this.loading = true
      const data = {
        postId: this.post.id,
        content: this.content,
        userId: this.user.uid,
        displayName: this.user.displayName,
        createdAt: new Date(),
        likes: 0,
        parentId: this.commentId
      }
      try {
        await this.$firestore.collection('comments').add(data)

        // onSnapshot
        this.$store.dispatch('comment/ON_SNAPSHOT', this.post.id)

        this.messageSuccess('성공적으로 작성되었습니다.')
      } catch (err) {
        this.notifyError()
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>