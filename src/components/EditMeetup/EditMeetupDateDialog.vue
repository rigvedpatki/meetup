<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn flat slot="activator" class="primary--text">Edit Date</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="title primary--text">Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
              <template>
                <v-btn color="primary" @click="editDialog = false">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSave">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetupDateDialog',
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      editableDate: null
    }
  },
  methods: {
    onSave() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()

      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)

      this.$store.dispatch('updateMeetup', {
        id: this.$route.params.id,
        date: newDate
      })
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10)
  }
}
</script>
