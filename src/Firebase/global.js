import { firebase } from './index'

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
    .then(({ user }) => {
      const { email, displayName, uid, photoURL, refreshToken } = user
      return { email, displayName, uid, photoURL, refreshToken }
    })
    .catch(err => new Error())
}
