<template>
  <vue-post :title="title" :optionOne="optionOne" :optionTwo="optionTwo" :nextId="nextId" />
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
  mounted() {
    // this.get()
  },
  data: _ => ({
    meta: {},
    title: '하나냐 여러개냐',
    completed: false,
    loading: false,
    index: 0,
    nextId: 0,
    optionOne: '',
    optionTwo: ''
  }),
  async asyncData({ app, params, store }) {
    try {
      const postRef = await app.$firebase
        .firestore()
        .collection('posts')
        .doc(params.id)
        .get()
      const post = postRef.data()
      // console.log('post: ', post)
      const querySnapshot = await app.$firebase
        .firestore()
        .collection('comments')
        .where('postId', '==', post.uid)
        .get()

      const comments = querySnapshot.data()
      console.log('comments: ', comments)
      store.commit('comment/SAVE_POST_ID', params.id)
      // store.commit('comment/SAVE_COMMENTS', comments)
      return {
        title: post.title,
        optionOne: post.optionOne,
        optionTwo: post.optionTwo
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
