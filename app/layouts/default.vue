<template>
  <div>
    <vue-header />
    <div style="height: 80px" />
    <nuxt />
    <vue-dialog-auth v-if="auth" />
    <vue-dialog-post v-if="post" />
    <vue-dialog-comment v-if="comment" />
    <vue-dialog-report v-if="report" />
    <el-backtop />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueDialogAuth from '~/components/Dialog/Auth'
import VueDialogPost from '~/components/Dialog/Post'
import VueDialogComment from '~/components/Dialog/Comment'
import VueDialogReport from '~/components/Dialog/Report'
import { mapGetters } from 'vuex'
export default {
  components: {
    VueHeader,
    VueDialogAuth,
    VueDialogPost,
    VueDialogComment,
    VueDialogReport
  },
  computed: {
    ...mapGetters({
      auth: 'auth/GET_VISIBLE',
      post: 'post/GET_VISIBLE',
      comment: 'comment/GET_VISIBLE',
      report: 'report/GET_VISIBLE'
    })
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>