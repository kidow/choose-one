export const state = () => ({
  comments: [],
  visible: false,
  mode: 1, // 1은 추가, 2는 수정, 3은 댓글
  commentId: ''
})

export const getters = {
  GET_COMMENTS: state => state.comments,
  GET_VISIBLE: state => state.visible,
  GET_MODE: state => state.mode
}

export const mutations = {
  SAVE_COMMENTS(state, comments) {
    state.comments = [...state.comments, ...comments]
  },
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_MODE(state, mode) {
    state.mode = mode
  },
  SAVE_COMMENT_ID(state, commentId) {
    state.commentId = commentId
  }
}

export const actions = {
  ON_SNAPSHOT({ commit }, postId) {
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
