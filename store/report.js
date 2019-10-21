export const state = () => ({
  visible: false
})

export const getters = {
  GET_VISIBLE: state => state.visible
}

export const mutations = {
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  }
}

export const actions = {}
