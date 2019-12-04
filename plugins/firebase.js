import { auth } from '@/services/firebase'

export default ({ store }) => {
  return new Promise(resolve => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid
        }
        store.dispatch('chat/login', user.email)
        store.dispatch('auth/login', userData)
      }
      return resolve()
    })
  })
}
