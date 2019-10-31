export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      const user = await dispatch('auth/ME')
      if (!user) await dispatch('auth/SIGN_IN_ANONYMOUS')
    } catch (err) {
      console.log('nuxtServerInit err: ', err)
    }
  }
}
