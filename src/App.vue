<template>
  <v-app>
    <v-toolbar light>
      <v-toolbar-title>Spiking networks</v-toolbar-title>
      <v-toolbar-items>
        <v-toolbar-item href="/singleNeuron" router>Single neuron</v-toolbar-item>
        <v-toolbar-item  href="/fixedNetwork" router>Fixed network</v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'bubble_chart', title: 'Inspire' }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>