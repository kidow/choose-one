export const state = () => ({
  visible: false,
  postId: '',
  post: {
    optionOne: '',
    optionTwo: '',
    title: '',
    tags: [],
    uid: '',
    createdAt: '',
    voteOne: 0,
    voteTwo: 0,
    likes: 0,
    nextId: 0,
    id: ''
  }
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  GET_POST: state => state.post
}

export const mutations = {
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_POST(state, post) {
    state.post = post
  }
}

export const actions = {
  ON_SNAPSHOT({ commit, state }, func) {
    // if (!func) return
    this.$firestore
      .collection('posts')
      .doc(state.post.id)
      .onSnapshot(doc => commit('SAVE_POST', doc.data()))
  }
}
