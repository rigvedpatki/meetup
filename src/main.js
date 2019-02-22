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

Vue.filter('date', DateFilter)

Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      ...firebaseConfig
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
