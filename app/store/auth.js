export const state = () => ({
  visible: false,
  user: {}
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  IS_LOGGED_IN: state => !!state.user.id
}

export const mutations = {
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_USER(state, user) {
    state.user = user
  }
}

export const actions = {}
