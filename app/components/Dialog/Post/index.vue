<template>
  <vue-dialog
    title="새 주제"
    submitText="등록"
    :visible="visible"
    @close="$store.commit('post/SAVE_VISIBLE', false)"
    @ok="addPost"
  >
    <div v-loading="loading">
      <el-input placeholder="첫 번째 선택" v-model="optionOne" />
      <el-input placeholder="두 번째 선택" v-model="optionTwo" />
      <el-input placeholder="제목" v-model="title" />
      <el-input placeholder="카테고리" v-model="tags" />
    </div>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogPost',
  components: {
    VueDialog
  },
  computed: {
    ...mapGetters({
      visible: 'post/GET_VISIBLE',
      user: 'auth/GET_USER'
    })
  },
  data: _ => ({
    optionOne: '',
    optionTwo: '',
    tags: '',
    title: '',
    loading: false
  }),
  methods: {
    async addPost() {
      this.loading = true
      try {
        const { id } = await this.$firebase
          .firestore()
          .collection('posts')
          .add({
            optionOne: this.optionOne,
            optionTwo: this.optionTwo,
            title: this.title,
            tags: this.tags,
            uid: this.user.uid,
            createdAt: new Date(),
            voteOne: 0,
            voteTwo: 0,
            comments: [],
            votedUids: []
          })
        this.$store.commit('post/SAVE_VISIBLE', false)
        this.messageSuccess('성공적으로 만들었습니다.')
        this.$router.push(`/post/${id}`)
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