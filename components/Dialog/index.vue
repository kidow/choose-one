<template>
  <el-dialog :title="title">
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
    }
  }
}
</script>