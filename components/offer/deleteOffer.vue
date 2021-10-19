<template>
  <v-card>
    <v-card-title>
      Etes vous sur de vouloir supprimer cette offre ?
    </v-card-title>
    <v-card-text>

    </v-card-text>
    <v-card-actions>
      <v-btn
        color="secondary"
        @click="cancelDelete()"
      >
        Annuler
      </v-btn>
      <v-spacer/>
      <v-btn
        color="error"
        @click="deleteOffer()"
      >
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    offerId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    valid: null,
  }),
  methods: {
    deleteOffer() {
      this.$axios.delete(`/offers/${this.offerId}`).then(() => {
        this.$emit('deleted')
      })
    },
    cancelDelete() {
      this.$emit('cancel')
    }
  }
}
</script>
