import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebase.config'
import Alert from './components/Alert.vue'

Vue.config.productionTip = false

// Setting up date filter
Vue.filter('date', DateFilter)

// Setting up a global components
Vue.component('app-alert', Alert)

// initial Vue Instance
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // Setting up firebase
    firebase.initializeApp({
      ...firebaseConfig
    })
    // Setting up auto sign in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    // load initial meetups from firebase
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
