export const state = () => ({
  visible: false,
  user: null
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  IS_LOGGED_IN: state => !!state.user.uid && !state.user.isAnonymous,
  IS_ANONYMOUS: state => state.user.isAnonymous
}

export const mutations = {
  SAVE_VISIBLE(state, visible) {
    state.visible = visible
  },
  SAVE_USER(state, user) {
    state.user = user
  }
}

export const actions = {
  SIGN_IN_ANONYMOUS({ dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase.auth().signInAnonymously()
        await dispatch('ME')
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  ME({ commit }) {
    return new Promise((resolve, reject) => {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('SAVE_USER', user)
          resolve(user)
        } else {
          resolve(false)
        }
      })
    })
  },
  SIGN_IN({ commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const credential = this.$firebase.auth.EmailAuthProvider.credential(
          email,
          password
        )
        const {
          user
        } = await this.$firebase
          .auth()
          .currentUser.linkAndRetrieveDataWithCredential(credential)
        console.log('cred: ', user)
        commit('SAVE_USER', user)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  }
}
