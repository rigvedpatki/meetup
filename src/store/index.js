import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'abc',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/d/dd/Long_Island_City_New_York_May_2015_panorama_3.jpg',
        title: 'Meetup in New York',
        date: new Date('2019-01-01')
      },
      {
        id: 'xyz',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG',
        title: 'Meetup in Paris',
        date: new Date('2019-02-02')
      },
      {
        id: 'qwe',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/02/Berlin_Skyline_Fernsehturm_02.jpg',
        title: 'Meetup in Berlin',
        date: new Date('2019-03-03')
      },
      {
        id: 'asd',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/d/d2/Royalpalace_Stockholm.jpg',
        title: 'Meetup in Stockholm',
        date: new Date('2019-04-04')
      },
      {
        id: 'zxc',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/3/39/Mumbai_skyline.jpg',
        title: 'Meetup in Mumbai',
        date: new Date('2019-05-05')
      }
    ],
    user: {
      id: 'fgh',
      registeredMeetups: ['zxc']
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort(
        (meetupA, meetupB) => meetupB.date - meetupA.date
      )
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 2)
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupId)
      }
    }
  },
  mutations: {},
  actions: {}
})
