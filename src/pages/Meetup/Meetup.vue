<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="title primary--text">{{ meetup.title}}</div>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup-details-dialog :meetup="meetup"></edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="`${meetup.imageUrl}`" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date}} -- {{meetup.location}}</div>
            <div>
              <edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></edit-meetup-date-dialog>
              <edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></edit-meetup-time-dialog>
            </div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions v-if="!userIsCreator">
            <v-spacer></v-spacer>
            <register-meetup-dialog
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
            ></register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import EditMeetupDetailsDialog from '@/components/EditMeetup/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from '@/components/EditMeetup/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from '@/components/EditMeetup/EditMeetupTimeDialog.vue'
import RegisterMeetupDialog from '@/components/RegisterMeetup/RegisterMeetupDialog.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'MeetupPage',
  components: {
    'edit-meetup-details-dialog': EditMeetupDetailsDialog,
    'edit-meetup-date-dialog': EditMeetupDateDialog,
    'edit-meetup-time-dialog': EditMeetupTimeDialog,
    'register-meetup-dialog': RegisterMeetupDialog
  },
  computed: {
    meetup() {
      return this.loadedMeetup(this.$route.params.id)
    },
    ...mapGetters({
      loadedMeetup: 'loadedMeetup',
      userIsAuthenticated: 'userIsAuthenticated',
      user: 'user',
      loading: 'loading'
    }),
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.user.id === this.meetup.creatorId
    }
  }
}
</script>

