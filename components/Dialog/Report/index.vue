<template>
  <vue-dialog
    title="신고"
    @ok="submitReport"
    submitText="보내기"
    :visible="visible"
    @close="$store.commit('report/SAVE_VISIBLE', false)"
  >report</vue-dialog>
</template>

<script>
import VueDialog from '~/components/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialogReport',
  components: {
    VueDialog
  },
  computed: {
    ...mapGetters({
      visible: 'report/GET_VISIBLE'
    })
  },
  data: _ => ({
    category: '',
    description: '',
    loading: false
  }),
  methods: {
    async submitReport() {
      console.log('submitReport')
      this.notifySuccess('감사합니다!')
      this.$store.commit('report/SAVE_VISIBLE', false)
    }
  }
}
</script>