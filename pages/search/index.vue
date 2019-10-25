<template>
  <el-row>
    <el-col :lg="3" :sm="2" :xs="0" style="min-height: 1px" />
    <el-col :lg="18" :sm="20" :xs="24">
      <div class="search__container">
        <el-input v-model="search" @keyup.enter="onSearch" suffix-icon="el-icon-search" />
      </div>
      <el-divider>
        <vue-count-to :endVal="results.length" :duration="1500" />개의 결과
      </el-divider>
      <div
        class="result"
        v-for="result in results"
        :key="result.id"
        @click="$router.push(`/post/${result.id}`)"
      >
        <div class="title">{{ result.title }}</div>
        <div class="desc">{{ result.description }}</div>
        <div class="meta">
          {{result.createdAt}}
          ·
          {{ result.votes }} 투표
        </div>
      </div>
    </el-col>
    <el-col :lg="3" :sm="2" :xs="0" />
  </el-row>
</template>

<script>
import VueCountTo from 'vue-count-to'
export default {
  async asyncData() {},
  data: _ => ({
    search: '',
    results: [
      {
        id: 1,
        title: 'Born This way',
        description:
          'Would you rather be born a dwarf or be born without ⅓ of your legs?',
        createdAt: '4 hours ago',
        votes: 1119
      }
    ]
  }),
  mounted() {
    this.search = this.$route.query.s
  },
  components: {
    VueCountTo
  },
  head() {
    return {
      title: '검색 | 츄즈원'
    }
  },
  methods: {
    async onSearch() {}
  }
}
</script>

<style lang="scss" scoped>
.search__container {
  padding: 1rem;
}
.result {
  padding: 15px 8px;
  border-bottom: 1px solid $oc-gray-4;
  cursor: pointer;
  &:hover {
    background: $oc-gray-1;
  }
  &:active {
    background: $oc-gray-2;
  }
  .title {
    font-size: 15px;
    margin-bottom: 2px;
    font-weight: bold;
    color: $oc-cyan-6;
  }
  .desc {
    font-size: 13px;
  }
  .meta {
    margin-top: 3px;
    color: $oc-gray-5;
    font-size: 11px;
  }
}
</style>