<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="title primary--text">{{ meetup.title}}</div>
          </v-card-title>
          <v-img :src="`${meetup.imageUrl}`" height="400px"></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date}} -- {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MeetupPage',
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.$route.params.id)
    }
  }
}
</script>

