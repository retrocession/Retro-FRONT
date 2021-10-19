<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="companyToVerify"
      :items-per-page="5"
    >
      <template #item.name="{ item, index }">
        <div
          @click="showCompanyInfos = true; selectedCompany = index"
        >
          {{ item.name }} {{index}}
        </div>
      </template>
      <template #item.ceo.name="{ item }">
        {{ item.ceo.name }} {{ item.ceo.last_name }}
      </template>
      <template #item.accept="{ item, index }">
        <v-btn
          icon
          color="success"
          @click="acceptCompany(index)"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="showCompanyInfos"
      width="500"
    >
      <company-infos
        :company="companyToVerify[selectedCompany]"
      />
    </v-dialog>
  </div>
</template>

<script>
import companyInfos from "../company/companyInfos";

export default {
  components: {
    companyInfos
  },

  data: () => ({
    isLoading: true,
    companyToVerify: [],
    selectedCompany:  null,
    showCompanyInfos: false,
    headers: [
      {text: 'Entreprise', value: 'name'},
      {text: 'PDG', value: 'ceo.name'},
      {text: 'APE', value: 'code_ape'},
      {text: 'Accepter', value: 'accept'},
    ],
  }),

  created() {
    this.getCompanyToVerify()
  },

  methods: {
    getCompanyToVerify() {
      this.$axios.get(`admin/companies/check`)
        .then((res) => {
          this.companyToVerify = res.data
          this.isLoading = false
        })
    },
    acceptCompany(companyId) {
      this.$axios.get(`admin/companies/${companyId}/accept`).then((res) => {
        this.getCompanyToVerify();
      })
    }
  }
}
</script>
