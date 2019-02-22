export default {
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload)
  },
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload
  }
}
