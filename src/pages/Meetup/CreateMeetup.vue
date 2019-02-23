<template>
  <v-container>
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
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="imageUrl"
                :rules="[rules.required]"
                v-model="imageUrl"
              ></v-text-field>
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
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
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
      if (this.formIsValid) {
        const meetup = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        console.log(meetup)
        this.$store.dispatch('createMeetup', meetup)

        this.$router.push('/meetups')
      }
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  }
}
</script>