export const state = () => ({
  visible: false,
  postId: ''
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  GET_POST_ID: state => state.postId
}

export const mutations = {
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_POST_ID(state, postId) {
    state.postId = postId
  }
}

export const actions = {}
