import { store } from '../store'
// To check if the user is signed in or not
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/sign-in')
  }
}
