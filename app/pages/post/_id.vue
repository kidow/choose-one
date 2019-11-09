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
      title: `${this.post.title} | 츄즈원`
    }
  },
  async asyncData({ app, params, store }) {
    try {
      const postRef = await app.$firestore
        .collection('posts')
        .doc(params.id)
        .get()
      const post = postRef.data()
      store.commit('post/SAVE_POST', post)
      const commentsRef = await app.$firestore
        .collection('comments')
        .where('postId', '==', params.id)
        .get()

      let comments = []
      commentsRef.forEach(doc => {
        const r = doc.data()
        const item = { ...r }
        item.createdAt = r.createdAt.toDate()
        comments.push(item)
      })
      store.commit('post/SAVE_POST_ID', params.id)
      store.commit('comment/SAVE_COMMENTS', comments)
      return {}
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    this.$store.dispatch('post/ON_SNAPSHOT')
    // this.$store.dispatch('comment/ON_SNAPSHOT')
  },
  computed: {
    ...mapGetters({
      post: 'post/GET_POST'
    })
  }
}
</script>
