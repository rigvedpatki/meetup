import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#D32F2F',
    secondary: '#66BB6A',
    accent: '#FF5252',
    error: '#D50000',
    info: '#29B6F6',
    success: '#81C784',
    warning: '#FFA000'
  }
})
