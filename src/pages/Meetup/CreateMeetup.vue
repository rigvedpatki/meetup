<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert alertType="error" @dismissed="onDismissed">{{error.message}}</app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <div class="display-1">Create a new Meetup</div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit="createMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                :rules="[rules.required]"
                v-model="title"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                :rules="[rules.required]"
                v-model="location"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised color="primary" @click="onPickFile">
                <v-icon left>cloud_upload</v-icon>Upload Image
              </v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>
          </v-layout>
          <v-layout row class="pb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-img :src="`${imageUrl}`" height="300px" v-show="imageUrl !== ''"></v-img>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                lazy
                transition="scale-transition"
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateFormatted"
                  label="Choose a date"
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker
                  v-model="date"
                  @input="dateMenu = false "
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-menu
                ref="menu"
                v-model="timeMenu"
                :close-on-content-click="false"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="time"
                  label="Choose the time"
                  prepend-icon="access_time"
                ></v-text-field>
                <v-time-picker v-model="time" format="24hr" @click:minute="$refs.menu.save(time)"></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                :rules="[rules.required]"
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateMeetupPage',
  data() {
    return {
      dateMenu: false,
      timeMenu: false,
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      rules: {
        required: value => !!value || 'Required.'
      },
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date().toISOString().substr(0, 10),
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      image: null
    }
  },
  computed: {
    ...mapGetters({
      error: 'error'
    }),
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.description !== '' &&
        this.image !== null
      )
    },
    submittableDateTime() {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.getMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    createMeetup(event) {
      event.preventDefault()
      if (!this.image) {
        let error = {
          message: 'Please upload an image file.'
        }
        this.$store.dispatch('setError', error)
        return
      }
      if (this.formIsValid) {
        const meetup = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetup)

        this.$router.push('/meetups')
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      console.log(files)
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        let error = {
          message: 'Please upload a vaild image file.'
        }
        this.$store.dispatch('setError', error)
        return
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  }
}
</script>