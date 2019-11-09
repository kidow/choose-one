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
      <el-input placeholder="해시태그" v-model="tags" />
      <el-alert title="모든 주제는 검수되며, 불건전하거나 자극적인 주제는 자제 부탁드립니다." type="warning" effect="dark" show-icon :closable="false" />
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
        const { id } = await this.$firestore.collection('posts').add({
          optionOne: this.optionOne,
          optionTwo: this.optionTwo,
          title: this.title,
          tags: this.tags,
          uid: this.user.uid,
          createdAt: new Date(),
          voteOne: 0,
          voteTwo: 0,
          likes: 0
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