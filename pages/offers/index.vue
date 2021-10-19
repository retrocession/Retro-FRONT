<template>
  <v-item-group mandatory>
    <v-container>
      <v-autocomplete
        v-model="values"
        :items="items"
        item-text="name"
        solo
        chips
        :search-input.sync="values"
        label="Marques"
        multiple
      ></v-autocomplete>
      <v-row>
        <v-col
          v-for="offer in offers"
          :key="offer.id"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ active, toggle }">
            <v-card
              :color="active ? '#f5f5f5' : 'rgba(245,245,245,0.8)'"
              @click="toggle"
            >
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
                Test
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn>
                  Faire une demande
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  data() {
    return {
      offers: [],
      brands: [],
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: [],
    }
  },
  created() {
    this.getOffers()
    this.getBrands()
  },
  watch: {
    values(query) {
      console.log(this.values)
      this.filterOffers(query)
    }
  },
  computed: {
    computedOffers() {
      console.log(this.values)
      this.offers.filter((offer) => {
        return values.includes(offer.brand)
      })
    }
  },
  methods: {
    filterOffers(query) {
      console.log(query);
      return this.offers.filter((offer) => {
        return query.includes(offer.brand.name)
      })
    },
    getOffers() {
      this.$axios.get(`/offers`)
        .then((res) => {
          this.offers = res.data
        })
    },
    getBrands() {
      this.$axios.get(`brands`).then((res) => {
        this.items = res.data
      })
    }
  }
}
</script>
