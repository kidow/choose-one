<template>
  <div>
    <vue-header />
    <div style="height: 80px" />
    <nuxt />
    <vue-dialog-auth />
    <vue-dialog-post />
    <vue-dialog-comment />
    <vue-dialog-report />
    <el-backtop />
  </div>
</template>

<script>
import VueHeader from '~/components/Header'
import VueDialogAuth from '~/components/Dialog/Auth'
import VueDialogPost from '~/components/Dialog/Post'
import VueDialogComment from '~/components/Dialog/Comment'
import VueDialogReport from '~/components/Dialog/Report'
export default {
  components: {
    VueHeader,
    VueDialogAuth,
    VueDialogPost,
    VueDialogComment,
    VueDialogReport
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>