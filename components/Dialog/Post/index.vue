<template>
  <vue-dialog
    title="새 글"
    submitText="등록"
    :visible="visible"
    @close="$store.commit('post/SAVE_VISIBLE', false)"
  >
    <el-input placeholder="첫 번째 선택" v-model="optionOne" />
    <el-input placeholder="두 번째 선택" v-model="optionTwo" />
    <el-input placeholder="카테고리" v-model="tags" />
    <span slot="footer">
      <el-button @click="$store.commit('post/SAVE_VISIBLE', false)">취소</el-button>
      <el-button type="primary">등록</el-button>
    </span>
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
      visible: 'post/GET_VISIBLE'
    })
  },
  data: _ => ({
    optionOne: '',
    optionTwo: '',
    tags: '',
    loading: false
  }),
  methods: {
    async addPost() {
      console.log('addPost')
      this.$store.commit('post/SAVE_VISIBLE', false)
    }
  }
}
</script>