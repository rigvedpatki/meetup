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
              <v-form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      prepend-icon="person"
                      id="email"
                      v-model="email"
                      type="email"
                      :rules="[rules.required]"
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
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      prepend-icon="lock"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[rules.required, rules.passwordMatch]"
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
                        Sign up
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
  name: 'SignUpPage',

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Required.',

        passwordMatch: value =>
          value === this.password || 'Password does not match'
      }
    }
  },
  methods: {
    onSignup() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUserUp', user)
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

