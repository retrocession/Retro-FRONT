<template>
  <v-card>
    <v-card-title>
      Ajouter une nouvelle offre
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="form.title"
          label="Title"
          required
        />
        <v-select
          v-model="form.brand_id"
          :items="brands"
          item-text="name"
          item-value="id"
          label="Marque"
          required
        />
        <v-text-field
          v-model="form.model"
          label="Modèle"
          required
        />
        <v-text-field
          v-model="form.reference"
          label="Référence"
          required
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="createOffer()"
      >
        Enregistrer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: null,
    form: {
      title: '',
      brand_id: '',
      model: '',
      reference: '',
      company_id: null
    },
    brands: [],
  }),
  created() {
    this.getBrands()
  },
  methods: {
    createOffer() {
      this.form.company_id = this.$auth.user.company_id
      this.$axios.post(`/offers`, this.form).then(() => {
        this.$emit('created')
      })
    },
    getBrands() {
      this.$axios.get(`brands`).then((res) => {
        this.brands = res.data
      })
    }
  }
}
</script>
