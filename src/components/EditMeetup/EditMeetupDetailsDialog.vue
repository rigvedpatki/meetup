<template>
  <v-dialog full-width persistent v-model="editDialog">
    <v-btn fab flat slot="activator" color="primary">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="title primary--text">Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" label="Title" id="title" v-model="editedTitle"></v-text-field>
              <v-text-field name="location" label="Location" id="location" v-model="editedLocation"></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn color="primary" @click="editDialog = false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditMeetupDetailsDialog',
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onSave() {
      if (
        this.editedTitle.trim() === '' ||
        this.editedLocation.trim() === '' ||
        this.editedDescription.trim() === ''
      ) {
        return
      }
      const editedMeetup = {
        id: this.$route.params.id,
        title: this.editedTitle,
        location: this.editedLocation,
        description: this.editedDescription
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetup', editedMeetup)
    }
  }
}
</script>
