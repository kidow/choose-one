<template>
  <el-dialog :title="title" :visible.sync="visible" :fullscreen="fullscreen">
    <slot />
  </el-dialog>
</template>

<script>
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