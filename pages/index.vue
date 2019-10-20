<template>
  <el-row style="margin-top: 80px">
    <el-col class="choose__container">
      <vue-card position="left" />
      <span class="or">또는</span>
      <vue-card position="right" />
    </el-col>
    <div>
      <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
      <el-col :lg="18" :sm="20" :xs="24">
        <vue-banner />
        <vue-meta />
        <div class="comments__length">
          <span class="length">936 comments</span>
          <el-button>댓글 등록</el-button>
        </div>
        <vue-comments :comments="comments" />
      </el-col>
      <el-col :lg="3" :sm="2" :xs="0" />
    </div>
  </el-row>
</template>

<script>
import VueCard from '~/components/Card'
import VueBanner from '~/components/Banner'
import VueMeta from '~/components/Meta'
import VueComments from '~/components/Comments'
export default {
  components: {
    VueCard,
    VueBanner,
    VueMeta,
    VueComments
  },
  head() {
    return {
      title: 'TITLE'
    }
  },
  data: _ => ({
    comments: [
      {
        id: 1,
        parentId: null,
        likes: 11,
        imgUrl:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name: 'Kim',
        createdAt: new Date(),
        content:
          'i can still have a great personality without being funny....i can still be smart, opinionated, and good willed...i don'
      },
      {
        id: 2,
        parentId: 1,
        likes: 11,
        imgUrl: '',
        name: 'Arnold',
        createdAt: new Date(),
        content:
          "Man... I'm bored just reading your post.. maybe go for the funny part."
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.choose__container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  @include media('<phone') {
    padding: 0;
  }
  position: relative;
  background: $oc-gray-9;
  .or {
    position: absolute;
    top: 37%;
    left: 41%;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $oc-gray-9;
    color: $oc-gray-4;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
.sub-banner {
  height: 40px;
  color: $oc-gray-4;
}
.comments__length {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 20px;
  border-top: 1px solid $oc-gray-4;
  border-bottom: 1px solid $oc-gray-4;
  @include media('<phone') {
    padding: 15px 1rem;
  }
}
</style>
