<template>
  <v-card>
    <v-card-title>
      {{ company.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ company.address }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    company: Object
  },
}
</script>
