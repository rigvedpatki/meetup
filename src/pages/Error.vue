<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="error ma-2">
          <v-container fluid>
            <v-layout row>
              <v-flex xs6 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="white--text mb-0 display-1">Error</div>
                    <div class="white--text mb-0 title">404</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat to="/" dark>
                    <v-icon left>home</v-icon>
                    <div class="white--text">Go Home</div>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>
