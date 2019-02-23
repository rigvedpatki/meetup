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
  }
}
