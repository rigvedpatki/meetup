export default {
  loadedMeetups(state) {
    return state.loadedMeetups.sort(
      (meetupA, meetupB) => meetupB.date - meetupA.date
    )
  },
  featuredMeetups(state, getters) {
    return getters.loadedMeetups.slice(0, 4)
  },
  loadedMeetup(state) {
    return meetupId => {
      return state.loadedMeetups.find(meetup => meetup.id === meetupId)
    }
  },
  user(state) {
    return state.user
  },
  error(state) {
    return state.error
  },
  loading(state) {
    return state.loading
  }
}
