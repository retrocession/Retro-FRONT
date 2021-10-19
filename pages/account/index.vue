<template>
  <v-container>
    <v-alert
      dense
      :value="alert"
      type="success"
      dismissible
    >{{ alertMessage }}</v-alert>
    <div id="account">
      <v-row>
        <v-col cols="4">
          <h2>Mon compte</h2>
          <div class="caption">Ici, modifiez vos informations personnelle</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"/>
        <v-col cols="6">
          <v-form>
            <v-text-field
              v-model="user.name"
              label="First name"
              required
            />
            <v-text-field
              v-model="user.last_name"
              label="Last name"
              required
            />
            <v-text-field
              v-model="user.email"
              label="E-mail"
              required
            />
          </v-form>
          <v-btn
            elevation="2"
            @click="updateUser"
          >
            Valider
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <br>
    <v-divider/>
    <div id="company">
      <br>
      <v-row>
        <v-col cols="4">
          <h2>Mon entreprise</h2>
          <div v-if="!user.company_id" class="caption">Ajoutez votre entreprise</div>
          <div v-else-if="company.ape_verified_at" class="caption">Votre entreprise a été validé ! 🥳</div>
          <div v-else class="caption">Information sur votre entreprise</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"/>
        <v-col cols="6">
          <v-form>
            <v-text-field
              v-model="company.name"
              :disabled="!!company.ape_verified_at"
              label="Nom de mon entreprise"
              required
            />
            <v-text-field
              v-model="company.address"
              :disabled="!!company.ape_verified_at"
              label="Adresse"
              required
            />
            <v-text-field
              v-model="company.code_ape"
              v-if="!company.ape_verified_at"
              label="Code APE"
              required
            />
            <v-text-field
              v-model="company.code_ape"
              v-else
              disabled
              :label="`Code APE vérifié le ${company.ape_verified_at}`"
              required
            />
          </v-form>
          <v-spacer/>
          <v-btn
            v-if="company.id"
            :disabled="!!company.ape_verified_at"
            elevation="2"
            @click="updateCompany"
          >
            Modifier mon entreprise
          </v-btn>
          <v-btn
            v-else
            elevation="2"
            @click="createCompany"
          >
            Ajouter mon entreprise
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <br>
    <v-divider/>
    <div id="employee">
      <br>
      <v-row>
        <v-col cols="4">
          <h2>Mes employées</h2>
          <div class="caption">Liste de vos employés</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"/>
        <v-col cols="6">
          <v-data-table
            :headers="headers"
            :items="company.users"
            :items-per-page="5"
          />
        </v-col>
      </v-row>
      <br>
      <v-divider/>
    </div>
    <div id="checkCompany" v-if="user.is_admin === 4">
      <br>
      <v-row>
        <v-col cols="4">
          <h2>Entreprises à valider</h2>
          <div class="caption">Liste des entreprises a valider ✅</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"/>
        <v-col cols="8">
          <verify-company/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import verifyCompany from '~/components/admin/verifyCompany'

export default {
  components: {
    verifyCompany
  },

  data: () => ({
    isLoading: true,
    user: [],
    company: [],
    alert: false,
    alertMessage: '',
    companyToVerify: [],
    headers: [
      { text: 'Nom', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Actions', value: 'actions' },
    ],
  }),

  created() {
    this.user = this.$auth.user
    this.getCompany()
  },

  methods: {
    getCompany() {
      this.$axios.get(`companies/${this.user.company_id}`)
        .then((res) => {
          this.company = res.data
          this.isLoading = false
      })
    },
    updateUser() {
      this.$axios.put(`me`, {
          name: this.user.name,
          last_name: this.user.last_name,
          email: this.user.email,
      }).then(() => {
        this.toggleAlert('Vos informations personelle ont été mise a jour !')
      })
    },
    updateCompany() {
      this.$axios.put(`companies/${this.company.id}`, {
        name: this.company.name,
        address: this.company.address,
        code_ape: this.company.code_ape,
      }).then(() => {
        this.toggleAlert('Les informations de votre entreprise ont été mise a jour !')
      })
    },
    createCompany() {
      this.$axios.post(`companies`, {
        name: this.company.name,
        address: this.company.address,
        code_ape: this.company.code_ape,
      }).then((res) => {
        this.company = res.data
        this.toggleAlert('Vous venez d\'ajouter votre entreprise !')
      })
    },
    toggleAlert(message) {
      this.alert = !this.alert
      this.alertMessage = message
    }
  }
}
</script>
