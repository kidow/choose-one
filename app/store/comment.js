export const state = () => ({
  comments: [],
  visible: false
})

export const getters = {
  GET_COMMENTS: state => state.comments,
  GET_VISIBLE: state => state.visible
}

export const mutations = {
  SAVE_COMMENTS(state, comments) {
    state.comments = [...state.comments, ...comments]
  },
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  }
}

export const actions = {
  ON_SNAPSHOT({ commit, rootState }) {
    const { postId } = rootState.post
    this.$firestore
      .collection('comments')
      .where('postId', '==', postId)
      .onSnapshot(querySnapshot => {
        let comments = []
        querySnapshot.forEach(doc => {
          const r = doc.data()
          const item = { ...r }
          item.createdAt = r.createdAt.toDate()
          comments.push(item)
        })
        commit('SAVE_COMMENTS', comments)
      })
  }
}
