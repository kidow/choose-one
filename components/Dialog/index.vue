<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :fullscreen="$device.isMobile"
    @close="$emit('close')"
  >
    <slot />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VueDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  }
}
</script>