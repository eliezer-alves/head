import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_DATABASE_URL,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SEND_ID,
//   appId: import.meta.env.VITE_APP_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyDMJxzczdJ5AX-ZdslsNMNXktPly7-LKwg',
  authDomain: 'dudle-ff5ab.firebaseapp.com',
  databaseURL: 'https://dudle-ff5ab-default-rtdb.firebaseio.com',
  projectId: 'dudle-ff5ab',
  storageBucket: 'dudle-ff5ab.appspot.com',
  messagingSenderId: '1017431848225',
  appId: '1:1017431848225:web:a749dea2ef16f759d4ba60',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage()

export { auth, db, storage }
