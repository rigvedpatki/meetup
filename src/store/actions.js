import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

export default {
  // Initial meetups loaded
  loadMeetups({ commit }) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('meetups')
      .once('value')
      .then(data => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            date: obj[key].date,
            location: obj[key].location,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(error => console.error(error))
  },
  // Creating a new meetup
  createMeetup({ commit, getters }, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: getters.user.id
    }
    let imageUrl, key
    firebase
      .database()
      .ref('meetups')
      .push(meetup)
      .then(data => {
        key = data.key
        return key
      })
      .then(key => {
        const fileName = payload.image.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        return firebase
          .storage()
          .ref(`meetups/${key}${ext}`)
          .put(payload.image)
      })
      .then(fileData =>
        firebase
          .storage()
          .ref(fileData.metadata.fullPath)
          .getDownloadURL()
      )
      .then(downloadURL => {
        imageUrl = downloadURL
        return firebase
          .database()
          .ref('meetups')
          .child(key)
          .update({
            imageUrl: imageUrl
          })
      })
      .then(() => {
        commit('createMeetup', { ...meetup, id: key, imageUrl: imageUrl })
      })
      .catch(error => {
        console.error(error)
      })
  },
  // Edit Meetup
  updateMeetup({ commit }, payload) {
    commit('setLoading', true)
    const { id, ...meetup } = payload
    firebase
      .database()
      .ref('meetups')
      .child(id)
      .update({
        ...meetup
      })
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        commit('setLoading', false)
        console.error(error)
      })
  },
  // SignUp a new user
  signUserUp({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.error(error)
      })
  },
  // User sign in
  signUserIn({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        //ToDo: Register for meetups
        const newUser = {
          id: user.user.uid,
          registeredMeetups: []
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.error(error)
      })
  },
  // Clearing state of error
  clearError({ commit }) {
    commit('clearError')
  },
  // Auto sign in
  autoSignIn({ commit }, payload) {
    commit('setUser', { id: payload.uid, registeredMeetups: [] })
  },
  // Logout from firebase
  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  // setting error
  setError({ commit }, payload) {
    commit('setError', payload)
  }
}
