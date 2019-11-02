export const state = () => ({
  visible: false,
  user: {
    email: '',
    isAnonymous: false
  }
})

export const getters = {
  GET_VISIBLE: state => state.visible,
  IS_LOGGED_IN: state => !!state.user.email
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
      const user = this.$firebase.auth().currentUser
      if (user) {
        commit('SAVE_USER', {
          email: user.email,
          isAnonymous: user.isAnonymous,
          displayName: user.displayName
        })
        resolve(user)
      } else {
        resolve(false)
      }
      // this.$firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     commit('SAVE_USER', {
      //       email: user.email,
      //       isAnonymous: user.isAnonymous,
      //       displayName: user.displayName
      //     })
      //     resolve(true)
      //   } else {
      //     resolve(false)
      //   }
      // })
    })
  },
  SIGN_UP({ commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      await this.$firebase.auth().signOut()
      console.log(this.$firebase.auth().currentUser)
      // try {
      //   await this.$firebase.auth().signOut()
      //   const {
      //     user
      //   } = await this.$firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(email, password)
      //   console.log('user: ', user)
      //   const newUser = {
      //     email: user.email,
      //     isAnonymous: false
      //     // displayName: user.displayName
      //   }
      //   commit('SAVE_USER', newUser)
      //   resolve(true)
      // } catch (err) {
      //   reject(err)
      // }
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
  LOG_IN({ dispatch }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('ME')
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
