<template>
  <vue-post />
</template>

<script>
import VuePost from '~/components/Post'
import { mapGetters } from 'vuex'
export default {
  components: {
    VuePost
  },
  head() {
    return {
      title: '츄즈원'
    }
  },
  methods: {
    async get() {
      try {
        const snapshot = await this.$firebase
          .firestore()
          .collection('posts')
          .get()
        snapshot.forEach(doc => console.log('doc: ', doc))
        // console.log('snapshot: ', snapshot)
      } catch (err) {
        console.log(err)
      }
    }
  },
  data: _ => ({
    meta: {},
    title: '하나냐 여러개냐',
    completed: false,
    loading: false,
    index: 0,
    nextId: 0,
    author: 'kidow'
  }),
  mounted() {
    this.get()
  },
  async asyncData({ app }) {
    // try {
    //   const postsRef = await app.$firebase
    //     .firestore()
    //     .collection('posts')
    //     .doc()
    //   // console.log(postsRef)
    //   const postRef = postsRef.orderby('random')
    //   console.log(postsRef)
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
</script>
