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
          registeredMeetups: [],
          fbKeys: {}
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
          registeredMeetups: [],
          fbKeys: {}
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
    commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
  },
  //fetch user data
  fetchUserData({ commit, getters }, payload) {
    commit('setLoading', true)
    firebase
      .database()
      .ref(`/users/${getters.user.id}/registrations`)
      .once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let fbKeys = {}
        for (const key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          fbKeys[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups,
          fbKeys
        }

        commit('setUser', updatedUser)
        commit('setLoading', false)
      })
      .catch(error => {
        console.error(error)
        commit('setLoading', false)
      })
  },
  // Logout from firebase
  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  // setting error
  setError({ commit }, payload) {
    commit('setError', payload)
  },
  // Register user for a Meetup
  registerUserForMeetup({ commit, getters }, payload) {
    commit('setLoading', true)
    const user = getters.user
    firebase
      .database()
      .ref(`/users/${user.id}`)
      .child('/registrations/')
      .push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('registerUserForMeetup', { id: payload, fbKey: data.key })
      })
      .catch(error => {
        console.error(error)
        commit('setLoading', false)
      })
  },
  // Unregister user for a Meetup
  unRegisterUserFromMeetup({ commit, getters }, payload) {
    commit('setLoading', true)
    const user = getters.user
    if (!user.fbKeys) {
      return
    }
    const fbKey = user.fbKeys[payload]

    firebase
      .database()
      .ref(`/users/${user.id}/registrations/${fbKey}`)
      .remove()
      .then(snapshot => {
        commit('setLoading', false)
        commit('unRegisterUserFromMeetup', payload)
      })
      .catch(error => {
        commit('setLoading', false)
        console.error(error)
      })
  }
}
