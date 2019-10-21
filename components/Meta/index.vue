<template>
  <div class="meta__container">
    <div class="row">
      <i class="fas fa-poll"></i> 총 228 투표
    </div>
    <br />
    <div class="row">
      <i class="far fa-thumbs-up"></i> 228 공감
    </div>
    <br />
    <el-popover placement="right" trigger="click">
      <div class="row pointer" slot="reference">
        <i class="fas fa-link"></i> 공유
      </div>
      <div class="actions">
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-twitter-square"></i>
        <i class="fas fa-copy" @click="onCopy"></i>
      </div>
    </el-popover>
    <br />
    <div class="row pointer report" @click="$store.commit('report/SAVE_VISIBLE', true)">
      <i class="fas fa-bell"></i> 신고
    </div>
    <br />
    <div class="row">
      <i class="fas fa-tags"></i>
      <el-tag type="info" size="mini">category</el-tag>
      <el-tag type="info" size="mini">category2</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueMeta',
  methods: {
    async onCopy() {
      try {
        await this.$copyText('VueClipboard')
        this.notifySuccess('성공적으로 복사되었습니다.')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.meta__container {
  border-radius: 5px;
  padding: 10px 10px 15px;
  margin: 10px 10px 15px;
  background: $oc-gray-4;
  color: $oc-gray-7;
  .row {
    display: inline-block;
    &:hover {
      color: $oc-gray-8;
    }
    &.pointer {
      cursor: pointer;
    }
    &.report {
      &:hover {
        color: $oc-red-5;
      }
    }
  }
}
.actions {
  font-size: 28px;
  i {
    cursor: pointer;
    &:hover {
      filter: brightness(1.15);
    }
    &:active {
      filter: brightness(0.85);
    }
  }
  .fa-facebook-square {
    color: #3b5998;
  }
  .fa-twitter-square {
    color: #00acee;
  }
  .fa-copy {
    color: $oc-gray-7;
  }
}
</style>