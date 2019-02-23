<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn flat class="primary--text" slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="title primary--text">Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template>
                <v-btn color="primary" @click="editDialog = false">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSave">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetupTimeDialog',
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSave() {
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)

      this.$store.dispatch('updateMeetup', {
        id: this.$route.params.id,
        date: newDate
      })
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date)
  }
}
</script>
