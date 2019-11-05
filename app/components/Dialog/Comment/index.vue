<template>
  <vue-dialog
    title="댓글 등록"
    submitText="등록"
    :visible="visible"
    @close="$store.commit('comment/SAVE_VISIBLE', false)"
    @ok="createComment"
  >
    <el-input v-model="comment" placeholder="댓글 입력" v-loading="loading" />
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogComment',
  data: _ => ({
    comment: '',
    loading: false
  }),
  computed: {
    ...mapGetters({
      visible: 'comment/GET_VISIBLE',
      postId: 'comment/GET_POST_ID',
      user: 'auth/GET_USER'
    })
  },
  components: {
    VueDialog
  },
  methods: {
    async createComment() {
      if (!this.postId) return
      if (!this.comment) return this.notifyInfo('댓글을 입력해주세요.')
      this.loading = true
      let data = {
        postId: this.postId,
        content: this.comment,
        userId: this.user.uid,
        displayName: this.user.displayName,
        createdAt: new Date(),
        likes: 0,
        parentId: null
      }
      try {
        const { id } = await this.$firebase
          .firestore()
          .collection('comments')
          .add(data)
        data.id = id
        delete data.postId
        this.$store.commit('comment/SAVE_VISIBLE', false)
        this.$store.commit('comment/SAVE_COMMENTS', data)
        this.messageSuccess('성공적으로 작성되었습니다.')
      } catch (err) {
        console.log(err)
        this.notifyError()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>