<template>
  <v-container>
    <h1>Profile Page</h1>
    <h2>{{user}}</h2>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfilePage',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>