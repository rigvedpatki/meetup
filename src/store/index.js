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
        date: new Date('2019-01-01'),
        location: 'New York',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis tenetur quasi. Quia reiciendis perspiciatis, vero aperiam, omnis sed laudantium itaque molestiae incidunt fugiat sunt, accusantium assumenda recusandae repellendus possimus!'
      },
      {
        id: 'xyz',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/08/Seine_and_Eiffel_Tower_from_Tour_Saint_Jacques_2013-08.JPG',
        title: 'Meetup in Paris',
        date: new Date('2019-02-02'),
        location: 'Paris',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis tenetur quasi. Quia reiciendis perspiciatis, vero aperiam, omnis sed laudantium itaque molestiae incidunt fugiat sunt, accusantium assumenda recusandae repellendus possimus!'
      },
      {
        id: 'qwe',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/02/Berlin_Skyline_Fernsehturm_02.jpg',
        title: 'Meetup in Berlin',
        date: new Date('2019-03-03'),
        location: 'Berlin',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis tenetur quasi. Quia reiciendis perspiciatis, vero aperiam, omnis sed laudantium itaque molestiae incidunt fugiat sunt, accusantium assumenda recusandae repellendus possimus!'
      },
      {
        id: 'asd',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/d/d2/Royalpalace_Stockholm.jpg',
        title: 'Meetup in Stockholm',
        date: new Date('2019-04-04'),
        location: 'Stockholm',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis tenetur quasi. Quia reiciendis perspiciatis, vero aperiam, omnis sed laudantium itaque molestiae incidunt fugiat sunt, accusantium assumenda recusandae repellendus possimus!'
      },
      {
        id: 'zxc',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/3/39/Mumbai_skyline.jpg',
        title: 'Meetup in Mumbai',
        date: new Date('2019-05-05'),
        location: 'Mumbai',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nobis tenetur quasi. Quia reiciendis perspiciatis, vero aperiam, omnis sed laudantium itaque molestiae incidunt fugiat sunt, accusantium assumenda recusandae repellendus possimus!'
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
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      //ToDo: get Id
      //ToDo: get Date
      const meetup = {
        id: Math.random()
          .toString(36)
          .substring(7),
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
      //ToDo: Reachout to firebase and store it.
      commit('createMeetup', meetup)
    }
  }
})
