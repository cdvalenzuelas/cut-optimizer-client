import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA_OfrRMXMTv8eSwcJE-Jk8-SZ8l8E96CE',
  authDomain: 'cutoptimizer-feae5.firebaseapp.com',
  databaseURL: 'https://cutoptimizer-feae5.firebaseio.com',
  projectId: 'cutoptimizer-feae5',
  storageBucket: 'cutoptimizer-feae5.appspot.com',
  messagingSenderId: '434668949042',
  appId: '1:434668949042:web:796d29da1341495ee6b62b',
  measurementId: 'G-00RT3J6W17'
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export { firebase }
