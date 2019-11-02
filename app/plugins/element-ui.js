import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'

export default () => {
  Vue.use(Element, { locale }),
    Vue.mixin({
      methods: {
        notifySuccess(message) {
          this.$notify({
            type: 'success',
            title: '성공',
            message,
            duration: 3000
          })
        },
        notifyError(message) {
          this.$notify({
            type: 'error',
            title: '죄송합니다.',
            message:
              message || '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
            duration: 3000
          })
        },
        notifyWarning(message) {
          this.$notify({
            type: 'warning',
            title: '주의',
            message,
            duration: 3000
          })
        },
        notifyInfo(message) {
          this.$notify({
            type: 'info',
            title: '정보',
            message,
            duration: 3000
          })
        },
        messageSuccess(message) {
          this.$message({
            type: 'success',
            message: message || '성공적으로 등록되었습니다',
            duration: 3000
          })
        },
        messageWarning(message) {
          this.$message({
            type: 'warning',
            message,
            duration: 3000
          })
        },
        messageInfo(message) {
          this.$message({
            type: 'info',
            message,
            duration: 3000
          })
        }
      }
    })
}
