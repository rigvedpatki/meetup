<template>
  <v-app>
    <v-navigation-drawer fixed app v-model="sideNav">
      <v-list>
        <v-list-tile v-for="menuItem in menuItems" :key="menuItem.title" :to="menuItem.path">
          <v-list-tile-action>
            <v-icon>{{menuItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{menuItem.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile flat v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Dev Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.title" :to="menuItem.path">
          <v-icon left dark>{{menuItem.icon}}</v-icon>
          {{menuItem.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    ...mapGetters({
      userIsAuthenticated: 'userIsAuthenticated'
    }),
    menuItems() {
      let menuItems = [
        {
          icon: 'face',
          title: 'Sign up',
          path: '/sign-up'
        },
        {
          icon: 'lock_open',
          title: 'Sign in',
          path: '/sign-in'
        }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'supervisor_account',
            title: 'View Meetups',
            path: '/meetups'
          },
          {
            icon: 'room',
            title: 'Organize Meetup',
            path: '/new-meetup'
          },
          {
            icon: 'person',
            title: 'Profile',
            path: '/profile'
          }
        ]
      }

      return menuItems
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>