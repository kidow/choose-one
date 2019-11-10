export const state = () => ({
  comments: [],
  visible: false,
  mode: 1, // 1은 추가, 2는 수정, 3은 댓글
  commentId: ''
})

export const getters = {
  GET_COMMENTS: state => state.comments,
  GET_VISIBLE: state => state.visible,
  GET_MODE: state => state.mode,
  GET_COMMENT_ID: state => state.commentId
}

export const mutations = {
  SAVE_COMMENTS(state, comments) {
    state.comments = comments
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
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firestore
          .collection('comments')
          .where('postId', '==', postId)
          // .orderBy('createdAt', 'asc') // 오더바이 꼭되야함
          .onSnapshot(querySnapshot => {
            let comments = []
            querySnapshot.forEach(doc => {
              const r = doc.data()
              const item = { ...r, id: doc.id }
              item.createdAt = r.createdAt.toDate()
              comments.push(item)
            })
            commit('SAVE_COMMENTS', comments)
            resolve(true)
          })
      } catch (err) {
        reject(err)
      }
    })
  }
}
