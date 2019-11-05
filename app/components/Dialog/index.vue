<template>
  <el-dialog
    :title="title"
    :width="$device.isMobile ? '100%' : width"
    :visible.sync="visible"
    :before-close="_ => $emit('close')"
    :close-on-click-modal="false"
  >
    <slot />
    <span slot="footer" v-if="showFooter">
      <el-button size="medium" @click="$emit('close')">취소</el-button>
      <el-button size="medium" @click="$emit('ok')" type="primary">{{ submitText }}</el-button>
    </span>
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
    },
    submitText: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  }
}
</script>