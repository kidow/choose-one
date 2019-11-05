export default async ({ store }) => {
  try {
    const user = await store.dispatch('auth/ME')
    if (!user) await store.dispatch('auth/SIGN_IN_ANONYMOUS')
  } catch (err) {
    console.log(err)
  }
}
