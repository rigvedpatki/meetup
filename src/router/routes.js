import Home from '../pages/Home.vue'
import ErrorPage from '../pages/Error.vue'
import Meetups from '../pages/Meetup/Meetups.vue'
import Meetup from '../pages/Meetup/Meetup.vue'
import CreateMeetup from '../pages/Meetup/CreateMeetup.vue'
import Profile from '../pages/User/Profile.vue'
import SignIn from '../pages/User/SignIn.vue'
import SignUp from '../pages/User/SignUp.vue'

export const routes = [
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
    path: '/new-meetup',
    name: 'create-meetup',
    component: CreateMeetup
  },
  {
    path: '/meetups/:id',
    name: 'meetup',
    component: Meetup
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
  },
  {
    path: '*',
    name: 'error',
    component: ErrorPage
  }
]
