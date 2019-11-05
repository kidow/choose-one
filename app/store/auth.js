export const state = () => ({
  visible: false,
  user: {
    email: '',
    isAnonymous: false,
    displayName: '',
    uid: ''
  }
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  IS_LOGGED_IN: state => !!state.user.email,
  GET_USER: state => state.user,
  GET_USER_ID: state => state.user.uid
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
          commit('SAVE_USER', {
            email: user.email,
            isAnonymous: user.isAnonymous,
            displayName: user.displayName,
            uid: user.uid
          })
          resolve(user)
        } else resolve(false)
      })
    })
  },
  SIGN_UP({ dispatch, commit }, { email, password, displayName }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
        const user = this.$firebase.auth().currentUser
        await user.updateProfile({ displayName })
        await dispatch('LOG_IN', { email, password })
        await dispatch('ME')
        commit('SAVE_VISIBLE', false)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  LOG_OUT({ dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase.auth().signOut()
        await dispatch('SIGN_IN_ANONYMOUS')
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  LOG_IN({ dispatch, commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('ME')
        commit('SAVE_VISIBLE', false)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  },
  SEND_RESET_EMAIL(_, email) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase.auth().sendPasswordResetEmail(email)
        resolve(true)
      } catch (err) {
        reject(err)
      }
    })
  }
}
