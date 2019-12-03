import app from '@/services/firebase'

export default ({ store }) => {
  return new Promise((resolve, reject) => {
    app.auth().onAuthStateChanged(user => {
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
      // eslint-disable-next-line prefer-promise-reject-errors
      return resolve()
    })
  })
}

// import firebase, { auth } from 'firebase'
//
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DB_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   appId: process.env.FIREBASE_APP_ID
// }
//
// if (firebase.apps.length) firebase.app()
// else firebase.initializeApp(firebaseConfig)
//
// export default ({ store, redirect }) => {
//   auth().onAuthStateChanged((user) => {
//     if (user) {
//       store.commit('auth/setUser', { uid: user.uid, email: user.email })
//       store.dispatch('chat/login', user.email)
//       redirect({ name: 'messages' })
//     }
//   })
// }
