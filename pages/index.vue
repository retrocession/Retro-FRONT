<template>
  <v-row>
    <v-dialog
      v-model="newOfferDialog"
      max-width="500px"
    >
      <new-offer
        @created="newOfferDialog = false; getOffers()"
      />
    </v-dialog>
    <v-dialog
      v-model="deleteOfferDialog"
      max-width="500px"
    >
      <delete-offer
        :offer-id="currentOffer.id"
        @deleted="deleteOfferDialog = false; getOffers()"
        @cancel="deleteOfferDialog = false"
      />
    </v-dialog>
    <v-dialog
      v-model="offerDetailsDialog"
      max-width="500px"
    >
      <offer-details
        :offer="currentOffer"
        @cancel="offerDetailsDialog = false"
      />
    </v-dialog>
    <v-col
      cols="6"
    >
      <v-card>
        <v-card-title>
          Mes Offres ({{ offers.length }})
          <v-spacer/>
          <v-btn
            icon
            @click="newOfferDialog = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          v-for="offer in offers"
        >
          <span
            @click="offerDetailsDialog = true; currentOffer = offer"
          >
          {{ offer.title }}
          </span>
          <v-btn
            icon
            @click="deleteOfferDialog = true; currentOffer = offer"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="6"
    >
      <v-card>
        <v-card-title>
          Mes Offres ({{ offers.length }})
          <v-spacer/>
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text
          v-for="offer in offers"
        >
          {{ offer.title }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import newOffer from '~/components/offer/newOffer'
import deleteOffer from '~/components/offer/deleteOffer'
import offerDetails from '~/components/offer/offerDetails'

export default {
  components: {
    newOffer,
    deleteOffer,
    offerDetails
  },
  data: () => ({
    offers: [],
    currentOffer: {},
    newOfferDialog: false,
    deleteOfferDialog: false,
    offerDetailsDialog: false
  }),
  created() {
    this.getOffers()
  },
  methods: {
    getOffers() {
      this.$axios.get('/companies/1/offers').then(
        (res) => {
          this.offers = res.data
        }
      )
    }
  }
}
</script>
