import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Meetups from './pages/Meetup/Meetups.vue'
import CreateMeetup from './pages/Meetup/CreateMeetup.vue'
import Profile from './pages/User/Profile.vue'
import SignIn from './pages/User/SignIn.vue'
import SignUp from './pages/User/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'create-meetup',
      component: CreateMeetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    }
  ]
})
