<template>
  <vue-dialog
    title="댓글 등록"
    submitText="등록"
    :visible="visible"
    @close="$store.commit('comment/SAVE_VISIBLE', false)"
  >asd</vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogComment',
  data: _ => ({
    comment: ''
  }),
  computed: {
    ...mapGetters({
      visible: 'comment/GET_VISIBLE'
    })
  },
  components: {
    VueDialog
  }
}
</script>