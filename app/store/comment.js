export const state = () => ({
  comments: [],
  visible: false,
  postId: ''
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

export const actions = {}
