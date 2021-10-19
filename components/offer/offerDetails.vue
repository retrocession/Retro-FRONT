<template>
  <v-card>
    <v-card-title>
      {{ offer.title }}
    </v-card-title>
    <v-card-subtitle>
      <v-chip>
        {{ offer.brand.name }}
      </v-chip>
      {{ offer.model }} {{ offer.reference }}
    </v-card-subtitle>
    <v-card-text>
      Mis en ligne le : {{ offer.created_at }}
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    offer: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
