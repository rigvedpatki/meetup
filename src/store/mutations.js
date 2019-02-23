export default {
  // Modifies loadedMeetups array
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload)
  },
  // Set user state
  setUser(state, payload) {
    state.user = payload
  },
  // Set loading state
  setLoading(state, payload) {
    state.loading = payload
  },
  // Set error state
  setError(state, payload) {
    state.error = payload
  },
  // Clear error state
  clearError(state) {
    state.error = null
  },
  // Sets loadedMeetups
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload
  },
  // Update Meetup
  updateMeetup(state, payload) {
    const meetupIndex = state.loadedMeetups.findIndex(
      meetup => meetup.id === payload.id
    )
    const currentMeetup = state.loadedMeetups.find(
      meetup => meetup.id === payload.id
    )
    const updatedMeetup = {
      ...currentMeetup,
      ...payload
    }
    state.loadedMeetups.splice(meetupIndex, 1, updatedMeetup)
  },
  registerUserForMeetup(state, payload) {
    const id = payload.id
    if (
      state.user.registeredMeetups.findIndex(meetupId => meetupId === id) >= 0
    ) {
      return
    }
    state.user.registeredMeetups.push(id)
    state.user.fbKeys[id] = payload.fbKey
  },
  unRegisterUserFromMeetup(state, payload) {
    const registeredMeetups = state.user.registeredMeetups
    registeredMeetups.splice(
      registeredMeetups.findIndex(meetupId => meetupId === payload.id),
      1
    )
    Reflect.deleteProperty(state.user.fbKeys, payload)
  }
}
