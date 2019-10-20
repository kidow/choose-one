<template>
  <vue-dialog title="로그인" :visible="visible">
    <span>login</span>
  </vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogAuth',
  data: _ => ({
    loading: false
  }),
  computed: {
    ...mapGetters({
      visible: 'auth/GET_VISIBLE'
    })
  },
  components: {
    VueDialog
  }
}
</script>