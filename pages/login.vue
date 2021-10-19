<template>
  <v-app id="inspire"
         style="
    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);"
    >
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-title>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-card-title>
              <v-card-text>
                <v-form method="post" @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'none',
  data() {
    return {
      email: 'admin@test.com',
      password: '_admin',
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password,
        },
      }).then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
