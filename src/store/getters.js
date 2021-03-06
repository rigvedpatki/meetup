export default {
  // Returns loaded meetups
  loadedMeetups(state) {
    return state.loadedMeetups.sort(
      (meetupA, meetupB) => meetupB.date - meetupA.date
    )
  },
  // Returns featured meetups
  featuredMeetups(state, getters) {
    return getters.loadedMeetups.slice(0, 4)
  },
  // Return single loadedMeetup
  loadedMeetup(state) {
    return meetupId => {
      return state.loadedMeetups.find(meetup => {
        return meetup.id === meetupId
      })
    }
  },
  // Returns user's state
  user(state) {
    return state.user
  },
  // user is authenicated
  userIsAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  },
  // Returns error
  error(state) {
    return state.error
  },
  // Returns loading status
  loading(state) {
    return state.loading
  }
}
