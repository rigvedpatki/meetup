<template>
  <v-alert dismissible :type="alertType" @input="onClose" :value="true">
    <slot/>
  </v-alert>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    alertType: {
      type: String,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
