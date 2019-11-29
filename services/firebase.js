import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID
}

// eslint-disable-next-line import/no-mutable-exports
// let app = null

const app = firebase.initializeApp(firebaseConfig)

export const DB = app.database()
export const auth = app.auth()
export default app
