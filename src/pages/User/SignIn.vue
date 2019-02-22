<template>
  <v-container>
    <v-layout row class="mb-2" v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert alertType="error" @dismissed="onDismissed">{{error.message}}</app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      prepend-icon="person"
                      id="email"
                      v-model="email"
                      type="email"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      prepend-icon="lock"
                      id="password"
                      v-model="password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        type="submit"
                        class="white--text"
                        :disabled="loading"
                        :loading="loading"
                        color="primary"
                      >
                        Sign in
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SignInPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSignIn() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUserIn', user)
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      error: 'error',
      loading: 'loading'
    })
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>