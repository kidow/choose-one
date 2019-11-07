<template>
  <vue-post
    :title="title"
    :optionOne="optionOne"
    :optionTwo="optionTwo"
    :nextId="nextId"
    :voteOne="voteOne"
    :voteTwo="voteTwo"
    @voteCount="voteCount"
  />
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
      title: `${this.title} | 츄즈원`
    }
  },
  data: _ => ({
    meta: {},
    title: '하나냐 여러개냐',
    completed: false,
    loading: false,
    index: 0,
    nextId: 0,
    optionOne: '',
    optionTwo: '',
    voteOne: 0,
    voteTwo: 0
  }),
  async asyncData({ app, params, store }) {
    try {
      const postRef = await app.$firebase
        .firestore()
        .collection('posts')
        .doc(params.id)
        .get()
      const post = postRef.data()
      const commentsRef = await app.$firebase
        .firestore()
        .collection('comments')
        .where('postId', '==', params.id)
        .get()

      let comments = []
      commentsRef.forEach(doc => {
        const r = doc.data()
        const item = Object.assign(r)
        item.createdAt = r.createdAt.toDate()
        comments.push(item)
      })
      store.commit('post/SAVE_POST_ID', params.id)
      store.commit('comment/SAVE_COMMENTS', comments)
      return {
        title: post.title,
        optionOne: post.optionOne,
        optionTwo: post.optionTwo,
        voteOne: post.voteOne,
        voteTwo: post.voteTwo
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    voteCount(position) {
      if (position === 1) voteOne += 1
      else if (position === 2) voteTwo += 1
    }
  }
}
</script>
