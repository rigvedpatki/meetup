<template>
  <v-dialog persistent v-model="registerDialog" width="350px">
    <v-btn color="primary" slot="activator">{{displayRegisterOrUnregister}}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title
              class="title primary--text"
              v-if="userIsRegistered"
            >Unregister from Meetup ?</v-card-title>
            <v-card-title class="title primary--text" v-else>Register for Meetup ?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat class="green--text darken-1" @click="onConfirmation">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegisterMeetupDialog',
  props: {
    meetupId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      registerDialog: false
    }
  },
  computed: {
    displayRegisterOrUnregister() {
      if (this.userIsRegistered) {
        return 'Unregister'
      } else {
        return 'Register'
      }
    },
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      )
    }
  },
  methods: {
    onConfirmation() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unRegisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>
